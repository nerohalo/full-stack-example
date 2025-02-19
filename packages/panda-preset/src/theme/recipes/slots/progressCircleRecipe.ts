import { defineSlotRecipe } from "@pandacss/dev";

export const progressCircleRecipe = defineSlotRecipe({
  className: "progressCircle",
  slots: [
    "root",
    "track",
    "fill",
  ],
  base: {
    root: {
      display: "block",
      transform: "rotate(-90deg)",
    },
    track: {
      fill: "none",
    },
    fill: {
      fill: "none",
      strokeLinecap: "round",
    },
  },
  variants: {
    color: {
      ruby: {
        track: {
          stroke: "ruby.a.3",
        },
        fill: {
          stroke: "ruby.9",
        },
      },
      indigo: {
        track: {
          stroke: "indigo.a.3",
        },
        fill: {
          stroke: "indigo.9",
        },
      },
      grass: {
        track: {
          stroke: "grass.a.3",
        },
        fill: {
          stroke: "grass.9",
        },
      },
      orange: {
        track: {
          stroke: "orange.a.3",
        },
        fill: {
          stroke: "orange.9",
        },
      },
      gray: {
        track: {
          stroke: "gray.a.3",
        },
        fill: {
          stroke: "gray.12",
        },
      },
    },
    size: {
      "1": {
        root:{
          height: "5",
          width: "5",
          padding: "calc({spacing.1} / 2)",
        },
      },
      "2": {
        root: {
          height: "6",
          width: "6",
          padding: "calc({spacing.1} / 2)",
        },
      },
      "3": {
        root: {
          height: "8",
          width: "8",
          padding: "calc({spacing.1} / 2)",
        },
      },
    },
    isIndeterminate: {
      true: {
        root: {
          animation: "rotate 2s linear infinite",
        },
      },
    },
  },
  defaultVariants: {
    color: "gray",
    size: "2",
    isIndeterminate: true,
  },
  jsx: ["ProgressCircle"],
  staticCss: ["*"],
});
