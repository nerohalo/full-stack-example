import { describe, test, expect } from "vitest";

import { conditions } from "@/conditions";

describe("conditions", () => {
  test("should have a p3", () => {
    expect(conditions.p3).toEqual("@media (color-gamut: p3)");
  });

  test("should have an dark", () => {
    expect(conditions.dark).toEqual(".dark &");
  });
});
