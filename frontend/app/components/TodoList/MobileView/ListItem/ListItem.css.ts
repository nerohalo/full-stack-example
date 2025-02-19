import { css, cva } from "@css/styled-system/css";

export const trigger = cva({
  base: {
    background: "gray.3",
    padding: "3",
    borderRadius: "3",
  },
  variants: {
    expanded: {
      true: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
  },
});

export const expandedContent = css({
  background: "gray.3",
  padding: "3",
  borderRadius: "3",
  borderTop: "1px solid {colors.gray.7}",
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
});
