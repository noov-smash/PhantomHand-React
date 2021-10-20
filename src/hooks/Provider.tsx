import React from "react";
import { ContextProps } from "../interfaces/context";
import { useAuth } from "./useAuth";

export const NeutralGamepadProps = {
  buttonStates: {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
  },
  stickStates: {
    18: 128,
    19: 128,
    20: 128,
    21: 128,
  },
}

export const ContextInitial: ContextProps = {
  app: {
    isLoading: false,
  },
  debug: false,
  user: {
    isSignedIn: false,
    uid: undefined,
  },
  project: {
    isLoaded: false,
  },
  usb: {
    isConnected: false,
    isSearching: false,
  },
  bluetooth: {
    isConnected: false,
  },
  emulator: {
    state: "standby",
    time: 0,
    command: {
      id: "",
      title: "",
      path: "",
      signals: [],
    },
  },
  gamePad: {
    isConnected: false,
    ...NeutralGamepadProps,
  },
};

// contexts
export const Context = React.createContext<
  [ContextProps, React.Dispatch<React.SetStateAction<ContextProps>>]
>([ContextInitial, () => {}]);

// component
export const Provider: React.FC = (props) => {
  const { signInAnonymously } = useAuth();
  const [context, setContext] = React.useState<ContextProps>(ContextInitial);

  const init = React.useCallback(async (): Promise<void> => {
    const user = await signInAnonymously();
    user &&
      setContext((c: ContextProps) => ({
        ...c,
        user: {
          ...c.user,
          ...user,
          isSignedIn: true,
        },
      }));
  }, [signInAnonymously]);

  React.useEffect((): void => {
    init();
  }, [init]);

  return (
    <Context.Provider value={[context, setContext]}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
