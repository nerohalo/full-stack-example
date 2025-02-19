import { Config } from "@pandacss/dev";

import { generateSemanticTokens } from "@/helpers/generateSemanticTokens";
import type { PresetOptions } from "@/preset";
import { breakpoints } from "@/theme/breakpoints.ts";
import { keyframes } from "@/theme/keyframes.ts";
import { recipes, slotRecipes } from "@/theme/recipes";
import { fontSizes } from "@/theme/tokens/fontSizes.ts";
import { fontWeights } from "@/theme/tokens/fontWeights.ts";
import { letterSpacings } from "@/theme/tokens/letterSpacings.ts";
import { lineHeights } from "@/theme/tokens/lineHeights.ts";
import { radii } from "@/theme/tokens/radii.ts";
import { shadows } from "@/theme/tokens/shadows.ts";
import { spacing } from "@/theme/tokens/spacing.ts";
import { zIndex } from "@/theme/tokens/zIndex.ts";

/**
 * This module contains the Cerberus theme and configuration options.
 * @module
 */

export const createTheme = ({
  useP3,
  useDarkMode,
  colorScales,
}: PresetOptions): Config["theme"] => ({
  extend: {
    semanticTokens: {
      colors: generateSemanticTokens(useDarkMode, useP3, colorScales),
    },
    breakpoints,
    recipes,
    slotRecipes,
    tokens: {
      spacing,
      sizes: spacing,
      radii,
      fontWeights,
      fontSizes,
      lineHeights,
      letterSpacings,
      zIndex,
      shadows,
    },
    keyframes,
  },
});
