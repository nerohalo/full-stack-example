import { definePreset } from "@pandacss/dev";

import type { RadixColor } from "./types";

import { conditions } from "@/conditions";
import { globalCss } from "@/globalCss";
import { createTheme } from "@/theme";

/**
 * Options for the preset.
 */
export type PresetOptions = {
  useDarkMode: boolean,
  useP3: boolean,
  colorScales: Array<RadixColor>,
};

/**
 * Create a new preset using the provided options.
 *
 * @param options The preset options
 * @returns The preset
 */
export async function createPreset({
  useDarkMode = true,
  useP3 = true,
  colorScales = ["gray","orange", "red", "green", "blue", "blackA"],
}: PresetOptions) {
  const theme = createTheme({ useP3, useDarkMode, colorScales });

  return definePreset({
    name: "radix-preset",
    globalCss,

    conditions,
    theme,
  });
}
