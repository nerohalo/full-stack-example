import { defineConfig } from "@pandacss/dev";
import { createPreset, radixConfig } from "panda-preset";

export default defineConfig({
  ...radixConfig,

  exclude: [],
  outdir: ".",

  clean: true,

  conditions: {
    extend: {
      focused: "&:is([data-focused=\"true\"])",
      placementTop: "&:is([data-placement=\"top\"])",
      placementBottom: "&:is([data-placement=\"bottom\"])",
    },
  },

  presets: [
    createPreset({
      useDarkMode: true,
      useP3: true,
      colorScales: ["gray", "ruby", "grass", "orange", "indigo","blackA"],
    }),
  ],
  staticCss: {
    recipes: {
      iconButton: ["*"],
    },
  },
});
