import { Stack } from "@css/styled-system/jsx";
import type { HTMLAttributes, ReactNode } from "react";

import { useDialog } from "../dialogContext";

export type DialogContentProps = {
  children: ReactNode,
} & HTMLAttributes<HTMLDivElement>;

export const Content = ({
  children,
  ...props
}: DialogContentProps) => {
  const { dialogStyles } = useDialog();

  return (
    <Stack className={dialogStyles.content} direction="column" gap="2" w="100%" {...props}>
      {children}
    </Stack>
  );
};
