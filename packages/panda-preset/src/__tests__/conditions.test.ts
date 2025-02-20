import { describe, it, expect } from "vitest";

import { conditions } from "@/conditions";

describe("conditions", () => {
  it("should have a p3", () => {
    expect(conditions.p3).toEqual("@media (color-gamut: p3)");
  });

  it("should have an dark", () => {
    expect(conditions.dark).toEqual(".dark &");
  });
});
