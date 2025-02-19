import { defineRecipe } from "@pandacss/dev";

export const iconButtonRecipe = defineRecipe({
  className: "iconButton",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    userSelect: "none",
    textAlign: "center",
    cursor: "pointer",
    outline: "none",
    background: "colorPalette.a.3",
    borderColor: "colorPalette.a.7",
    borderStyle: "solid",
    borderWidth: "1px",
    _hover: {
      background: "colorPalette.a.4",
    },
    _active: {
      background: "colorPalette.a.5",
    },
    _focus: {
      outline: "2px solid {colorPalette.8}",
      outlineOffset: "-1px",
    },
    _focusVisible: {
      outlineStyle: "solid",
      outlineWidth: "2px",
      outlineColor: "colorPalette.8",
      outlineOffset: "-1px",
    },
  },
  variants: {
    color: {
      ruby: {
        colorPalette: "ruby",
      },
      grass: {
        colorPalette: "grass",
      },
      indigo: {
        colorPalette: "indigo",
      },
      orange: {
        colorPalette: "orange",
      },
      gray: {
        colorPalette: "gray",
      },
    },
    size: {
      "1": {
        height: "6",
        width: "6",
        borderRadius: "1",
        "& > svg": {
          height: "16px",
          width: "16px",
        },
      },
      "2": {
        height: "8",
        width: "8",
        borderRadius: "2",
        "& > svg": {
          height: "20px",
          width: "20px",
        },
      },
      "3": {
        height: "10",
        width: "10",
        borderRadius: "3",
        "& > svg": {
          height: "24px",
          width: "24px",
        },
      },
    },
  },
  defaultVariants: {
    color: "gray",
    size: "2",
  },
  jsx: ["IconButton"],
});
