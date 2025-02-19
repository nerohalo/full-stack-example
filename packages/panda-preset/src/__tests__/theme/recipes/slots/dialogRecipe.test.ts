import { describe, it, expect } from "vitest";

import { dialogRecipe } from "@/theme/recipes/slots/dialogRecipe";

describe("dialog slot recipe", () => {
  it("should be exported", () => {
    expect(dialogRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(dialogRecipe.className).toBeDefined();
    expect(dialogRecipe.className).toEqual("dialog");
  });

  it("should have correct slots", () => {
    expect(dialogRecipe.className).toBeDefined();
    expect(dialogRecipe.slots).toEqual([
      "underlay",
      "root",
      "title",
      "description",
      "content",
    ]);
  });

  it("should have a base style", () => {
    expect(dialogRecipe.base).toBeDefined();
    expect(dialogRecipe.base).not.toStrictEqual({});
  });

  it("should have a base slots styles", () => {
    expect(dialogRecipe.base?.underlay).toBeDefined();
    expect(dialogRecipe.base?.underlay).not.toStrictEqual({});

    expect(dialogRecipe.base?.root).toBeDefined();
    expect(dialogRecipe.base?.root).not.toStrictEqual({});

    expect(dialogRecipe.base?.title).toBeDefined();
    expect(dialogRecipe.base?.title).not.toStrictEqual({});

    expect(dialogRecipe.base?.description).toBeDefined();
    expect(dialogRecipe.base?.description).not.toStrictEqual({});

    expect(dialogRecipe.base?.content).toBeDefined();
    expect(dialogRecipe.base?.content).toStrictEqual({});
  });

  it("should have correct jsx values", () => {
    expect(dialogRecipe.jsx).toEqual(["Dialog"]);
  });
});
