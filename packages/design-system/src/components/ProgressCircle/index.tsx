import {
  progressCircleRecipe,
  ProgressCircleRecipeVariantProps,
} from "@css/styled-system/recipes";
import { forwardRef } from "react";

import { useCalculateProgressCircle } from "../../hooks";

import { Fill } from "./Fill";
import { Track } from "./Track";

type Props = {
  circleStrokeWidth?: number,
  value?: number,
} & ProgressCircleRecipeVariantProps;

export type ProgressCircleProps = Omit<Props, "isIndeterminate">;

export const ProgressCircle = forwardRef<SVGSVGElement, ProgressCircleProps>(({
  size,
  value,
  color,
  circleStrokeWidth = 3,
  ...rest
}, ref) => {
  const {
    viewBoxDimensions,
    viewBoxCenterAxis,
    circleCircumference,
    circleRadius,
    percentageValue,
  } = useCalculateProgressCircle({ value, circleStrokeWidth });

  const progressCircleStyles = progressCircleRecipe({ color, size, isIndeterminate: !!value });

  return (
    <svg
      {...rest}
      viewBox={`0 0 ${viewBoxDimensions} ${viewBoxDimensions}`}
      focusable="false"
      aria-hidden="true"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      {...value && { ["aria-valuenow"]: value }}
      className={progressCircleStyles.root}
      ref={ref}
    >
      <Fill
        circleStrokeWidth={circleStrokeWidth}
        viewBoxCenterAxis={viewBoxCenterAxis}
        circleCircumference={circleCircumference}
        percentageValue={percentageValue}
        circleRadius={circleRadius}
        className={progressCircleStyles.fill}
      />
      <Track
        circleStrokeWidth={circleStrokeWidth}
        viewBoxCenterAxis={viewBoxCenterAxis}
        circleCircumference={circleCircumference}
        circleRadius={circleRadius}
        className={progressCircleStyles.track}
      />
    </svg>
  );
});
