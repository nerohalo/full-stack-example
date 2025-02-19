import { describe, expect, it } from "vitest";

import { iconButtonRecipe } from "@/theme/recipes/iconButtonRecipe";

describe("iconButton recipe", () => {
  it("should be exported", () => {
    expect(iconButtonRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(iconButtonRecipe.className).toBeDefined();
    expect(iconButtonRecipe.className).toEqual("iconButton");
  });

  it("should have a base style", () => {
    expect(iconButtonRecipe.base).toBeDefined();
    expect(iconButtonRecipe.base).not.toStrictEqual({});
  });

  it("should have correct color variants", () => {
    expect(iconButtonRecipe.variants?.color).toBeDefined();
    expect(Object.keys(iconButtonRecipe.variants?.color as object)).toStrictEqual([
      "ruby",
      "grass",
      "indigo",
      "orange",
      "gray",
    ]);
  });

  it("should have correct size variants", () => {
    expect(iconButtonRecipe.variants?.size).toBeDefined();
    expect(Object.keys(iconButtonRecipe.variants?.size as object)).toStrictEqual([
      "1",
      "2",
      "3",
    ]);
  });

  it("should have correct defaultVariants", () => {
    expect(iconButtonRecipe.defaultVariants).toBeDefined();
    expect(iconButtonRecipe?.defaultVariants).toMatchObject({
      "color": "gray",
      "size": "2",
    });
  });

  it("should have correct jsx values", () => {
    expect(iconButtonRecipe.jsx).toEqual(["IconButton"]);
  });
});
