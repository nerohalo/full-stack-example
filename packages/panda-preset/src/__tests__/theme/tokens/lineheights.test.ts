import { describe, it, expect } from "vitest";

import { lineHeights } from "@/theme/tokens/lineHeights";

describe("lineHeights", () => {
  it("should have proper key structure", () => {
    expect(Object.keys(lineHeights)).toStrictEqual(["1", "2", "3", "4", "5" , "6", "7", "8", "9"]);
  });
});
