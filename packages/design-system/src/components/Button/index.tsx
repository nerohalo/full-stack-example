/* eslint-disable react/button-has-type */
import { cx } from "@css/styled-system/css";
import { buttonRecipe, type ButtonRecipeVariantProps } from "@css/styled-system/recipes";
import { forwardRef } from "react";
import { type AriaButtonProps, useButton, useObjectRef } from "react-aria";

import { filterDOMProps } from "../../helpers";

type ButtonProps = {
  className?: string,
} & ButtonRecipeVariantProps & AriaButtonProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  props,
  forwardedRef
) => {
  const ref = useObjectRef(forwardedRef);
  const { buttonProps } = useButton(props, ref);
  const {
    children,
    color,
    fluid,
    size,
    className,
    ...rest
  } = props;

  return (
    <button
      {...buttonProps}
      {...filterDOMProps(rest, { omitEventProps: true })}
      ref={ref}
      className={cx(buttonRecipe({ color, fluid, size }), className)}
    >
      {children}
    </button>
  );
});
