import { describe, it, expect } from "vitest";

import * as config from "@/config.ts";

describe("config", () => {
  it("should export a radixConfig object", () => {
    expect(config.radixConfig).toBeDefined();
  });

  it("should return correct structure", () => {
    expect(config.radixConfig.preflight).toEqual(true);
    expect(config.radixConfig.prefix).toEqual("radix");
    expect(config.radixConfig.jsxFramework).toEqual("react");
    expect(config.radixConfig.outdir).toEqual("styled-system");
    expect(config.radixConfig.importMap).toEqual("@css/styled-system");
  });
});
