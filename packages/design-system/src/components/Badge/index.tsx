import { cx } from "@css/styled-system/css";
import { badgeRecipe, type BadgeRecipeVariantProps } from "@css/styled-system/recipes";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode,
} & BadgeRecipeVariantProps & Omit<HTMLAttributes<HTMLSpanElement>, "color">;

export const Badge = forwardRef<HTMLSpanElement, Props>(({
  children,
  size,
  color,
  className,
  ...rest
}, ref) => (
  <span
    {...rest}
    className={cx(badgeRecipe({
      color,
      size,
    }), className)}
    ref={ref}
  >
    {children}
  </span>
));
