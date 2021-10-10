import React from "react";
// Hooks
import { Context } from "./Provider";
import { useUsb } from "./useUsb";
import { useBluetooth } from "./useBluetooth";
// Interfaces
import { ContextProps } from "../interfaces";
// Configs
import { ProControllerConfig } from "../configs/controller";
import { Axis } from "react-gamepad";

export const useGamePad = () => {
  const [context, setContext] = React.useContext(Context);
  const { sendToUsbDevice } = useUsb();
  const { setBluetoothQueue } = useBluetooth();

  const sendToDevice = React.useCallback(
    async (data: Uint8Array): Promise<void> => {
      const encoder = new TextEncoder();
      try {
        if (context.emulator.state === "recording") {
          setContext((c: ContextProps) => ({
            ...c,
            emulator: {
              ...c.emulator,
              command: {
                ...c.emulator.command,
                signals: c.emulator.command.signals?.concat([
                  {
                    t: Number(c.emulator.time.toFixed(2)),
                    s: data,
                  },
                ]),
              },
            },
          }));
        }
        // USB Serial
        if (context.usb.isConnected) {
          await sendToUsbDevice(context.usb.device, [
            encoder.encode("S"),
            data,
            encoder.encode("E"),
          ]);
        }
        // BLE Serial
        if (context.bluetooth.isConnected) {
          await setBluetoothQueue([
            encoder.encode("S"),
            data.slice(0, 1),
            data.slice(1),
            encoder.encode("E"),
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [
      context.emulator.state,
      context.usb.isConnected,
      context.usb.device,
      context.bluetooth.isConnected,
      setContext,
      sendToUsbDevice,
      setBluetoothQueue,
    ]
  );

  const connectHandler = React.useCallback(
    (gamepadIndex: number): void => {
      console.log(`Gamepad connected: ${gamepadIndex}`);
      setContext((c: ContextProps) => ({
        ...c,
        gamePad: { ...c.gamePad, isConnected: true },
      }));
    },
    [setContext]
  );

  const disconnectHandler = React.useCallback(
    (gamepadIndex: number): void => {
      console.log(`Gamepad disconnected: ${gamepadIndex}`);
      setContext((c: ContextProps) => ({
        ...c,
        gamePad: { ...c.gamePad, isConnected: false },
      }));
    },
    [setContext]
  );

  const onPush = React.useCallback(
    async (button: number, state: boolean): Promise<void> => {
      try {
        const data = new Uint8Array(2);
        data[0] = button;
        data[1] = state ? 1 : 0;
        await sendToDevice(data);
        setContext((c: ContextProps) => ({
          ...c,
          gamePad: {
            ...c.gamePad,
            buttonStates: { ...c.gamePad.buttonStates, [button]: state },
          },
        }));
      } catch (error) {
        console.error(error);
      }
    },
    [sendToDevice, setContext]
  );

  const onRelease = React.useCallback(
    async (button: number): Promise<void> => {
      try {
        if (context.gamePad.buttonStates[button]) {
          const data = new Uint8Array(2);
          data[0] = button;
          data[1] = 0;
          await sendToDevice(data);
          setContext((c: ContextProps) => ({
            ...c,
            gamePad: {
              ...c.gamePad,
              buttonStates: { ...c.gamePad.buttonStates, [button]: false },
            },
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [context.gamePad.buttonStates, sendToDevice, setContext]
  );

  const onTilt = React.useCallback(
    async (stick: number, val: number): Promise<void> => {
      try {
        if (stick !== 18 && stick !== 19 && stick !== 20 && stick !== 21)
          return;
        const data = new Uint8Array(2);
        data[0] = stick;
        data[1] = val;
        await sendToDevice(data);
      } catch (error) {
        console.error(error);
      }
    },
    [sendToDevice]
  );

  const buttonChangeHandler = React.useCallback(
    (buttonName: string | number, down: boolean): void => {
      try {
        // Trigger button has two states, so discard one
        if (buttonName !== "LeftTrigger" && buttonName !== "RightTrigger") {
          const buttonNumber = ProControllerConfig[buttonName];
          onPush(buttonNumber, down);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [onPush]
  );

  const convert = React.useCallback((x: number): number => {
    // y = (yMax-yMin)*(x-xMin)/(xMax-xMin) + yMin;
    const val = x > 0.3 || x < -0.3 ? (256 * (x + 1)) / 2 : 128;
    if (val !== 69 && val !== 83) return val;
    else return val + 1;
  }, []);

  const axisChangeHandler = React.useCallback(
    (axisName: Axis, value: number): void => {
      try {
        const stickNumber = ProControllerConfig[axisName];
        const convertedValue =
          stickNumber === 19 || stickNumber === 21
            ? convert(value * -1)
            : convert(value);
        const roundedValue =
          Math.floor(convertedValue / 32) * 32 - 1 > 0
            ? Math.round(convertedValue / 32) * 32 - 1
            : 0;
        setContext((c: ContextProps) => ({
          ...c,
          gamePad: {
            ...c.gamePad,
            stickStates: {
              ...c.gamePad.stickStates,
              [stickNumber]: roundedValue,
            },
          },
        }));
        if (context.gamePad.stickStates[stickNumber] !== roundedValue)
          onTilt(stickNumber, roundedValue);
      } catch (error) {
        console.error(error);
      }
    },
    [convert, context.gamePad.stickStates, setContext, onTilt]
  );

  return {
    connectHandler,
    disconnectHandler,
    buttonChangeHandler,
    axisChangeHandler,
    onPush,
    onTilt,
    onRelease,
  };
};
