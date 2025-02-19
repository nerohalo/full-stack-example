import { defineRecipe } from "@pandacss/dev";

export const textRecipe = defineRecipe({
  className: "text",
  base: {
    display: "inline-block",
  },
  variants: {
    color: {
      indigo: {
        color: "indigo.11",
      },
      ruby: {
        color: "ruby.11",
      },
      grass: {
        color: "grass.11",
      },
      orange: {
        color: "orange.11",
      },
      gray: {
        color: "gray.11",
      },
      inherit: {
        color: "inherit",
      },
    },
    size: {
      1: {
        fontSize: "1",
        lineHeight: "1",
      },
      2: {
        fontSize: "2",
        lineHeight: "2",
      },
      3: {
        fontSize: "3",
        lineHeight: "3",
      },
      4: {
        fontSize: "4",
        lineHeight: "4",
      },
      5: {
        fontSize: "5",
        lineHeight: "5",
      },
      6: {
        fontSize: "6",
        lineHeight: "6",
      },
      7: {
        fontSize: "7",
        lineHeight: "7",
      },
      8: {
        fontSize: "8",
        lineHeight: "8",
      },
      9: {
        fontSize: "9",
        lineHeight: "9",
      },
    },
    weight: {
      light: {
        fontWeight: "light",
      },
      regular: {
        fontWeight: "regular",
      },
      medium: {
        fontWeight: "medium",
      },
      bold: {
        fontWeight: "bold",
      },
    },
    align: {
      left: {
        textAlign: "left",
      },
      right: {
        textAlign: "right",
      },
      center: {
        textAlign: "center",
      },
    },
  },
  defaultVariants: {
    size: 3,
    color: "inherit",
    weight: "regular",
  },
  jsx: ["Text"],
});
