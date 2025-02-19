import * as colors from "@radix-ui/colors";

import type { ColorScale, RadixColor } from "@/types";

export function generateSemanticTokens(
  useDarkMode: boolean,
  useP3: boolean,
  selectedColors: Array<RadixColor>
) {
  const colorMap: Record<string, any> = {};

  selectedColors.forEach((colorName) => {
    // Special handling for whiteA and blackA
    if (colorName === "whiteA" || colorName === "blackA") {
      const baseColor = colorName.slice(0, -1); // 'white' or 'black'
      const baseScale = colors[colorName] as ColorScale;
      const p3Scale = colors[`${baseColor}P3A` as keyof typeof colors] as ColorScale;

      colorMap[baseColor] = {
        a: {},
        ...(useP3 && { p3: { a: {} } }),
      };

      for (let i = 1; i <= 12; i++) {
        const num = i.toString();

        // Top-level alpha values
        colorMap[baseColor].a[num] = {
          value: {
            base: baseScale[`${colorName}${num}`],
          },
        };

        if (useP3) {
          colorMap[baseColor].a[num].value._p3 = `{colors.${baseColor}.p3.a.${num}}`;

          // Top-level P3 alpha values
          colorMap[baseColor].p3.a[num] = {
            value: p3Scale[`${colorName}${num}`],
          };
        }
      }

      return;
    }

    const baseScale = colors[colorName] as ColorScale;
    const colorScaleA = colors[`${colorName}A`] as ColorScale;
    const colorScaleP3 = colors[`${colorName}P3`] as ColorScale;
    const colorScaleP3A = colors[`${colorName}P3A`] as ColorScale;
    const darkColorScale = colors[`${colorName}Dark`] as ColorScale;
    const darkColorScaleA = colors[`${colorName}DarkA`] as ColorScale;
    const darkColorScaleP3 = colors[`${colorName}DarkP3`] as ColorScale;
    const darkColorScaleP3A = colors[`${colorName}DarkP3A`] as ColorScale;

    colorMap[colorName] = {
      light: {},
      ...(useDarkMode && { dark: {} }),
      a: {},
      ...(useP3 && { p3: {} }),
    };

    for (let i = 1; i <= 12; i++) {
      const num = i.toString();

      // Main color references
      colorMap[colorName][num] = {
        value: {
          base: `{colors.${colorName}.light.${num}}`,
        },
      };

      if (useDarkMode) {
        colorMap[colorName][num].value._dark = `{colors.${colorName}.dark.${num}}`;
      }

      // Light mode values
      colorMap[colorName].light[num] = {
        value: {
          base: baseScale[`${colorName}${num}`],
        },
      };

      if (useP3) {
        colorMap[colorName].light[num].value._p3 = `{colors.${colorName}.light.p3.${num}}`;
      }

      // Dark mode values
      if (useDarkMode) {
        colorMap[colorName].dark[num] = {
          value: {
            base: darkColorScale[`${colorName}${num}`],
          },
        };

        if (useP3) {
          colorMap[colorName].dark[num].value._p3 = `{colors.${colorName}.dark.p3.${num}}`;
        }
      }

      // Alpha values
      colorMap[colorName].light.a = colorMap[colorName].light.a || {};
      colorMap[colorName].light.a[num] = {
        value: {
          base: colorScaleA[`${colorName}A${num}`],
        },
      };

      if (useP3) {
        colorMap[colorName].light.a[num].value._p3 = `{colors.${colorName}.light.p3.a.${num}}`;
      }

      // Dark alpha values
      if (useDarkMode) {
        colorMap[colorName].dark.a = colorMap[colorName].dark.a || {};
        colorMap[colorName].dark.a[num] = {
          value: {
            base: darkColorScaleA[`${colorName}A${num}`],
          },
        };

        if (useP3) {
          colorMap[colorName].dark.a[num].value._p3 = `{colors.${colorName}.dark.p3.a.${num}}`;
        }
      }

      // P3 values
      if (useP3) {
        colorMap[colorName].light.p3 = colorMap[colorName].light.p3 || {};
        colorMap[colorName].light.p3[num] = {
          value: colorScaleP3[`${colorName}${num}`],
        };

        colorMap[colorName].light.p3.a = colorMap[colorName].light.p3.a || {};
        colorMap[colorName].light.p3.a[num] = {
          value: colorScaleP3A[`${colorName}A${num}`],
        };

        if (useDarkMode) {
          colorMap[colorName].dark.p3 = colorMap[colorName].dark.p3 || {};
          colorMap[colorName].dark.p3[num] = {
            value: darkColorScaleP3[`${colorName}${num}`],
          };

          colorMap[colorName].dark.p3.a = colorMap[colorName].dark.p3.a || {};
          colorMap[colorName].dark.p3.a[num] = {
            value: darkColorScaleP3A[`${colorName}A${num}`],
          };
        }
      }

      // Top-level alpha values
      colorMap[colorName].a[num] = {
        value: {
          base: `{colors.${colorName}.light.a.${num}}`,
        },
      };
      if (useDarkMode) {
        colorMap[colorName].a[num].value._dark = `{colors.${colorName}.dark.a.${num}}`;
      }

      // Top-level p3 values
      if (useP3) {
        colorMap[colorName].p3[num] = {
          value: {
            base: `{colors.${colorName}.light.p3.${num}}`,
          },
        };
        if (useDarkMode) {
          colorMap[colorName].p3[num].value._dark = `{colors.${colorName}.dark.p3.${num}}`;
        }

        // Top-level p3.a values
        colorMap[colorName].p3.a = colorMap[colorName].p3.a || {};
        colorMap[colorName].p3.a[num] = {
          value: {
            base: `{colors.${colorName}.light.p3.a.${num}}`,
          },
        };
        if (useDarkMode) {
          colorMap[colorName].p3.a[num].value._dark = `{colors.${colorName}.dark.p3.a.${num}}`;
        }
      }
    }
  });

  return colorMap;
}
