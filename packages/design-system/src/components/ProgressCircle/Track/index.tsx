import { SVGProps } from "react";

type TrackProps = {
  viewBoxCenterAxis: number,
  circleCircumference: number,
  circleRadius: number,
  circleStrokeWidth: number,
} & SVGProps<SVGCircleElement>;

export const Track = ({
  viewBoxCenterAxis,
  circleCircumference,
  circleRadius,
  circleStrokeWidth,
  className,
}: TrackProps) => (
  <circle
    role="presentation"
    strokeWidth={circleStrokeWidth}
    strokeDasharray={circleCircumference}
    cx={viewBoxCenterAxis}
    cy={viewBoxCenterAxis}
    r={circleRadius}
    className={className}
  />
);
