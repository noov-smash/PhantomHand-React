import {
  CommandProps,
  LoadedProjectProps,
  UnloadedProjectProps,
  UnsignedUserProps,
  SignedUserProps,
} from ".";
export interface ContextProps {
  app: {
    isLoading: boolean;
  };
  debug: boolean;
  user: UnsignedUserProps | SignedUserProps;
  project: UnloadedProjectProps | LoadedProjectProps;
  usb:
    | {
        isConnected: false;
        isSearching: boolean;
        device?: USBDevice;
      }
    | {
        isConnected: true;
        isSearching: boolean;
        device: USBDevice;
      };
  bluetooth:
    | {
        isConnected: false;
        characteristic?: BluetoothRemoteGATTCharacteristic;
        device?: BluetoothDevice;
      }
    | {
        isConnected: true;
        characteristic: BluetoothRemoteGATTCharacteristic;
        device: BluetoothDevice;
      };
  emulator: {
    state: "standby" | "recording" | "playing" | "repeating";
    time: number;
    command: CommandProps;
  };
  gamePad: {
    isConnected: boolean;
    buttonStates: {
      [key: number]: boolean | number;
    };
    stickStates: {
      [key: number]: number;
    };
  };
}
