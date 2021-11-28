import React from "react";
// Hooks
import { Context } from "./Provider";

export const useMedia = () => {
  const [context, setContext] = React.useContext(Context);

  const getMediaDevices = React.useCallback(async (): Promise<void> => {
    console.log("Getting Media Devices...");
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setContext((c) => ({
        ...c,
        media: {
          ...c.media,
          devices: devices.filter((d) => d.kind === "videoinput"),
        },
      }));
    } catch (error) {
      throw error;
    }
  }, [setContext]);

  const connectToUserMedia = React.useCallback(
    async (deviceId: string): Promise<void> => {
      console.log("Connecting to Media Device...");
      try {
        if (!navigator.mediaDevices) return;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: deviceId,
            width: { min: 640, ideal: 1920 },
            height: { min: 360, ideal: 1080 },
            aspectRatio: { ideal: 1.7777777778 },
          },
          /*audio: {
              deviceId: deviceId
            } */
        });
        if (!context.media.devices || !stream) return;
        setContext((c) => ({
          ...c,
          media: {
            ...c.media,
            isConnected: true,
            stream: stream,
          },
        }));
      } catch (error) {
        throw error;
      }
    },
    [context.media.devices, setContext]
  );

  return { getMediaDevices, connectToUserMedia };
};
