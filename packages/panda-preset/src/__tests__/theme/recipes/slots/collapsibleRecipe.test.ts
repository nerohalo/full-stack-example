import { describe, it, expect } from "vitest";

import { collapsibleRecipe } from "@/theme/recipes/slots/collapsibleRecipe";

describe("collapsible slot recipe", () => {
  it("should be exported", () => {
    expect(collapsibleRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(collapsibleRecipe.className).toBeDefined();
    expect(collapsibleRecipe.className).toEqual("collapsible");
  });

  it("should have correct slots", () => {
    expect(collapsibleRecipe.className).toBeDefined();
    expect(collapsibleRecipe.slots).toEqual([
      "panel",
      "trigger",
    ]);
  });

  it("should have a base style", () => {
    expect(collapsibleRecipe.base).toBeDefined();
    expect(collapsibleRecipe.base).not.toStrictEqual({});
  });

  it("should have a base slots styles", () => {
    expect(collapsibleRecipe.base?.panel).toBeDefined();
    expect(collapsibleRecipe.base?.panel).toStrictEqual({});

    expect(collapsibleRecipe.base?.trigger).toBeDefined();
    expect(collapsibleRecipe.base?.trigger).not.toStrictEqual({});
  });

  it("should have correct variants", () => {
    expect(collapsibleRecipe.variants?.expanded).toBeDefined();
    expect(Object.keys(collapsibleRecipe.variants?.expanded as object)).toStrictEqual([
      "true",
      "false",
    ]);
  });

  it("should have correct jsx values", () => {
    expect(collapsibleRecipe.jsx).toEqual(["Collapsible"]);
  });
});
