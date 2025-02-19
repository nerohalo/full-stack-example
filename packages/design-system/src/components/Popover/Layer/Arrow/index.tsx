import { cx } from "@css/styled-system/css";
import { FloatingArrow, type FloatingArrowProps } from "@floating-ui/react";
import type { HTMLAttributes } from "react";

import { usePopover } from "../../PopoverContext";

export type TooltipArrowProps = HTMLAttributes<SVGSVGElement> & Omit<FloatingArrowProps, "context">;

export const Arrow = ({
  className,
  ...rest
}: TooltipArrowProps) => {
  const {
    context,
    setArrowRef,
    popoverStyles,
  } = usePopover();

  return (
    <FloatingArrow
      {...rest}
      role="img"
      focusable={false}
      ref={setArrowRef}
      context={context}
      width={14}
      height={7}
      strokeWidth={1}
      tipRadius={1}
      style={{ transform: "translateY(-1px)" }}
      className={cx(popoverStyles.arrow, className)}
    />
  );
};
