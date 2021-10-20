import React from "react";
// Hooks
import { Context } from "./Provider";
import { useDatabase } from "./useDatabase";
import { useGamePad } from "./useGamePad";
// Interfaces
import { ContextProps, SignalProps } from "../interfaces";
import uid from "uniqid";
import rison from "rison";
import { BitlyClient } from "bitly";
const bitly = new BitlyClient(process.env.REACT_APP_BITLY_TOKEN || "");

export const useEmulator = () => {
  const [context, setContext] = React.useContext(Context);
  const [buffer, setBuffer] = React.useState<SignalProps[]>()
  const intervalRef = React.useRef<NodeJS.Timeout | null>();
  const { saveCommand, storeCommand } = useDatabase();
  const { onPush, onTilt, neutral } = useGamePad();

  const bufferRef = React.useRef(buffer)
  React.useEffect( () => {
    bufferRef.current = buffer
  },[buffer])

  const stopRec = React.useCallback((): void => {
    console.log("Stop...");
    neutral()
    setContext((c: ContextProps) => ({
      ...c,
      emulator: {
        ...c.emulator,
        state: "standby",
        command: {
          ...c.emulator.command,
          signals: c.emulator.command.signals?.concat([
            {
              t: Number(c.emulator.time.toFixed(3)),
              s: new Uint8Array([99, 0]),
            },
          ]),
        },
      },
    }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [neutral, setContext]);

  const stopPlay = React.useCallback((): void => {
    console.log("Stop...");
    neutral()
    setContext((c: ContextProps) => ({
      ...c,
      emulator: { ...c.emulator, state: "standby", time: 0 },
    }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [neutral, setContext]);

  const stopAll = React.useCallback( (): void => {
    if(context.emulator.state === "playing" || context.emulator.state === "repeating") stopPlay()
    if(context.emulator.state === "recording") stopRec()
  },[context.emulator.state, stopPlay, stopRec])

  const recInterval = React.useCallback((): void => {
    setContext((c: ContextProps) => ({
      ...c,
      emulator: {
        ...c.emulator,
        time: Number((c.emulator.time + 0.01).toFixed(3))
      },
    }));
  }, [setContext]);

  const isTimeOver = React.useCallback( (time: number) => {
    const lastCommand =
      context.emulator.command.signals[context.emulator.command.signals.length - 1]
    return lastCommand.t <= time
  },[context.emulator.command.signals])

  const playInterval = React.useCallback(async (): Promise<void> => {
    setContext((c: ContextProps) => {
      if (!bufferRef.current) return {...c}
      const time = Number((c.emulator.time + 0.01).toFixed(3));
      
      const data = bufferRef.current.filter((b) => b.t === time)
      if(!data) return {...c}
      Promise.all(data.map( d => {
        if (d.s[0] <= 17) return onPush(d.s[0], d.s[1] === 1 ? true : false);
        else if (18 <= d.s[0] && d.s[0] <= 21 ) return onTilt(d.s[0], d.s[1]);
        return null
      }))

      // If it over record time, stop timer
      if (isTimeOver(time)) {
        if (c.emulator.state === "playing") stopPlay();
        else if (c.emulator.state === "repeating") {
          setBuffer(context.emulator.command.signals)
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
  }, [context.emulator.command.signals, isTimeOver, onPush, onTilt, setContext, stopPlay]);

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
      console.log(repeat ? "Repeat..." : "Play...", context.emulator.command.signals);
      setContext((c: ContextProps) => ({
        ...c,
        emulator: {
          ...c.emulator,
          state: repeat ? "repeating" : "playing",
          time: 0,
        },
      }));
      setBuffer(context.emulator.command.signals)
      intervalRef.current = setInterval(playInterval, 10);
    },
    [context.emulator.command.signals, playInterval, setContext]
  );

  const save = React.useCallback(async (): Promise<void> => {
    if (!context.emulator.command.signals) return;
    console.log("Saving...", context.emulator.command.signals);
    try {
      // AminUser
      if(context.user.isAdmin) {
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
      }
      // AnonymousUser
      else {
        if(!context.project.id) return
        const storage = localStorage.getItem(`PhantomHand-${context.project.id}`)
        if(!storage || !context.project.data) return
        const path: string[] = context.emulator.command.path.split("/")
        const newData: any = Array.from(context.project.data)
        if (path.length ===1 || !newData) return
        if (path.length === 3) {
          newData[path[0]][path[1]][path[2]].data = context.emulator.command
        }
        else if (path.length === 5){
          newData[path[0]][path[1]][path[2]][path[3]][path[4]].data = context.emulator.command
        }
        await storeCommand(context.project.id, newData)
        window.alert("Updated LocalStorage");
      }
    } catch (error) {
      window.alert("Failed");
      console.error(error);
    }
  }, [context.emulator.command, context.project.data, context.project.id, context.user.isAdmin, saveCommand, storeCommand]);

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
    stopAll
  };
};
