import { defineConfig } from "tsup";

import { peerDependencies } from "./package.json";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  external: [
    ...Object.keys(peerDependencies),
  ],
  clean: true,
  tsconfig: "./tsconfig.json",
  outDir: "dist",
});
