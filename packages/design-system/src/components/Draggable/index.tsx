import { motion, useMotionValue, useTransform, HTMLMotionProps } from "framer-motion";
import { Fragment, type ReactNode, useRef } from "react";

import { useResizeObserver } from "../../hooks";

export type DraggableProps = {
  children?: ReactNode,
  draggable?: boolean,
  dragDirection?: "x" | "y",
  draggablePercent?: number,
  onDragEscape?: () => void,
} & HTMLMotionProps<"div">;

export const Draggable = ({
  children,
  draggable = true,
  dragDirection = "x",
  draggablePercent = 100,
  onDragEnd,
  onDragEscape,
  ...rest
}: DraggableProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const { width, height } = useResizeObserver({ ref: componentRef });

  const componentOffsetWidth = (width * 2) * (draggablePercent / 100);
  const componentOffsetHeight = (height * 2) * (draggablePercent / 100);

  const input = dragDirection === "x"
    ? [-componentOffsetWidth, 0, componentOffsetWidth]
    : [-componentOffsetHeight, 0, componentOffsetHeight];
  const transformAxis = dragDirection === "x" ? x : y;
  const opacity = useTransform(transformAxis, input, ["0", "1", "0"]);

  const handleDragEnd = (event: any, info: any) => {
    const { offset } = info;

    if (onDragEscape) {
      const isOutOfBoundsX = offset.x > componentOffsetWidth || offset.x < -componentOffsetWidth;
      const isOutOfBoundsY = offset.y > componentOffsetHeight || offset.y < -componentOffsetHeight;

      if (isOutOfBoundsX || isOutOfBoundsY) {
        onDragEscape();
      }
    }

    if (onDragEnd) {
      onDragEnd(event, info);
    }
  };

  return draggable
    ? (
      <motion.div
        {...rest}
        ref={componentRef}
        drag={dragDirection}
        dragConstraints={{ left: 0, right: 0 }}
        whileTap={{ scale: 0.95 }}
        dragElastic={1}
        dragMomentum={false}
        dragSnapToOrigin
        tabIndex={-1}
        style={{ x, y, opacity }}
        onDragEnd={handleDragEnd}
      >
        {children}
      </motion.div>
    )
    : (
      <Fragment>{children}</Fragment>
    );
};
