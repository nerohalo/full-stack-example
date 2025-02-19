/* eslint-disable react/button-has-type */
import { cx } from "@css/styled-system/css";
import { iconButtonRecipe, type IconButtonRecipeVariantProps } from "@css/styled-system/recipes";
import { forwardRef, type HTMLAttributes, useRef } from "react";
import { type AriaButtonProps, useButton } from "react-aria";

import { filterDOMProps, mergeRefs } from "../../helpers";

export type IconButtonProps = AriaButtonProps
  & IconButtonRecipeVariantProps
  & Omit<HTMLAttributes<HTMLButtonElement>, "color">;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, forwardedRef) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(props, ref);
  const {
    children,
    color,
    size,
    className,
    ...rest
  } = props;

  return (
    <button
      {...buttonProps}
      {...filterDOMProps(rest, { omitEventProps: true })}
      ref={mergeRefs(ref, forwardedRef)}
      className={cx(iconButtonRecipe({ color, size }), className)}
    >
      {children}
    </button>
  );
});
