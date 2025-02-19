import { describe, it, expect } from "vitest";

import { letterSpacings } from "@/theme/tokens/letterSpacings";

describe("letterSpacings", () => {
  it("should have proper key structure", () => {
    expect(Object.keys(letterSpacings)).toStrictEqual(["1", "2", "3", "4", "5" , "6", "7", "8", "9"]);
  });
});
