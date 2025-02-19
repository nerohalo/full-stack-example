import { cx } from "@css/styled-system/css";
import { type HTMLAttributes, type ReactNode } from "react";

import { useDialog } from "../dialogContext.ts";

export type DialogTitleProps = {
  children: ReactNode,
} & HTMLAttributes<HTMLHeadingElement>;

export const Title = ({
  children,
  className,
  ...props
}: DialogTitleProps) => {
  const { dialogStyles } = useDialog();

  return (
    <h1 {...props} className={cx(dialogStyles.title, className)}>
      {children}
    </h1>
  );
};
