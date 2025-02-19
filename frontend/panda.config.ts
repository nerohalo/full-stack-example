import { defineConfig } from "@pandacss/dev";
import { createPreset, radixConfig } from "panda-preset";

export default defineConfig({
  ...radixConfig,

  include: [
    "../node_modules/design-system/src/**/*.{ts,tsx}",
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
  ],

  exclude: [],

  presets: [
    createPreset({
      useDarkMode: true,
      useP3: true,
      colorScales: ["gray", "ruby", "grass", "orange", "indigo", "blackA"],
    }),
  ],
});
