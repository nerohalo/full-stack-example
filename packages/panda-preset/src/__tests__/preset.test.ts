import { describe, it, expect, vi } from "vitest";

import * as preset from "@/preset.ts";
import { PresetOptions } from "@/preset.ts";
import * as theme from "@/theme";

describe("preset", () => {
  it("should export a createPreset method", () => {
    expect(preset.createPreset).toBeDefined();
  });

  it("should call createTheme internally when calling createPreset", async() => {
    const createThemeSpy = vi.spyOn(theme, "createTheme");

    const presetOptions: PresetOptions = { useDarkMode: true, useP3: true, colorScales: ["gray"] };
    await preset.createPreset(presetOptions);

    expect(createThemeSpy).toHaveBeenCalledWith(presetOptions);
  });

  it("should return correct structure when calling createPreset", async() => {
    const presetOptions: PresetOptions = { useDarkMode: true, useP3: true, colorScales: ["gray"] };
    const createdPreset = await preset.createPreset(presetOptions);

    expect(
      Object.keys(createdPreset)
    ).toStrictEqual([
      "name",
      "globalCss",
      "conditions",
      "theme",
    ]);

    expect(createdPreset.name).toEqual("radix-preset");
  });
});
