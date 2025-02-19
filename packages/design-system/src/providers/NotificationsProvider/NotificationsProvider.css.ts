import { cva } from "@css/styled-system/css";

export const container = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "2",
    zIndex: "toast",
  },
  variants: {
    progressBar: {
      true: {
        animation: "rightToLeft linear 1 forwards",
      },
    },
    positioningStrategy: {
      "sticky": { position: "sticky" },
      "fixed": { position: "fixed" },
      "relative": { position: "relative" },
      "absolute": { position: "absolute" },
    },
    position: {
      "top-left": {
        top: "4",
        left: "4",
      },
      "top-center": {
        top: "4",
        left: "50%",
        transform: "translateX(-50%)",
      },
      "top-right": {
        top: "4",
        right: "4",
      },
      "bottom-left": {
        bottom: "4",
        left: "4",
      },
      "bottom-center": {
        bottom: "4",
        left: "50%",
        transform: "translateX(-50%)",
      },
      "bottom-right": {
        bottom: "4",
        right: "4",
      },
    },
  },
});
