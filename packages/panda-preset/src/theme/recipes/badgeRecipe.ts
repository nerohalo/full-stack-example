import { defineRecipe } from "@pandacss/dev";

export const badgeRecipe = defineRecipe({
  className: "badge",
  base: {
    display: "inline-flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    fontWeight: "medium",
    height: "fit-content",
  },
  variants: {
    color: {
      indigo: {
        background: "indigo.a.3",
        color: "indigo.11",
      },
      ruby: {
        background: "ruby.a.3",
        color: "ruby.11",
      },
      grass: {
        background: "grass.a.3",
        color: "grass.11",
      },
      orange: {
        background: "orange.a.3",
        color: "orange.11",
      },
      gray: {
        background: "gray.a.3",
        color: "gray.11",
      },
    },
    size: {
      "1": {
        fontSize: "1",
        lineHeight: "1",
        letterSpacing: "1",
        padding:"calc({spacing.1} * 1.5)",
        gap: "calc({spacing.1} * 1.5)",
        borderRadius: "1",
      },
      "2": {
        fontSize: "1",
        lineHeight: "1",
        letterSpacing: "1",
        paddingY:"1",
        paddingX:"2",
        gap: "calc({spacing.1} * 1.5)",
        borderRadius: "2",
      },
      "3": {
        fontSize: "2",
        lineHeight: "2",
        letterSpacing: "2",
        paddingY:"1",
        paddingX:"calc({spacing.2} * 1.25)",
        gap: "2",
        borderRadius: "2",
      },
    },
  },
  defaultVariants: {
    size: "3",
    color: "gray",
  },
  staticCss: [{ color: ["*"] }],
  jsx: ["Badge"],
});
