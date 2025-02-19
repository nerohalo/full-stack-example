import { describe, it, expect } from "vitest";

import { zIndex } from "@/theme/tokens/zIndex";

describe("zIndex", () => {
  it("should have proper key structure", () => {
    expect(Object.keys(zIndex)).toStrictEqual([
      "hide",
      "base",
      "docked",
      "dropdown",
      "sticky",
      "banner",
      "overlay",
      "modal",
      "popover",
      "menu",
      "skipNav",
      "toast",
      "tooltip",
      "max",
    ]);
  });
});
