import { cx } from "@css/styled-system/css";
import { textRecipe, type TextRecipeVariantProps } from "@css/styled-system/recipes";
import { forwardRef, type HTMLAttributes } from "react";

export type TextHtmlAttributes = Omit<HTMLAttributes<HTMLSpanElement>, "color">;
export type TextProps = TextRecipeVariantProps & TextHtmlAttributes;

export const Text = forwardRef<HTMLSpanElement, TextProps>(({
  children,
  size,
  color,
  weight,
  align,
  className = "",
  ...rest
}, ref) => (
  <span ref={ref} className={cx(textRecipe({ size, color, weight, align }), className)} {...rest}>
    {children}
  </span>
));

Text.displayName = "Text";
