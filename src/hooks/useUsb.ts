/// <reference types="w3c-web-usb" />
import React from "react";
// Hooks
import { Context } from "./Provider";
// Configs
import { portConfig } from "../configs/usb";

export const useUsb = () => {
  const [context, setContext] = React.useContext(Context);
  const contextRef = React.useRef(context);

  React.useEffect((): void => {
    contextRef.current = context;
  }, [context]);

  const read = React.useCallback(async (usb: USBDevice): Promise<void> => {
    const config = portConfig.FT232;
    const textDecoder = new TextDecoder();
    try {
      const result = await usb.transferIn(config.endpointIn, 64);
      if (result) {
        if (result.data) {
          const text = textDecoder.decode(result.data);
          text && text !== "`" && console.log(text);
        }
        /* There is no need to read the response signal from the FT232 */
        // setTimeout(()=>readLoop(), 1000/60)
        // readLoop();
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const connect = React.useCallback(
    async (usb: any): Promise<void> => {
      const config = portConfig.FT232;
      try {
        await usb.open({ baudRate: config.baudRate });
        if (usb.configuration === null)
          return await usb.selectConfiguration(config.configurationValue);
        await usb.claimInterface(config.interfaceNumber);
        await usb.selectAlternateInterface(config.interfaceNumber, 0);
        await usb.controlTransferOut(config.controlTransferOut);
        /* There is no need to read the response signal from the FT232 */
        // read(usb);
      } catch (error) {
        throw error;
      }
    },
    [/* read */]
  );

  const onDisconnectUsbDevice = React.useCallback((): void => {
    alert("Lost Connection of Usb Device");
    setContext((c) => ({
      ...c,
      usb: { isConnected: false, isSearching: false },
    }));
  }, [setContext]);

  const onUsbDeviceFound = React.useCallback(
    async (usbDevices: USBDevice[]): Promise<void> => {
      if (usbDevices.length === 0) {
        setContext((c) => ({ ...c, usb: { ...c.usb, isConnected: false } }));
      } else {
        const usb = usbDevices[0];
        setContext((c) => ({
          ...c,
          usb: { ...c.usb, isConnected: true, device: usb },
        }));
        try {
          await connect(usb);
        } catch (error) {
          throw error;
        }
      }
    },
    [connect, setContext]
  );

  const getUsbDevices = React.useCallback(async (): Promise<USBDevice[]> => {
    console.log("Getting Usb Devices...");
    try {
      const devices = await navigator.usb.getDevices();
      navigator.usb.ondisconnect = onDisconnectUsbDevice;
      return devices;
    } catch (error) {
      throw error;
    }
  }, [onDisconnectUsbDevice]);

  const findUsbDevices = React.useCallback(async (): Promise<void> => {
    console.log("Finding Usb Devices...");
    try {
      const devices = await getUsbDevices();
      if (devices) await onUsbDeviceFound(devices);
    } catch (error) {
      throw error;
    }
  }, [getUsbDevices, onUsbDeviceFound]);

  const requestUsbDevice = React.useCallback(async (): Promise<USBDevice> => {
    console.log("Requesting Usb Device...");
    try {
      const filters = [
        { vendorId: 0x0403, productId: 0x6001 }, // FT232
        // { vendorId: vid, productId: pid },
        // { vendorId: 0x2341, productId: 0x8036 }, // Arduino Leonard
        // { vendorId: 0x0f0d, productId: 0x00c1 }, // HORI HORIPAD
        // { vendorId: 0x0f0d, productId: 0x0092 }, // HORI Pokken Pro Pad
        // { vendorId: 0x057e, productId: 0x2009 }, // Nintendo Pro-Con
        // { vendorId: 0x057e, productId: 0x2007 }, // Nintendo Joy-Con  R
        // { vendorId: 0x057e, productId: 0x2006 }, // Nintendo Joy-Con  L
      ];
      const device = await navigator.usb.requestDevice({ filters: filters });
      return device;
    } catch (error) {
      throw error;
    }
  }, []);

  const connectToUsbDevice = React.useCallback(async (): Promise<void> => {
    console.log("Connecting to Usb Device...");
    try {
      const { usb } = contextRef.current;
      if (usb) {
        setContext((c) => ({
          ...c,
          usb: { ...c.usb, isConnected: false, device: undefined },
        }));
      }
      const newPort = await requestUsbDevice();
      if (newPort) await onUsbDeviceFound([newPort]);
    } catch (error) {
      throw error;
    }
  }, [onUsbDeviceFound, requestUsbDevice, setContext]);

  const disconnectUsbDevice = React.useCallback(async (): Promise<void> => {
    console.log("Disconnecting Usb Device...");
    try {
      await context.usb.device?.close();
      onDisconnectUsbDevice();
    } catch (error) {
      throw error;
    }
  }, [context.usb.device, onDisconnectUsbDevice]);

  const sendToUsbDevice = React.useCallback(
    async (usb: USBDevice, data: Uint8Array[]): Promise<void> => {
      const config = portConfig.FT232;
      try {
        await Promise.all(
          data.map(async (d) => await usb.transferOut(config.endpointOut, d))
        );
      } catch (error) {
        onDisconnectUsbDevice();
        throw error;
      }
    },
    [onDisconnectUsbDevice]
  );

  return {
    read,
    onUsbDeviceFound,
    findUsbDevices,
    getUsbDevices,
    requestUsbDevice,
    sendToUsbDevice,
    disconnectUsbDevice,
    connectToUsbDevice,
  };
};
