import { defineSlotRecipe } from "@pandacss/dev";

export const tooltipRecipe = defineSlotRecipe({
  className: "tooltip",
  slots: [
    "trigger",
    "layer",
    "arrow",
  ],
  base: {
    trigger: {
      display: "inline-block",
      alignItems: "center",
    },
    layer: {
      width: "max-content",
      zIndex: "tooltip",
      display: "flex",
      padding: "2",
      borderRadius: "2",
      border: "1px solid {colors.gray.6}",
      background: "gray.2",
      fontSize: "2",
      lineHeight: "2",
      color: "gray.12",
      outline: "none",
      boxShadow: "1",
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
  jsx: ["Tooltip"],
});
