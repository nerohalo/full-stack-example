import { describe, it, expect } from "vitest";

import { popoverRecipe } from "@/theme/recipes/slots/popoverRecipe";

describe("popover slot recipe", () => {
  it("should be exported", () => {
    expect(popoverRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(popoverRecipe.className).toBeDefined();
    expect(popoverRecipe.className).toEqual("popover");
  });

  it("should have correct slots", () => {
    expect(popoverRecipe.className).toBeDefined();
    expect(popoverRecipe.slots).toEqual([
      "trigger",
      "layer",
      "arrow",
    ]);
  });

  it("should have a base style", () => {
    expect(popoverRecipe.base).toBeDefined();
    expect(popoverRecipe.base).not.toStrictEqual({});
  });

  it("should have a base slots styles", () => {
    expect(popoverRecipe.base?.trigger).toBeDefined();
    expect(popoverRecipe.base?.trigger).not.toStrictEqual({});

    expect(popoverRecipe.base?.layer).toBeDefined();
    expect(popoverRecipe.base?.layer).not.toStrictEqual({});

    expect(popoverRecipe.base?.arrow).toBeDefined();
    expect(popoverRecipe.base?.arrow).not.toStrictEqual({});
  });

  it("should have correct jsx values", () => {
    expect(popoverRecipe.jsx).toEqual(["Popover"]);
  });
});
