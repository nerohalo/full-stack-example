import { createContext } from "context";

export type DialogContextType = {
  dialogStyles: {
    underlay: string,
    root: string,
    title: string,
    description: string,
    content: string,
  },
};

export const [DialogProvider, useDialog] = createContext<DialogContextType>({
  name: "DialogContext",
  strict: false,
});
