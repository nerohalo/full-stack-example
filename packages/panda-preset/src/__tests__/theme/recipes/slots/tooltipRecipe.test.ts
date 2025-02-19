import { describe, it, expect } from "vitest";

import { tooltipRecipe } from "@/theme/recipes/slots/tooltipRecipe";

describe("tooltip slot recipe", () => {
  it("should be exported", () => {
    expect(tooltipRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(tooltipRecipe.className).toBeDefined();
    expect(tooltipRecipe.className).toEqual("tooltip");
  });

  it("should have correct slots", () => {
    expect(tooltipRecipe.className).toBeDefined();
    expect(tooltipRecipe.slots).toEqual([
      "trigger",
      "layer",
      "arrow",
    ]);
  });

  it("should have a base style", () => {
    expect(tooltipRecipe.base).toBeDefined();
    expect(tooltipRecipe.base).not.toStrictEqual({});
  });

  it("should have a base slots styles", () => {
    expect(tooltipRecipe.base?.trigger).toBeDefined();
    expect(tooltipRecipe.base?.trigger).not.toStrictEqual({});

    expect(tooltipRecipe.base?.layer).toBeDefined();
    expect(tooltipRecipe.base?.layer).not.toStrictEqual({});

    expect(tooltipRecipe.base?.arrow).toBeDefined();
    expect(tooltipRecipe.base?.arrow).not.toStrictEqual({});
  });

  it("should have correct jsx values", () => {
    expect(tooltipRecipe.jsx).toEqual(["Tooltip"]);
  });
});
