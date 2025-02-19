import type { AriaCheckboxProps } from "@react-aria/checkbox";
import { forwardRef } from "react";
import { useCheckbox, useObjectRef } from "react-aria";
import { useToggleState } from "react-stately";

export type CheckboxProps = {
  className?: string,
} & AriaCheckboxProps;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((
  props: CheckboxProps,
  forwardedRef
)=> {
  const { className, ...otherProps } = props;
  const ref = useObjectRef(forwardedRef);
  const state = useToggleState(otherProps);
  const { inputProps } = useCheckbox(otherProps, state, ref);

  return (
    <input {...inputProps} ref={ref} className={className} />
  );
});
