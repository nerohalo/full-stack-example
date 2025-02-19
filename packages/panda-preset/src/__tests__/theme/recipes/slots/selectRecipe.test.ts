import { describe, it, expect } from "vitest";

import { selectRecipe } from "@/theme/recipes/slots/selectRecipe";

describe("select slot recipe", () => {
  it("should be exported", () => {
    expect(selectRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(selectRecipe.className).toBeDefined();
    expect(selectRecipe.className).toEqual("select");
  });

  it("should have correct slots", () => {
    expect(selectRecipe.className).toBeDefined();
    expect(selectRecipe.slots).toEqual([
      "root",
      "label",
      "control",
      "value",
      "placeholder",
      "valueIndicator",
      "listBox",
      "option",
    ]);
  });

  it("should have a base style", () => {
    expect(selectRecipe.base).toBeDefined();
    expect(selectRecipe.base).not.toStrictEqual({});
  });

  it("should have a base slots styles", () => {
    expect(selectRecipe.base?.root).toBeDefined();
    expect(selectRecipe.base?.root).not.toStrictEqual({});

    expect(selectRecipe.base?.label).toBeDefined();
    expect(selectRecipe.base?.label).not.toStrictEqual({});

    expect(selectRecipe.base?.control).toBeDefined();
    expect(selectRecipe.base?.control).not.toStrictEqual({});

    expect(selectRecipe.base?.value).toBeDefined();
    expect(selectRecipe.base?.value).toStrictEqual({});

    expect(selectRecipe.base?.placeholder).toBeDefined();
    expect(selectRecipe.base?.placeholder).not.toStrictEqual({});

    expect(selectRecipe.base?.valueIndicator).toBeDefined();
    expect(selectRecipe.base?.valueIndicator).toStrictEqual({});

    expect(selectRecipe.base?.listBox).toBeDefined();
    expect(selectRecipe.base?.listBox).not.toStrictEqual({});

    expect(selectRecipe.base?.option).toBeDefined();
    expect(selectRecipe.base?.option).not.toStrictEqual({});
  });

  it("should have correct variants", () => {
    expect(selectRecipe.variants?.fluid).toBeDefined();
    expect(Object.keys(selectRecipe.variants?.fluid as object)).toStrictEqual([
      "true",
      "false",
    ]);

    expect(selectRecipe.variants?.color).toBeDefined();
    expect(Object.keys(selectRecipe.variants?.color as object)).toStrictEqual([
      "ruby",
      "grass",
      "orange",
      "gray",
    ]);
  });

  it("should have correct defaultVariants", () => {
    expect(selectRecipe.defaultVariants).toBeDefined();
    expect(selectRecipe?.defaultVariants).toMatchObject({
      fluid: false,
      color: "gray",
    });
  });

  it("should have correct jsx values", () => {
    expect(selectRecipe.jsx).toEqual(["Select"]);
  });

  it("should have correct staticCss values", () => {
    expect(selectRecipe.staticCss).toEqual([ { color: [ "*" ] } ]);
  });
});
