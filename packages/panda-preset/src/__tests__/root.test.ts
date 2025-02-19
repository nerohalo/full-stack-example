import { describe, test, expect } from "vitest";

import * as root from "@/index";

describe("root", () => {
  test("should export a config", () => {
    expect(root.radixConfig).toBeDefined();
  });

  test("should export a createPreset", () => {
    expect(root.createPreset).toBeDefined();
  });

  test("should export a conditions", () => {
    expect(root.conditions).toBeDefined();
  });

  test("should export a createTheme", () => {
    expect(root.createTheme).toBeDefined();
  });
});
