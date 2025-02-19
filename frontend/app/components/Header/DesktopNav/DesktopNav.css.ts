import { css, cva } from "@css/styled-system/css";

export const container = css({
  display: {
    base: "none",
    sm: "flex",
  },
  alignItems: "center",
  gap: "4",
  width: "100%",
});

export const link = cva({
  base: {
    display: "flex",
    paddingX: "2",
    paddingY: "1",
    borderRadius: "full",
    fontSize: "3",
    lineHeight: "3",
    textTransform: "uppercase",
    textDecoration: "none",
  },
  variants: {
    isActive: {
      true: {
        background: "gray.12",
        color: "gray.1",
        fontWeight: "bold",
      },
      false: {
        background: {
          base: "gray.1",
          _hover: "gray.a.3",
        },
        color: {
          base: "gray.11",
          _hover: "gray.12",
        },
      },
    },
  },
});
