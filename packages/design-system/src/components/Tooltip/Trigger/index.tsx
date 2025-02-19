import { cx } from "@css/styled-system/css";
import { Box } from "@css/styled-system/jsx";
import { isValidElement, type HTMLAttributes, type ReactNode, cloneElement } from "react";

import { useTooltip } from "../tooltipContext";

type TooltipTriggerProps = {
  children: ReactNode,
  asChild?: boolean,
} & HTMLAttributes<HTMLDivElement>;

export const Trigger = ({
  children,
  asChild,
  className,
  ...rest
}: TooltipTriggerProps) => {
  const {
    refs,
    getReferenceProps,
    tooltipStyles,
  } = useTooltip();

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...rest,
      ref: refs.setReference,
      ...getReferenceProps(),
    } as Partial<unknown>);
  }

  return (
    <Box
      {...rest}
      ref={refs.setReference}
      {...getReferenceProps()}
      className={cx(tooltipStyles.trigger, className)}
    >
      {children}
    </Box>
  );
};

Trigger.displayName = "Tooltip.Trigger";
