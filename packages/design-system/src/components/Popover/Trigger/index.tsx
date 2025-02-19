import { cx } from "@css/styled-system/css";
import { cloneElement, type HTMLAttributes, isValidElement } from "react";

import { usePopover } from "../PopoverContext";

export type PopOverTriggerProps = {
  asChild?: boolean,
  className?: string,
} & HTMLAttributes<HTMLDivElement>;

export const Trigger = ({
  children,
  asChild = false,
  className,
  ...rest
}: PopOverTriggerProps) => {
  const { refs, getReferenceProps, popoverStyles } = usePopover();

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...rest,
      ref: refs.setReference,
      ...getReferenceProps(),
    } as Partial<unknown>);
  }

  return (
    <div
      className={cx(popoverStyles.trigger, className)}
      {...rest}
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      {children}
    </div>
  );
};
