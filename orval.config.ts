import { defineConfig } from "orval";

export default defineConfig({
  todoStore: {
    output: {
      target: "./frontend/app/gen/api/index.ts",
      schemas: "./frontend/app/gen/types",
      indexFiles: true,
      client: "react-query",
      mock: true,
      override: {
        mutator: {
          path: "./frontend/app/api/mutator/custom-axios-instance.ts",
          name: "customInstance",
        },
      },
    },
    input: {
      target: "./openApi.yaml",
    },
  },
});
