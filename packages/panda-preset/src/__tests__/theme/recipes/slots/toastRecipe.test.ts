import { describe, it, expect } from "vitest";

import { toastRecipe } from "@/theme/recipes/slots/toastRecipe";

describe("toast slot recipe", () => {
  it("should be exported", () => {
    expect(toastRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(toastRecipe.className).toBeDefined();
    expect(toastRecipe.className).toEqual("toast");
  });

  it("should have correct slots", () => {
    expect(toastRecipe.className).toBeDefined();
    expect(toastRecipe.slots).toEqual([
      "root",
      "closeButton",
      "progressBar",
    ]);
  });

  it("should have a base style", () => {
    expect(toastRecipe.base).toBeDefined();
    expect(toastRecipe.base).not.toStrictEqual({});
  });

  it("should have a base slots styles", () => {
    expect(toastRecipe.base?.root).toBeDefined();
    expect(toastRecipe.base?.root).not.toStrictEqual({});

    expect(toastRecipe.base?.closeButton).toBeDefined();
    expect(toastRecipe.base?.closeButton).not.toStrictEqual({});

    expect(toastRecipe.base?.progressBar).toBeDefined();
    expect(toastRecipe.base?.progressBar).not.toStrictEqual({});
  });

  it("should have correct variants", () => {
    expect(toastRecipe.variants?.color).toBeDefined();
    expect(Object.keys(toastRecipe.variants?.color as object)).toStrictEqual([
      "ruby",
      "indigo",
      "grass",
      "orange",
    ]);
  });

  it("should have correct defaultVariants", () => {
    expect(toastRecipe.defaultVariants).toBeDefined();
    expect(toastRecipe?.defaultVariants).toMatchObject({
      color: "grass",
    });
  });

  it("should have correct jsx values", () => {
    expect(toastRecipe.jsx).toEqual(["Toast"]);
  });

  it("should have correct staticCss values", () => {
    expect(toastRecipe.staticCss).toEqual([ { color: [ "*" ] } ]);
  });
});
