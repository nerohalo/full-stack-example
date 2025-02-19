import { css, cva } from "@css/styled-system/css";

export const container = css({
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  background: "gray.1",
  left: "0",
  zIndex: "dropdown",
  width: "100%",
  height: "100%",
  padding: "4",
  gap: "3",
  top: "calc({spacing.16} + 1px)",
});

export const link = cva({
  base: {
    display: "flex",
    paddingX: "3",
    paddingY: "2",
    borderRadius: "full",
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
          _hover: "gray.a.5",
        },
        color: {
          base: "gray.a.11",
          _hover: "gray.12",
        },
      },
    },
  },
});
