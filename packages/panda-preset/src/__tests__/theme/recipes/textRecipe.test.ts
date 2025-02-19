import { describe, expect, it } from "vitest";

import { textRecipe } from "@/theme/recipes/textRecipe";

describe("text recipe", () => {
  it("should be exported", () => {
    expect(textRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(textRecipe.className).toBeDefined();
    expect(textRecipe.className).toEqual("text");
  });

  it("should have a base style", () => {
    expect(textRecipe.base).toBeDefined();
    expect(textRecipe.base).not.toStrictEqual({});
  });

  it("should have correct color variants", () => {
    expect(textRecipe.variants?.color).toBeDefined();
    expect(Object.keys(textRecipe.variants?.color as object)).toStrictEqual([
      "indigo",
      "ruby",
      "grass",
      "orange",
      "gray",
      "inherit",
    ]);
  });

  it("should have correct size variants", () => {
    expect(textRecipe.variants?.size).toBeDefined();
    expect(Object.keys(textRecipe.variants?.size as object)).toStrictEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ]);
  });

  it("should have correct defaultVariants", () => {
    expect(textRecipe.defaultVariants).toBeDefined();
    expect(textRecipe?.defaultVariants).toMatchObject({
      "color": "inherit",
      "size": 3,
    });
  });

  it("should have correct jsx values", () => {
    expect(textRecipe.jsx).toEqual(["Text"]);
  });
});
