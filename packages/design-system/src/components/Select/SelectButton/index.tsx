/* eslint-disable react/button-has-type */
import { cx } from "@css/styled-system/css";
import { forwardRef, type HTMLAttributes } from "react";
import { type AriaButtonProps, useButton, useObjectRef } from "react-aria";
import type { SelectState } from "react-stately";

import { mergeRefs } from "../../../helpers";
import { filterDOMProps } from "../../../helpers";
import { usePopover } from "../../Popover/PopoverContext";

type ButtonProps = {
  state: SelectState<object>,
  triggerProps: AriaButtonProps<"button">,
} & AriaButtonProps & HTMLAttributes<HTMLButtonElement>;

export const SelectButton = forwardRef<HTMLButtonElement, ButtonProps>((
  props,
  forwardedRef
) => {
  const {
    className,
    children,
    state,
    triggerProps,
    ...rest
  } = props;
  const objRef = useObjectRef(forwardedRef);
  const { buttonProps } = useButton(triggerProps, objRef);
  const { refs, popoverStyles } = usePopover();

  const mergedRef = mergeRefs(objRef, refs.setReference);

  return (
    <button
      {...filterDOMProps(buttonProps, { omitEventProps: state.isOpen })}
      {...filterDOMProps(rest, { omitEventProps: true })}
      ref={mergedRef}
      className={cx(popoverStyles.trigger, className)}
    >
      {children}
    </button>
  );
});
