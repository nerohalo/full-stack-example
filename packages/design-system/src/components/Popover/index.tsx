import { popoverRecipe } from "@css/styled-system/recipes";
import { useClick, useDismiss, useInteractions } from "@floating-ui/react";
import { type ReactNode, type RefObject, useState } from "react";

import { useSetupFloating, type FloatingConfig } from "../../hooks";

import { Layer } from "./Layer";
import { PopoverProvider } from "./PopoverContext";
import { Trigger } from "./Trigger";

export type PopOverProps = {
  children: ReactNode,
  isOpen: boolean,
  config?: Omit<FloatingConfig, "middleware">,
  onOpenChange?: (isOpen: boolean) => void,
};

export const Popover = ({
  children,
  isOpen,
  config,
  onOpenChange,
}: PopOverProps) => {
  const [arrowRef, setArrowRef] = useState<RefObject<Element | null> | Element | null>(null);
  const {
    refs,
    floatingStyles,
    context,
  } = useSetupFloating({
    isOpen,
    onOpenChange: (isOpen) => {
      if (onOpenChange) {
        onOpenChange(isOpen);
      }
    },
    config: {
      arrow: { element: arrowRef, padding: 4 },
      shift: { padding: 8 },
      ...config,
    },
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const popoverStyles = popoverRecipe();

  return (
    <PopoverProvider
      value={{
        refs,
        setArrowRef,
        floatingStyles,
        context,
        isOpen,
        getReferenceProps,
        getFloatingProps,
        popoverStyles,
      }}
    >
      {children}
    </PopoverProvider>
  );
};

Popover.Trigger = Trigger;
Popover.Layer = Layer;
