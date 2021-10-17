/// <reference types="web-bluetooth" />
import React from "react";
// Hooks
import { Context } from "./Provider";
// Interfaces
import { DSD_TECH, SUPREME_DUCK } from "../configs/bluetooth";

export const useBluetooth = () => {
  const [context, setContext] = React.useContext(Context);
  const [queue, setQueue] = React.useState<Uint8Array[]>([]);

  const onDisconnected = React.useCallback(
    (hideAlert?: boolean): void => {
      if (hideAlert) alert("Lost Connection of BLE Device");
      context.bluetooth.device?.removeEventListener(
        "gattserverdisconnected",
        null
      );
      setContext((c) => ({
        ...c,
        bluetooth: {
          isConnected: false,
        },
      }));
    },
    [context.bluetooth.device, setContext]
  );

  const disconnectBluetooth = React.useCallback(async (): Promise<void> => {
    if (!context.bluetooth.isConnected) return;
    context.bluetooth.device.removeEventListener(
      "gattserverdisconnected",
      null
    );
    context.bluetooth.device.gatt?.disconnect();
    onDisconnected(true);
  }, [context.bluetooth.device, context.bluetooth.isConnected, onDisconnected]);

  const connectToBluetoothDevice =
    React.useCallback(async (): Promise<void> => {
      console.log("Connecting to Bluetooth Device...");
      try {
        if (!navigator.bluetooth) return;
        const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: false,
          filters: [
            { services: [DSD_TECH.SERVICE_UUID] },
            { services: [SUPREME_DUCK.SERVICE_UUID] },
          ],
        });

        if (!device.gatt) return;
        const server = await device.gatt.connect();

        const deviceName = server.device.name;
        const deviceConfig =
          deviceName === "supremeDuck"
            ? SUPREME_DUCK
            : deviceName === "DSD TECH"
            ? DSD_TECH
            : undefined;
        if (!deviceConfig) return;

        const service = await server.getPrimaryService(
          deviceConfig.SERVICE_UUID
        );
        const characteristic = await service.getCharacteristic(
          deviceConfig.TX_CHARACTERISTIC_UUID
        );
        device.addEventListener("gattserverdisconnected", () =>
          onDisconnected()
        );
        setContext((c) => ({
          ...c,
          bluetooth: {
            ...c.bluetooth,
            isConnected: true,
            characteristic: characteristic,
            device: device,
          },
        }));
      } catch (error) {
        throw error;
      }
    }, [onDisconnected, setContext]);

  const sendToBluetoothDevice = React.useCallback(
    async (
      characteristic: BluetoothRemoteGATTCharacteristic,
      data: Uint8Array
    ): Promise<void> => {
      try {
        await characteristic.writeValueWithoutResponse(data);
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const setBluetoothQueue = React.useCallback(
    async (data: Uint8Array[]): Promise<void> => {
      await Promise.all(
        data.map(async (d) => await setQueue((q) => [...q, d]))
      );
    },
    []
  );

  React.useEffect((): void => {
    if (queue.length === 0 || !context.bluetooth.characteristic) return;
    sendToBluetoothDevice(context.bluetooth.characteristic, queue[0]);
    setQueue((q) => q.slice(1));
  }, [context.bluetooth.characteristic, queue, sendToBluetoothDevice]);

  return {
    connectToBluetoothDevice,
    disconnectBluetooth,
    sendToBluetoothDevice,
    setBluetoothQueue,
  };
};
