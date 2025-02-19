import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
  rightToLeft: {
    from: {
      width: "0%",
    },
    to: {
      width: "100%",
    },
  },
  trackProgress: {
    from: {
      width: "100%",
    },
    to: {
      width: "0%",
    },
  },
  rotate: {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
});
