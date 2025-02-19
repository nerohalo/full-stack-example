import { describe, it, expect } from "vitest";

import { fontSizes } from "@/theme/tokens/fontSizes";

describe("fontSizes", () => {
  it("should have proper key structure", () => {
    expect(Object.keys(fontSizes)).toStrictEqual(["1", "2", "3", "4", "5" , "6", "7", "8", "9"]);
  });
});
