import { cx } from "@css/styled-system/css";
import { type ReactNode, RefObject, useRef } from "react";
import { type AriaListBoxOptions, useListBox } from "react-aria";
import { type SelectState, type Node } from "react-stately";

import { Option } from "./Option";

type ListBoxProps<T extends object> = AriaListBoxOptions<T> & {
  state: SelectState<T>,
  listBoxRef?: RefObject<HTMLUListElement>,
  children: (nodes: Array<Node<T>>) => ReactNode,
  className?: string,
};

export const ListBox = <T extends object>(props: ListBoxProps<T>)=> {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;

  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      className={cx(props.className)}
      ref={listBoxRef}
      autoFocus
    >
      {props.children([...state.collection])}
    </ul>
  );
};

ListBox.Option = Option;
