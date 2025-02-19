import { defineConfig } from "@pandacss/dev";

export const radixConfig = defineConfig({
  preflight: true,
  prefix: "radix",

  jsxFramework: "react",

  outdir: "styled-system",
  importMap: "@css/styled-system",
});
