import { describe, it, expect } from "vitest";

import { textFieldRecipe } from "@/theme/recipes/slots/textFieldRecipe";

describe("textField slot recipe", () => {
  it("should be exported", () => {
    expect(textFieldRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(textFieldRecipe.className).toBeDefined();
    expect(textFieldRecipe.className).toEqual("textField");
  });

  it("should have correct slots", () => {
    expect(textFieldRecipe.className).toBeDefined();
    expect(textFieldRecipe.slots).toEqual([
      "root",
      "control",
      "input",
      "label",
    ]);
  });

  it("should have a base style", () => {
    expect(textFieldRecipe.base).toBeDefined();
    expect(textFieldRecipe.base).not.toStrictEqual({});
  });

  it("should have a base slots styles", () => {
    expect(textFieldRecipe.base?.root).toBeDefined();
    expect(textFieldRecipe.base?.root).not.toStrictEqual({});

    expect(textFieldRecipe.base?.control).toBeDefined();
    expect(textFieldRecipe.base?.control).not.toStrictEqual({});

    expect(textFieldRecipe.base?.control).toBeDefined();
    expect(textFieldRecipe.base?.control).not.toStrictEqual({});

    expect(textFieldRecipe.base?.input).toBeDefined();
    expect(textFieldRecipe.base?.input).not.toStrictEqual({});

    expect(textFieldRecipe.base?.label).toBeDefined();
    expect(textFieldRecipe.base?.label).not.toStrictEqual({});
  });

  it("should have correct variants", () => {
    expect(textFieldRecipe.variants?.fluid).toBeDefined();
    expect(Object.keys(textFieldRecipe.variants?.fluid as object)).toStrictEqual([
      "true",
      "false",
    ]);

    expect(textFieldRecipe.variants?.color).toBeDefined();
    expect(Object.keys(textFieldRecipe.variants?.color as object)).toStrictEqual([
      "ruby",
      "grass",
      "orange",
      "gray",
    ]);
  });

  it("should have correct defaultVariants", () => {
    expect(textFieldRecipe.defaultVariants).toBeDefined();
    expect(textFieldRecipe?.defaultVariants).toMatchObject({
      fluid: false,
      color: "gray",
    });
  });

  it("should have correct jsx values", () => {
    expect(textFieldRecipe.jsx).toEqual(["TextField"]);
  });

  it("should have correct staticCss values", () => {
    expect(textFieldRecipe.staticCss).toEqual([ { color: [ "*" ] } ]);
  });
});
