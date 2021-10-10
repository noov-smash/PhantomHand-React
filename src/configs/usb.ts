export const vid = 0x0f0d;
export const pid = 0x0092;
export const portConfig = {
  arduino: {
    configurationValue: 1,
    interfaceNumber: 2,
    endpointIn: 5,
    endpointOut: 4,
    baudRate: 9600, //9600
    controlTransferOut: {
      requestType: "class",
      recipient: "interface",
      request: 0x22,
      value: 0x01,
      index: 0x02,
    },
    disconnectControlTransferOut: {
      requestType: "class",
      recipient: "interface",
      request: 0x22,
      value: 0x00,
      index: 2, // same as interfaceNumber
    },
  },
  FT232: {
    configurationValue: 1,
    interfaceNumber: 0,
    endpointIn: 1,
    endpointOut: 2,
    baudRate: 115200, //115200
    controlTransferOut: {
      requestType: "vendor",
      recipient: "device",
      request: 3 /* FTDI_SIO_SET_BAUDRATE_REQUEST */,
      value: 26, // divisor_value
      index: 0, // divisor_index
    },
    disconnectControlTransferOut: {
      requestType: "vendor",
      recipient: "device",
      request: 3,
      value: 16696,
      index: 0, // same as interfaceNumber
    },
  },
};
