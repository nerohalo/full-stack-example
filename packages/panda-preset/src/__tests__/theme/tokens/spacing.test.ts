import { describe, it, expect } from "vitest";

import { spacing } from "@/theme/tokens/spacing";

describe("spacing", () => {
  it("should have proper key structure", () => {
    expect(Object.keys(spacing)).toStrictEqual([
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
    ]);
  });
});
