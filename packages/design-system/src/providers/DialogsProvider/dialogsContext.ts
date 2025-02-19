import { createContext } from "context";

export type DialogsContextType = {
  name: string,
  data: any,
  showDialog: (name: string, data?: unknown, closeCallback?: (data?: unknown) => void) => void,
  closeDialog: (data?: unknown) => void,
  closeCallback: (data?: unknown) => void,
};

export type DialogComponentProps = {
  showDialog: DialogsContextType["showDialog"],
  closeDialog: DialogsContextType["closeDialog"],
};

export const [Provider, useDialogs, DialogsContext] = createContext<DialogsContextType>({
  name: "DialogsContext",
  strict: false,
});
