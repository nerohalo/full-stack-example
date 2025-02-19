import { describe, it, expect } from "vitest";

import { fontWeights } from "@/theme/tokens/fontWeights";

describe("fontWeights", () => {
  it("should have proper key structure", () => {
    expect(Object.keys(fontWeights)).toStrictEqual(["light", "regular", "medium", "bold", "default"]);
  });
});
