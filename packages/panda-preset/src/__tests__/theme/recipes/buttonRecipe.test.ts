import { describe, expect, it } from "vitest";

import { buttonRecipe } from "@/theme/recipes/buttonRecipe";

describe("button recipe", () => {
  it("should be exported", () => {
    expect(buttonRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(buttonRecipe.className).toBeDefined();
    expect(buttonRecipe.className).toEqual("button");
  });

  it("should have a base style", () => {
    expect(buttonRecipe.base).toBeDefined();
    expect(buttonRecipe.base).not.toStrictEqual({});
  });

  it("should have correct color variants", () => {
    expect(buttonRecipe.variants?.color).toBeDefined();
    expect(Object.keys(buttonRecipe.variants?.color as object)).toStrictEqual([
      "ruby",
      "grass",
      "indigo",
      "orange",
      "gray",
    ]);
  });

  it("should have correct size variants", () => {
    expect(buttonRecipe.variants?.size).toBeDefined();
    expect(Object.keys(buttonRecipe.variants?.size as object)).toStrictEqual([
      "1",
      "2",
      "3",
    ]);
  });

  it("should have correct defaultVariants", () => {
    expect(buttonRecipe.defaultVariants).toBeDefined();
    expect(buttonRecipe?.defaultVariants).toMatchObject({
      "color": "gray",
      "fluid": false,
      "size": "2",
    });
  });

  it("should have correct jsx values", () => {
    expect(buttonRecipe.jsx).toEqual(["Button"]);
  });

  it("should have correct staticCss values", () => {
    expect(buttonRecipe.staticCss).toEqual([ "*" ]);
  });
});
