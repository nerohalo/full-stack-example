import { createContext } from "context";
import type { HTMLAttributes, RefObject } from "react";
import type { AriaButtonProps } from "react-aria";
import type { DisclosureState } from "react-stately";

export type CollapsibleContextType = {
  triggerProps: AriaButtonProps<"button">,
  panelProps: HTMLAttributes<HTMLDivElement>,
  panelRef: RefObject<HTMLDivElement | null>,
  state: DisclosureState,
  collapsibleStyles: {
    trigger: string,
    panel: string,
  },
};

export const [CollapsibleProvider, useCollapsible, CollapsibleContext] = createContext<CollapsibleContextType>({
  name: "CollapsibleContext",
  strict: false,
});
