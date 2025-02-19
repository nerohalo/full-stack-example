import type { AutoPlacementOptions, HideOptions, ShiftOptions } from "@floating-ui/core";
import type { MiddlewareState } from "@floating-ui/dom";
import {
  arrow,
  type ArrowOptions,
  autoPlacement,
  autoUpdate,
  type DetectOverflowOptions,
  flip,
  type FlipOptions,
  hide,
  offset,
  type Placement,
  shift,
  size,
  type SizeOptions,
  useFloating,
  type UseFloatingOptions,
} from "@floating-ui/react";
import { useMemo } from "react";

type OffsetValue = number | {
  mainAxis?: number,
  crossAxis?: number,
  alignmentAxis?: number | null,
};

export type FloatingConfig = Partial<Omit<UseFloatingOptions, "placement">> & {
  offset?: OffsetValue | ((state: MiddlewareState) => OffsetValue),
  flip?: Partial<FlipOptions & DetectOverflowOptions> |
    ((state: MiddlewareState) => Partial<FlipOptions & DetectOverflowOptions>),
  hide?: Partial<HideOptions & DetectOverflowOptions> |
    ((state: MiddlewareState) => Partial<HideOptions & DetectOverflowOptions>),
  shift?: Partial<ShiftOptions & DetectOverflowOptions> |
    ((state: MiddlewareState) => Partial<ShiftOptions & DetectOverflowOptions>),
  size?: Partial<SizeOptions & DetectOverflowOptions> |
    ((state: MiddlewareState) => Partial<SizeOptions & DetectOverflowOptions>),
  arrow?: ArrowOptions | ((state: MiddlewareState) => ArrowOptions),
  autoPlacement?: Partial<AutoPlacementOptions & DetectOverflowOptions>,
  placement?: Placement | "auto",
};

export type UseSetupFloatingOptions = {
  isOpen: boolean,
  onOpenChange?: (open: boolean) => void,
  config?: FloatingConfig,
};

export const useSetupFloating = ({
  isOpen = false,
  onOpenChange = () => {},
  config,
}: UseSetupFloatingOptions) => {
  const data = useFloating({
    open: isOpen,
    onOpenChange,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(config?.offset || 16),
      config?.placement === "auto" ? autoPlacement(config.autoPlacement) : flip(config?.flip),
      hide(config?.hide),
      shift(config?.shift),
      arrow(config?.arrow ? config.arrow : { element: null }),
      size(config?.size),
    ],
    ...config as Partial<Omit<UseFloatingOptions, "placement">>,
    ...(config?.placement === "auto" && ({ placement: "bottom" })),
    ...(config?.placement !== "auto" && ({ placement: config?.placement })),
  });

  return useMemo(
    () => ({
      ...data,
    }),
    [data]
  );
};
