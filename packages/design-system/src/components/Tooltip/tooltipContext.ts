import type { UseFloatingReturn, UseInteractionsReturn } from "@floating-ui/react";
import { createContext } from "context";
import type { Ref } from "react";

export type TooltipContextType = {
  isOpen: boolean,
  hoverConfig?: { delay: number },
  context: UseFloatingReturn["context"],
  floatingStyles: UseFloatingReturn["floatingStyles"],
  getFloatingProps: UseInteractionsReturn["getFloatingProps"],
  getReferenceProps: UseInteractionsReturn["getReferenceProps"],
  setArrowRef: Ref<SVGSVGElement> | undefined,
  refs: UseFloatingReturn["refs"],
  tooltipStyles: {
    trigger: string,
    layer: string,
    arrow: string,
  },
};

export const [TooltipProvider, useTooltip] = createContext<TooltipContextType>({
  name: "TooltipContext",
  strict: false,
});
