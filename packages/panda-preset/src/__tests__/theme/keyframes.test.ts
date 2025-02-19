import { describe, it, expect } from "vitest";

import { keyframes } from "@/theme/keyframes";

describe("keyframes", () => {
  it("should have proper key structure", () => {
    expect(Object.keys(keyframes)).toStrictEqual(["rightToLeft", "trackProgress", "rotate"]);
  });
});
