import { SVGProps, useEffect, useState } from "react";

type FillProps = {
  circleStrokeWidth: number,
  percentageValue: number,
  viewBoxCenterAxis: number,
  circleCircumference: number,
  circleRadius: number,
} & SVGProps<SVGCircleElement>;

export const Fill = ({
  circleStrokeWidth,
  percentageValue,
  viewBoxCenterAxis,
  circleCircumference,
  circleRadius,
  className,
}: FillProps) => {
  const [offset, setOffset] = useState(percentageValue * circleCircumference);

  useEffect(() => {
    const progressOffset = percentageValue * circleCircumference;
    setOffset(progressOffset);
  }, [setOffset, circleCircumference, percentageValue, offset]);

  return (
    <circle
      role="presentation"
      className={className}
      strokeWidth={circleStrokeWidth}
      strokeDasharray={circleCircumference}
      cx={viewBoxCenterAxis}
      cy={viewBoxCenterAxis}
      r={circleRadius}
      strokeDashoffset={offset}
    />
  );
};
