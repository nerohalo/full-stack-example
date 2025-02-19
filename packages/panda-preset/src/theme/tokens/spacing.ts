import { defineTokens } from "@pandacss/dev";

export const themeGridUnits = {
  shared: 4,
};

const getPixelValue = (gridUnitValue: number, unit: number) => `${gridUnitValue * unit}px`;

export const spacing = defineTokens.spacing({
  0: { value: getPixelValue(themeGridUnits.shared, 0) },
  1: { value: getPixelValue(themeGridUnits.shared, 1) },
  2: { value: getPixelValue(themeGridUnits.shared, 2) },
  3: { value: getPixelValue(themeGridUnits.shared, 3) },
  4: { value: getPixelValue(themeGridUnits.shared, 4) },
  5: { value: getPixelValue(themeGridUnits.shared, 5) },
  6: { value: getPixelValue(themeGridUnits.shared, 6) },
  7: { value: getPixelValue(themeGridUnits.shared, 7) },
  8: { value: getPixelValue(themeGridUnits.shared, 8) },
  9: { value: getPixelValue(themeGridUnits.shared, 9) },
  10: { value: getPixelValue(themeGridUnits.shared, 10) },
  11: { value: getPixelValue(themeGridUnits.shared, 11) },
  12: { value: getPixelValue(themeGridUnits.shared, 12) },
  13: { value: getPixelValue(themeGridUnits.shared, 13) },
  14: { value: getPixelValue(themeGridUnits.shared, 14) },
  15: { value: getPixelValue(themeGridUnits.shared, 15) },
  16: { value: getPixelValue(themeGridUnits.shared, 16) },
});
