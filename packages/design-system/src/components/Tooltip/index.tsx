import { tooltipRecipe } from "@css/styled-system/recipes";
import { useHover, useInteractions } from "@floating-ui/react";
import { type ReactNode, type RefObject, useState } from "react";

import { useSetupFloating, type FloatingConfig } from "../../hooks";

import { Layer } from "./Layer";
import { TooltipProvider } from "./tooltipContext";
import { Trigger } from "./Trigger";

export type TooltipProps = {
  children: ReactNode,
  config?: Omit<FloatingConfig, "middleware">,
  hoverConfig?: { delay: number },
};

export const Tooltip = ({
  children,
  config,
  hoverConfig,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [arrowRef, setArrowRef] = useState<RefObject<Element | null> | Element | null>(null);
  const {
    refs,
    floatingStyles,
    context,
  } = useSetupFloating({
    isOpen,
    onOpenChange: setIsOpen,
    config: {
      arrow: { element: arrowRef, padding: 4 },
      shift: { padding: 8 },
      ...config,
    },
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const tooltipStyles = tooltipRecipe();

  return (
    <TooltipProvider
      value={{
        refs,
        floatingStyles,
        context,
        hoverConfig,
        getReferenceProps,
        getFloatingProps,
        setArrowRef,
        isOpen,
        tooltipStyles,
      }}
    >
      {children}
    </TooltipProvider>
  );
};

Tooltip.displayName = "Tooltip";

Tooltip.Trigger = Trigger;
Tooltip.Layer = Layer;
