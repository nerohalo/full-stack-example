import { defineSlotRecipe } from "@pandacss/dev";

export const popoverRecipe = defineSlotRecipe({
  className: "popover",
  slots: [
    "trigger",
    "layer",
    "arrow",
  ],
  base: {
    trigger: {
      display: "inline-block",
    },
    layer: {
      display: "flex",
      backgroundColor: "gray.2",
      borderRadius: "4",
      padding: "2",
      border: "1px solid {colors.gray.6}",
      zIndex: "popover",
      outline: "none",
      boxShadow: "2",
    },
    arrow: {
      "& > path:last-of-type": {
        fill: "gray.2",
      },
      fill: "gray.2",
      "& > path:first-of-type": {
        stroke: "gray.6",
      },
    },
  },
  jsx: ["Popover"],
});
