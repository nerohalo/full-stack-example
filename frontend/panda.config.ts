import { defineConfig } from "@pandacss/dev";
import { createPreset, radixConfig } from "panda-preset";

import { removeUnusedCssVars } from "./remove-unused-css-vars.ts";
import { removeUnusedKeyframes } from "./remove-unused-keyframes.ts";

export default defineConfig({
  ...radixConfig,

  include: [
    "../node_modules/design-system/src/**/*.{ts,tsx}",
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
  ],

  minify: true,

  hooks: {
    "cssgen:done": ({ artifact, content }) => {
      if (artifact === "styles.css") {
        return removeUnusedCssVars(removeUnusedKeyframes(content));
      }
    },
  },

  exclude: [],

  presets: [
    createPreset({
      useDarkMode: true,
      useP3: true,
      colorScales: ["gray", "ruby", "grass", "orange", "indigo", "blackA"],
    }),
  ],
});
