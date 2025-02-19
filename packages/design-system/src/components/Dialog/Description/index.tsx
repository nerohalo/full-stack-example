import { cx } from "@css/styled-system/css";
import { type ReactNode } from "react";

import { Text, type TextProps } from "../../Text";
import { useDialog } from "../dialogContext.ts";

export type DialogDescriptionProps = {
  children: ReactNode,
} & TextProps;

export const Description = ({
  children,
  className,
  ...props
}: DialogDescriptionProps) => {
  const { dialogStyles } = useDialog();

  return (
    <Text {...props} className={cx(dialogStyles.description, className)}>
      {children}
    </Text>
  );
};
