import { describe, it, expect } from "vitest";

import { tableRecipe } from "@/theme/recipes/slots/tableRecipe";

describe("table slot recipe", () => {
  it("should be exported", () => {
    expect(tableRecipe).toBeDefined();
  });

  it("should have a className", () => {
    expect(tableRecipe.className).toBeDefined();
    expect(tableRecipe.className).toEqual("table");
  });

  it("should have correct slots", () => {
    expect(tableRecipe.className).toBeDefined();
    expect(tableRecipe.slots).toEqual([
      "root",
      "header",
      "headerRow",
      "headerColumn",
      "body",
      "row",
      "cell",
      "checkboxCell",
    ]);
  });

  it("should have a base style", () => {
    expect(tableRecipe.base).toBeDefined();
    expect(tableRecipe.base).not.toStrictEqual({});
  });

  it("should have a base slots styles", () => {
    expect(tableRecipe.base?.root).toBeDefined();
    expect(tableRecipe.base?.root).not.toStrictEqual({});

    expect(tableRecipe.base?.header).toBeDefined();
    expect(tableRecipe.base?.header).not.toStrictEqual({});

    expect(tableRecipe.base?.headerRow).toBeDefined();
    expect(tableRecipe.base?.headerRow).not.toStrictEqual({});

    expect(tableRecipe.base?.headerColumn).toBeDefined();
    expect(tableRecipe.base?.headerColumn).not.toStrictEqual({});

    expect(tableRecipe.base?.body).toBeDefined();
    expect(tableRecipe.base?.body).not.toStrictEqual({});

    expect(tableRecipe.base?.row).toBeDefined();
    expect(tableRecipe.base?.row).not.toStrictEqual({});

    expect(tableRecipe.base?.cell).toBeDefined();
    expect(tableRecipe.base?.cell).not.toStrictEqual({});

    expect(tableRecipe.base?.checkboxCell).toBeDefined();
    expect(tableRecipe.base?.checkboxCell).toStrictEqual({});
  });

  it("should have correct variants", () => {
    expect(tableRecipe.variants?.fluid).toBeDefined();
    expect(Object.keys(tableRecipe.variants?.fluid as object)).toStrictEqual([
      "true",
      "false",
    ]);

    expect(tableRecipe.variants?.verticalAlign).toBeDefined();
    expect(Object.keys(tableRecipe.variants?.verticalAlign as object)).toStrictEqual([
      "top",
      "middle",
      "bottom",
    ]);
  });

  it("should have correct defaultVariants", () => {
    expect(tableRecipe.defaultVariants).toBeDefined();
    expect(tableRecipe?.defaultVariants).toMatchObject({
      fluid: false,
      verticalAlign: "middle",
    });
  });

  it("should have correct jsx values", () => {
    expect(tableRecipe.jsx).toEqual(["Table"]);
  });
});
