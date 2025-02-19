import { collapsibleRecipe } from "@css/styled-system/recipes";
import { type ReactNode, useRef } from "react";
import { type AriaDisclosureProps, useDisclosure } from "react-aria";
import { useDisclosureState } from "react-stately";

import { CollapsibleProvider } from "./collapsibleContext.ts";
import { Panel } from "./Panel";
import { Trigger } from "./Trigger";

export type CollapsibleProps = {
  children: ReactNode,
} & AriaDisclosureProps;

export const Collapsible = (props: CollapsibleProps ) => {
  const state = useDisclosureState(props);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const { buttonProps: triggerProps, panelProps } = useDisclosure(
    props,
    state,
    panelRef
  );

  const collapsibleStyles = collapsibleRecipe({ expanded: state.isExpanded });

  return (
    <CollapsibleProvider value={{ triggerProps, panelProps, panelRef, state, collapsibleStyles }}>
      {props.children}
    </CollapsibleProvider>
  );
};

Collapsible.Trigger = Trigger;
Collapsible.Panel = Panel;
