import { cx } from "@css/styled-system/css";
import { Box, type BoxProps } from "@css/styled-system/jsx";

import { useCollapsible } from "../collapsibleContext";

export type PanelProps = BoxProps;

export const Panel = ({
  children,
  className,
  ...rest
}: PanelProps) => {
  const { panelProps, panelRef, collapsibleStyles } = useCollapsible();

  return (
    <Box
      ref={panelRef}
      {...rest}
      {...panelProps}
      className={cx(collapsibleStyles.panel, className)}
    >
      {children}
    </Box>
  );
};
