import React from "react";
// Hooks
import { Context } from "./Provider";
import { useDatabase } from "./useDatabase";
import { useGamePad } from "./useGamePad";
// Interfaces
import { ContextProps } from "../interfaces";

import uid from "uniqid";
import rison from "rison";
import { BitlyClient } from "bitly";
const bitly = new BitlyClient(process.env.REACT_APP_BITLY_TOKEN || "");

export const useEmulator = () => {
  const [context, setContext] = React.useContext(Context);
  const intervalRef = React.useRef<NodeJS.Timeout | null>();
  const { saveCommand } = useDatabase();
  const { onPush, onTilt } = useGamePad();

  const stopRec = React.useCallback((): void => {
    console.log("Stop...");
    setContext((c: ContextProps) => ({
      ...c,
      emulator: { ...c.emulator, state: "standby" },
    }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [setContext]);

  const stopPlay = React.useCallback((): void => {
    console.log("Stop...");
    setContext((c: ContextProps) => ({
      ...c,
      emulator: { ...c.emulator, state: "standby", time: 0 },
    }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [setContext]);

  const recInterval = React.useCallback((): void => {
    setContext((c: ContextProps) => ({
      ...c,
      emulator: {
        ...c.emulator,
        time: c.emulator.time + 0.01,
      },
    }));
  }, [setContext]);

  const playInterval = React.useCallback(async (): Promise<void> => {
    setContext((c: ContextProps) => {
      const lastCommand =
        c.emulator.command.signals[c.emulator.command.signals.length - 1];
      const time = Number((c.emulator.time + 0.01).toFixed(2));
      const data = c.emulator.command.signals.filter((d) => d.t === time)[0];

      // If it has data, sendToUsbDevice to usb device
      if (data && data.s) {
        if (data.s[0] <= 15) onPush(data.s[0], data.s[1] === 1 ? true : false);
        else onTilt(data.s[0], data.s[1]);
      }

      // If it over record time, stop timer
      if (lastCommand.t <= time) {
        if (c.emulator.state === "playing") stopPlay();
        else if (c.emulator.state === "repeating") {
          return {
            ...c,
            emulator: { ...c.emulator, state: "repeating", time: 0 },
          };
        }
      }

      return {
        ...c,
        emulator: {
          ...c.emulator,
          time: time,
        },
      };
    });
  }, [onPush, onTilt, setContext, stopPlay]);

  const rec = React.useCallback((): void => {
    console.log("Rec...");
    setContext((c: ContextProps) => ({
      ...c,
      emulator: {
        ...c.emulator,
        state: "recording",
        time: 0,
        command: {
          ...c.emulator.command,
          signals: [],
        },
      },
    }));
    intervalRef.current = setInterval(recInterval, 10);
  }, [recInterval, setContext]);

  const play = React.useCallback(
    (repeat: boolean): void => {
      console.log(repeat ? "Repeat..." : "Play...");
      setContext((c: ContextProps) => ({
        ...c,
        emulator: {
          ...c.emulator,
          state: repeat ? "repeating" : "playing",
          time: 0,
        },
      }));
      intervalRef.current = setInterval(playInterval, 10);
    },
    [playInterval, setContext]
  );

  const save = React.useCallback(async (): Promise<void> => {
    if (!context.emulator.command.signals) return;
    console.log("Saving...", context.emulator.command.signals);
    try {
      if (context.emulator.command.path) {
        await saveCommand(
          `${context.project.id}/${context.emulator.command.path}`,
          {
            id: context.emulator.command.id,
            title: context.emulator.command.title,
            path: context.emulator.command.path,
            data: context.emulator.command,
          }
        );
        window.alert("Updated");
      } else {
        const path = `${context.project.id}/${context.project.data.length}`;
         await saveCommand(path, {
          id: uid(),
          index: {
            title: "Untitled",
          },
          items: [
            {
              id: uid(),
              title: "Untitled",
              data: context.emulator.command,
            },
          ],
        });
        window.alert("Saved As New Data");
      }
    } catch (error) {
      window.alert("Failed");
      console.error(error);
    }
  }, [
    context.emulator.command,
    context.project.data.length,
    context.project.id,
    saveCommand,
  ]);

  const share = React.useCallback(async (): Promise<void> => {
    try {
      const command = rison.encode(context.emulator.command.signals);
      const url = `${window.location.href
        .split(/[?#]/)[0]
        .replace("localhost", "127.0.0.1")}?data=${command}`;
      const bitlyLink = await bitly.shorten(url);
      const hashtags = "PhantomHand";
      window.open(
        `https://twitter.com/intent/tweet?&url=${bitlyLink.link}&hashtags=${hashtags}`,
        "_blank"
      );
    } catch (error) {
      window.alert("Error");
      console.error(error);
    }
  }, [context.emulator.command.signals]);

  return {
    rec,
    stopRec,
    play,
    stopPlay,
    save,
    share,
  };
};
