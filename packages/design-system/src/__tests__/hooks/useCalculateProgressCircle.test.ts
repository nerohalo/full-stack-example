import { describe, it, expect } from "vitest";

import { useCalculateProgressCircle } from "../../hooks";

describe("useCalculateProgressCircle", () => {
  it("should calculate correct values for provided value and stroke width", () => {
    const {
      percentageValue,
      viewBoxDimensions,
      viewBoxCenterAxis,
      circleRadius,
      circleCircumference,
    } = useCalculateProgressCircle({ value: 50, circleStrokeWidth: 4 });

    // Expected calculations
    const expectedPercentageValue = (100 - 50) / 100; // 0.5
    const expectedViewBoxDimensions = 24;
    const expectedViewBoxCenterAxis = 12; // 24 / 2
    const expectedCircleRadius = 12 - (4 / 2); // centerAxis - (strokeWidth / 2)
    const expectedCircleCircumference = 2 * Math.PI * expectedCircleRadius; // 2πr

    expect(percentageValue).toBeCloseTo(expectedPercentageValue); // 0.5
    expect(viewBoxDimensions).toBe(expectedViewBoxDimensions); // 24
    expect(viewBoxCenterAxis).toBe(expectedViewBoxCenterAxis); // 12
    expect(circleRadius).toBeCloseTo(expectedCircleRadius); // 10
    expect(circleCircumference).toBeCloseTo(expectedCircleCircumference); // ~62.8319
  });

  it("should calculate correct values when value is not provided (default)", () => {
    const {
      percentageValue,
      circleRadius,
      circleCircumference,
    } = useCalculateProgressCircle({ circleStrokeWidth: 3 });

    // Default value is 25 (based on hook code)
    const expectedPercentageValue = (100 - 25) / 100; // 0.75
    const expectedCircleRadius = 12 - (3 / 2); // centerAxis - (strokeWidth / 2)
    const expectedCircleCircumference = 2 * Math.PI * expectedCircleRadius; // 2πr

    expect(percentageValue).toBeCloseTo(expectedPercentageValue); // 0.75
    expect(circleRadius).toBeCloseTo(expectedCircleRadius); // 10.5
    expect(circleCircumference).toBeCloseTo(expectedCircleCircumference); // ~65.9734
  });

  it("should handle minimal stroke width and maximum value (edge case)", () => {
    const {
      percentageValue,
      circleRadius,
      circleCircumference,
    } = useCalculateProgressCircle({ value: 100, circleStrokeWidth: 1 });

    // Expected calculations for edge case
    const expectedPercentageValue = (100 - 100) / 100; // 0
    const expectedCircleRadius = 12 - (1 / 2); // 11.5
    const expectedCircleCircumference = 2 * Math.PI * expectedCircleRadius; // 2πr

    expect(percentageValue).toBeCloseTo(expectedPercentageValue); // 0
    expect(circleRadius).toBeCloseTo(expectedCircleRadius); // 11.5
    expect(circleCircumference).toBeCloseTo(expectedCircleCircumference); // ~72.2566
  });

  it("should handle very large stroke width (edge case)", () => {
    const {
      circleRadius,
      circleCircumference,
    } = useCalculateProgressCircle({ value: 75, circleStrokeWidth: 20 });

    // Check calculations for large stroke width
    const expectedCircleRadius = 12 - (20 / 2); // centerAxis - (strokeWidth / 2)
    const expectedCircleCircumference = 2 * Math.PI * Math.max(expectedCircleRadius, 0); // Ensure non-negative radius

    expect(circleRadius).toBeCloseTo(expectedCircleRadius); // 2 (or a valid positive value)
    expect(circleCircumference).toBeCloseTo(expectedCircleCircumference); // Result depends on adjusted radius
  });

  it("should ensure valid output even for invalid values", () => {
    const { percentageValue, circleRadius } = useCalculateProgressCircle({
      value: -100, // Invalid negative value for progress
      circleStrokeWidth: -1, // Invalid negative stroke width
    });

    // `value` clamped to 0, `circleStrokeWidth` clamped to 0
    const expectedPercentageValue = (100 - Math.max(-100, 0)) / 100; // 1.0
    const expectedCircleRadius = 12 - (0 / 2); // 12 - (clamped stroke width / 2)

    // Assertions
    expect(percentageValue).toBeCloseTo(expectedPercentageValue); // 1.0
    expect(circleRadius).toBeCloseTo(expectedCircleRadius); // 12
  });
});
