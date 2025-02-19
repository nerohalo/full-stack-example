import { cx } from "@css/styled-system/css";
import { AnimatePresence } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";

import { Portal, type PortalProps } from "../../Portal";
import { usePopover } from "../PopoverContext";

import { Arrow } from "./Arrow";

export type PopOverLayerProps = {
  children: ReactNode,
  portalTarget?: PortalProps["targetSelector"],
} & HTMLAttributes<HTMLDivElement>;

export const Layer = ({
  children,
  className,
  portalTarget = document.body,
  ...rest
}: PopOverLayerProps) => {
  const {
    refs,
    floatingStyles,
    getFloatingProps,
    isOpen,
    popoverStyles,
  } = usePopover();
  const getComponent = () => (
    <AnimatePresence>
      {isOpen && (
        <div
          {...rest}
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
          }}
          {...getFloatingProps()}
          className={cx(popoverStyles.layer, className)}
          role="dialog"
        >
          {children}
        </div>
      )}
    </AnimatePresence>
  );

  return portalTarget !== null
    ? (
      <Portal targetSelector={portalTarget}>
        {getComponent()}
      </Portal>
    )
    : getComponent();
};

Layer.Arrow = Arrow;
