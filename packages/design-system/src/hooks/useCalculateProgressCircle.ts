type ProgressCircleProps = {
  value?: number,
  circleStrokeWidth: number,
};

export const useCalculateProgressCircle = ({
  value,
  circleStrokeWidth,
}: ProgressCircleProps) => {
  const currentValue = value ?? 25;
  const clampedValue = Math.max(0, Math.min(currentValue, 100)); // Clamp between 0 and 100
  const clampedStrokeWidth = Math.max(circleStrokeWidth, 0); // Prevent negative stroke width

  const percentageValue = (100 - clampedValue) / 100;
  const viewBoxDimensions = 24;
  const viewBoxCenterAxis = viewBoxDimensions / 2;
  const circleRadius = viewBoxCenterAxis - (clampedStrokeWidth / 2);
  const circleCircumference = 2 * Math.PI * circleRadius;

  return {
    percentageValue,
    viewBoxDimensions,
    viewBoxCenterAxis,
    circleRadius: Math.max(circleRadius, 0), // Ensure positive radius
    circleCircumference,
  };
};
