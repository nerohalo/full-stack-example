import { describe, it, expect } from "vitest";

import * as recipes from "@/theme/recipes";

describe("root", () => {
  it("should export recipes and slotRecipes", () => {
    expect(recipes.recipes).toBeDefined();
    expect(recipes.recipes.badgeRecipe).toBeDefined();
    expect(recipes.recipes.buttonRecipe).toBeDefined();
    expect(recipes.recipes.textRecipe).toBeDefined();
    expect(recipes.recipes.iconButtonRecipe).toBeDefined();

    expect(recipes.slotRecipes).toBeDefined();
    expect(recipes.slotRecipes.selectRecipe).toBeDefined();
    expect(recipes.slotRecipes.tooltipRecipe).toBeDefined();
    expect(recipes.slotRecipes.popoverRecipe).toBeDefined();
    expect(recipes.slotRecipes.tableRecipe).toBeDefined();
    expect(recipes.slotRecipes.textFieldRecipe).toBeDefined();
  });
});
