import { describe, it, expect } from "vitest";

import { radii } from "@/theme/tokens/radii";

describe("radii", () => {
  it("should have proper key structure", () => {
    expect(Object.keys(radii)).toStrictEqual(["1", "2", "3", "4", "5" , "6", "full"]);
  });
});
