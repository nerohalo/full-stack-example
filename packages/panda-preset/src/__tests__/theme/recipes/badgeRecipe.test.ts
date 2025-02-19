import { describe, it, expect } from "vitest";

import { badgeRecipe } from "@/theme/recipes/badgeRecipe";

describe("badge recipe", () => {
  it("should be exported", () => {
    expect(badgeRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(badgeRecipe.className).toBeDefined();
    expect(badgeRecipe.className).toEqual("badge");
  });

  it("should have a base style", () => {
    expect(badgeRecipe.base).toBeDefined();
    expect(badgeRecipe.base).not.toStrictEqual({});
  });

  it("should have correct color variants", () => {
    expect(badgeRecipe.variants?.color).toBeDefined();
    expect(Object.keys(badgeRecipe.variants?.color as object)).toStrictEqual([
      "indigo",
      "ruby",
      "grass",
      "orange",
      "gray",
    ]);
  });

  it("should have correct size variants", () => {
    expect(badgeRecipe.variants?.size).toBeDefined();
    expect(Object.keys(badgeRecipe.variants?.size as object)).toStrictEqual([
      "1",
      "2",
      "3",
    ]);
  });

  it("should have correct defaultVariants", () => {
    expect(badgeRecipe.defaultVariants).toBeDefined();
    expect(badgeRecipe?.defaultVariants).toMatchObject({
      size: "3",
      color: "gray",
    });
  });

  it("should have correct jsx values", () => {
    expect(badgeRecipe.jsx).toEqual(["Badge"]);
  });

  it("should have correct staticCss values", () => {
    expect(badgeRecipe.staticCss).toEqual([ { color: [ "*" ] } ]);
  });
});
