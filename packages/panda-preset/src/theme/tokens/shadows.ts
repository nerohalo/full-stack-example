import { defineTokens } from "@pandacss/dev";

export const shadows = defineTokens.shadows({
  "1": {
    value: {
      offsetX: 0,
      offsetY: 2,
      blur: 16,
      spread: 0,
      color: "hsla(274, 95%, 8%, 0.1)",
    },
  },
  "2": {
    value: {
      offsetX: 0,
      offsetY: 0,
      blur: 20,
      spread: 4,
      color: "hsla(274, 95%, 8%, 0.1)",
    },
  },
  "3": {
    value: {
      offsetX: 0,
      offsetY: 0,
      blur: 20,
      spread: 8,
      color: "hsla(274, 95%, 8%, 0.25)",
    },
  },
});
