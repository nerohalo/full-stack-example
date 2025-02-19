import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    workspace: [
      "packages/*",
      "frontend",
    ],
    coverage: {
      include: [
        "packages/*/src/**",
        "frontend/app/**",
      ],
      exclude: [
        "frontend/app/gen/**",
        "frontend/app/**/*.css.*",
      ],
    },
  },
});
