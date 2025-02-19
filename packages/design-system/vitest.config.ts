import path from "path";

import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    environment: "jsdom",
    setupFiles: path.resolve(__dirname, "./vitest.setup.ts"),
    globals: true,
  },
});
