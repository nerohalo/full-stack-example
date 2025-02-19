import { cx } from "@css/styled-system/css";
import { Box } from "@css/styled-system/jsx";
import { AnimatePresence, motion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";

import { useTooltip } from "../tooltipContext";

import { Arrow } from "./Arrow";

type TooltipLayerProps = {
  children: ReactNode,
} & HTMLAttributes<HTMLDivElement>;

export const Layer = ({
  children,
  className,
  ...rest
}: TooltipLayerProps) => {
  const {
    refs,
    floatingStyles,
    context,
    getFloatingProps,
    hoverConfig,
    isOpen,
    tooltipStyles,
  } = useTooltip();

  const { middlewareData: { hide } } = context;

  return (
    <AnimatePresence>
      {isOpen && (
        <Box
          {...rest}
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            ...(hide?.referenceHidden && { visibility: "hidden" }),
            ...(hide?.escaped && { visibility: "hidden" }),
          }}
          {...getFloatingProps()}
          className={cx(tooltipStyles.layer, className)}
          role="tooltip"
          aria-hidden={!isOpen}
        >
          <motion.div
            key="tooltip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: hoverConfig?.delay }}
          >
            {children}
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  );
};

Layer.Arrow = Arrow;

Layer.displayName = "Tooltip.Layer";
