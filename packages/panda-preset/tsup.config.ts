import { defineConfig } from "tsup";

import { peerDependencies } from "./package.json";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  external: [
    ...Object.keys(peerDependencies),
  ],
  experimentalDts: true,
  tsconfig: "./tsconfig.json",
  clean: true,
});
