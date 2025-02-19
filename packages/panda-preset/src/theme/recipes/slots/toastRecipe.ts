import { defineSlotRecipe } from "@pandacss/dev";

export const toastRecipe = defineSlotRecipe({
  className: "toast",
  slots: [
    "root",
    "closeButton",
    "progressBar",
  ],
  base: {
    root: {
      position:"relative",
      display: "flex",
      flexDirection: "column",
      gap: "2",
      paddingX: "4",
      paddingY:"4",
      borderRadius: "2",
      boxShadow: "3",
      overflow: "hidden",
      width: "100%",
      minWidth: "282px",
    },
    closeButton: {
      position: "absolute",
      top: "4",
      right: "3",
    },
    progressBar: {
      height: "1",
      marginY: "2",
      borderRadius: "2",
      animation: "trackProgress linear 1 forwards",
    },
  },
  variants: {
    color: {
      ruby: {
        root: {
          background: "ruby.4",
          color: "ruby.12",
        },
        progressBar: {
          background: "ruby.9",
        },
      },
      indigo: {
        root: {
          background: "indigo.4",
          color: "indigo.12",
        },
        progressBar: {
          background: "indigo.9",
        },
      },
      grass: {
        root: {
          background: "grass.4",
          color: "grass.12",
        },
        progressBar: {
          background: "grass.9",
        },
      },
      orange: {
        root: {
          background: "orange.4",
          color: "orange.12",
        },
        progressBar: {
          background: "orange.9",
        },
      },
    },
  },
  defaultVariants: {
    color: "grass",
  },
  jsx: ["Toast"],
  staticCss: [{ color: ["*"] }],
});
