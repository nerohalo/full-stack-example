import { describe, it, expect } from "vitest";

import * as root from "@/index";

describe("root", () => {
  it("should export a config", () => {
    expect(root.radixConfig).toBeDefined();
  });

  it("should export a createPreset", () => {
    expect(root.createPreset).toBeDefined();
  });

  it("should export a conditions", () => {
    expect(root.conditions).toBeDefined();
  });

  it("should export a createTheme", () => {
    expect(root.createTheme).toBeDefined();
  });
});
