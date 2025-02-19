import { defineSlotRecipe } from "@pandacss/dev";

export const collapsibleRecipe = defineSlotRecipe({
  className: "collapsible",
  slots: [
    "panel",
    "trigger",
  ],
  base: {
    panel: {},
    trigger: {
      outline: "none",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4",
    },
  },
  variants: {
    expanded: {
      true: {
        panel: {
          display: "block",
        },
      },
      false: {
        panel: {
          display: "none",
        },
      },
    },
  },
  jsx: ["Collapsible"],
});
