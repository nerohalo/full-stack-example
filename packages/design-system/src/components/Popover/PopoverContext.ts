import type { UseFloatingReturn, UseInteractionsReturn } from "@floating-ui/react";
import { createContext } from "context";
import type { Ref } from "react";

export type PopoverContextType = {
  refs: UseFloatingReturn["refs"],
  floatingStyles: UseFloatingReturn["floatingStyles"],
  context: UseFloatingReturn["context"],
  getReferenceProps: UseInteractionsReturn["getReferenceProps"],
  getFloatingProps: UseInteractionsReturn["getFloatingProps"],
  setArrowRef: Ref<SVGSVGElement> | undefined,
  isOpen: boolean,
  popoverStyles: {
    trigger: string,
    layer: string,
    arrow: string,
  },
};

export const [PopoverProvider, usePopover, Context] = createContext<PopoverContextType>({
  name: "PopoverContext",
  strict: false,
});
