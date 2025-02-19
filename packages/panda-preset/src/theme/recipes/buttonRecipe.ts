import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    userSelect: "none",
    textAlign: "center",
    cursor: "pointer",
    outline: "none",
    whiteSpace: "nowrap",
    background: "colorPalette.a.3",
    color: "colorPalette.a.11",
    _hover: {
      background: "colorPalette.a.4",
    },
    _active: {
      background: "colorPalette.a.5",
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
    fluid: {
      true: {
        width: "100%",
      },
    },
    size: {
      "1": {
        paddingX: "2",
        gap: "1",
        fontSize: "1",
        lineHeight: "1",
        letterSpacing: "1",
        height: "6",
        borderRadius: "1",
      },
      "2": {
        paddingX: "3",
        gap: "2",
        fontSize: "2",
        lineHeight: "2",
        letterSpacing: "2",
        height: "8",
        borderRadius: "2",
      },
      "3": {
        paddingX: "4",
        gap: "3",
        fontSize: "3",
        lineHeight: "3",
        letterSpacing: "3",
        height: "10",
        borderRadius: "3",
      },
    },
  },
  defaultVariants: {
    color: "gray",
    fluid: false,
    size: "2",
  },
  staticCss: ["*"],
  jsx: ["Button"],
});
