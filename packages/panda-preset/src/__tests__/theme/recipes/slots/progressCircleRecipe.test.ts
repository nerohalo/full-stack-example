import { describe, it, expect } from "vitest";

import { progressCircleRecipe } from "@/theme/recipes/slots/progressCircleRecipe";

describe("progress circle slot recipe", () => {
  it("should be exported", () => {
    expect(progressCircleRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(progressCircleRecipe.className).toBeDefined();
    expect(progressCircleRecipe.className).toEqual("progressCircle");
  });

  it("should have correct slots", () => {
    expect(progressCircleRecipe.className).toBeDefined();
    expect(progressCircleRecipe.slots).toEqual([
      "root",
      "track",
      "fill",
    ]);
  });

  it("should have a base style", () => {
    expect(progressCircleRecipe.base).toBeDefined();
    expect(progressCircleRecipe.base).not.toStrictEqual({});
  });

  it("should have a base slots styles", () => {
    expect(progressCircleRecipe.base?.root).toBeDefined();
    expect(progressCircleRecipe.base?.root).not.toStrictEqual({});

    expect(progressCircleRecipe.base?.track).toBeDefined();
    expect(progressCircleRecipe.base?.track).not.toStrictEqual({});

    expect(progressCircleRecipe.base?.fill).toBeDefined();
    expect(progressCircleRecipe.base?.fill).not.toStrictEqual({});
  });

  it("should have correct variants", () => {
    expect(progressCircleRecipe.variants?.color).toBeDefined();
    expect(Object.keys(progressCircleRecipe.variants?.color as object)).toStrictEqual([
      "ruby",
      "indigo",
      "grass",
      "orange",
      "gray",
    ]);

    expect(progressCircleRecipe.variants?.size).toBeDefined();
    expect(Object.keys(progressCircleRecipe.variants?.size as object)).toStrictEqual([
      "1",
      "2",
      "3",
    ]);

    expect(progressCircleRecipe.variants?.isIndeterminate).toBeDefined();
    expect(Object.keys(progressCircleRecipe.variants?.isIndeterminate as object)).toStrictEqual([
      "true",
    ]);
  });

  it("should have correct defaultVariants", () => {
    expect(progressCircleRecipe.defaultVariants).toBeDefined();
    expect(progressCircleRecipe?.defaultVariants).toMatchObject({
      "color": "gray",
      "isIndeterminate": true,
      "size": "2",
    });
  });

  it("should have correct jsx values", () => {
    expect(progressCircleRecipe.jsx).toEqual(["ProgressCircle"]);
  });

  it("should have correct staticCss values", () => {
    expect(progressCircleRecipe.staticCss).toEqual(["*"]);
  });
});
