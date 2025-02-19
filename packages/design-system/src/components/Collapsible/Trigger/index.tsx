/* eslint-disable react/button-has-type */
import { cx } from "@css/styled-system/css";
import { ChevronDown, ChevronUp } from "lucide-react";
import { type HTMLAttributes, useRef } from "react";
import { mergeProps, useButton, useFocusRing } from "react-aria";

import { useCollapsible } from "../collapsibleContext";

export type TriggerProps = HTMLAttributes<HTMLButtonElement>;

export const Trigger = ({
  children,
  className = "",
  ...rest
}: TriggerProps) => {
  const { triggerProps: collapsibleTriggerProps, state, collapsibleStyles } = useCollapsible();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(collapsibleTriggerProps, triggerRef);
  const { isFocusVisible, focusProps } = useFocusRing();

  const focusStyle = { outline: isFocusVisible ? "2px solid dodgerblue" : "none" };

  const getChevronIcon = () =>
    state.isExpanded ? <ChevronUp /> : <ChevronDown />;

  return (
    <button
      ref={triggerRef}
      {...mergeProps(rest, buttonProps, focusProps)}
      style={focusStyle}
      className={cx(collapsibleStyles.trigger, className)}
    >
      {children}
      {getChevronIcon()}
    </button>
  );
};
