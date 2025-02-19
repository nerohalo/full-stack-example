import { describe, it, expect } from "vitest";

import { shadows } from "@/theme/tokens/shadows";

describe("shadows", () => {
  it("should have proper key structure", () => {
    expect(Object.keys(shadows)).toStrictEqual(["1", "2", "3"]);
  });
});
