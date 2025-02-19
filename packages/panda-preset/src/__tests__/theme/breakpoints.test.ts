import { describe, it, expect } from "vitest";

import { breakpoints } from "@/theme/breakpoints";

describe("breakpoints", () => {
  it("should have proper key structure", () => {
    expect(Object.keys(breakpoints)).toStrictEqual([
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
    ]);
  });
});
