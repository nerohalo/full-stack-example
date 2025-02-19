import { describe, it, expect } from "vitest";

import * as theme from "@/theme";

describe("root", () => {
  it("should export a createTheme method", () => {
    expect(theme.createTheme).toBeDefined();
  });

  it("should return correct structure when createTheme is called", () => {
    const createdTheme = theme.createTheme({
      useDarkMode: false,
      useP3: false,
      colorScales: ["gray", "ruby", "blackA"],
    });

    expect(createdTheme).toHaveProperty("extend");
    expect(createdTheme?.extend).toHaveProperty("semanticTokens");
    expect(createdTheme?.extend?.semanticTokens).toHaveProperty("colors");
    expect(createdTheme?.extend?.semanticTokens?.colors).toHaveProperty("gray");
    expect(createdTheme?.extend?.semanticTokens?.colors).toHaveProperty("ruby");
    expect(createdTheme?.extend?.semanticTokens?.colors).toHaveProperty("black");

    expect(createdTheme?.extend).toHaveProperty("breakpoints");
    expect(createdTheme?.extend).toHaveProperty("recipes");
    expect(createdTheme?.extend).toHaveProperty("slotRecipes");
    expect(createdTheme?.extend).toHaveProperty("keyframes");
    expect(createdTheme?.extend).toHaveProperty("tokens");
    expect(createdTheme?.extend?.tokens).toHaveProperty("spacing");
    expect(createdTheme?.extend?.tokens).toHaveProperty("sizes");
    expect(createdTheme?.extend?.tokens).toHaveProperty("radii");
    expect(createdTheme?.extend?.tokens).toHaveProperty("fontWeights");
    expect(createdTheme?.extend?.tokens).toHaveProperty("fontSizes");
    expect(createdTheme?.extend?.tokens).toHaveProperty("lineHeights");
    expect(createdTheme?.extend?.tokens).toHaveProperty("letterSpacings");
    expect(createdTheme?.extend?.tokens).toHaveProperty("zIndex");
    expect(createdTheme?.extend?.tokens).toHaveProperty("shadows");
  });
});
