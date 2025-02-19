import { type ReactNode, useState } from "react";

import { Provider, type DialogsContextType } from "./dialogsContext";

export type DialogsProviderProps = {
  children?: ReactNode,
};

export const DialogsProvider = ({ children }: DialogsProviderProps) => {
  const [state, setState] = useState<DialogsContextType>({
    name: "",
    data: {},
    closeCallback: () => {},
    showDialog: (name, data = {}, closeCallback = (): void => {}) => {
      setState((prevState) => ({
        ...prevState, name, data, closeCallback,
      }));
    },
    closeDialog: (data = {}) => {
      setState((prevState) => {
        prevState.closeCallback(data);

        return ({
          ...prevState,
          name: "",
          closeCallback: (): void => {},
          data: {},
        });
      });
    },
  });

  return (
    <Provider value={state}>
      {children}
    </Provider>
  );
};
