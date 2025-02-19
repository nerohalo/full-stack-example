import type { GridNode } from "@react-types/grid";
import { type ReactNode, useRef } from "react";
import { useTableHeaderRow } from "react-aria";
import type { TableState } from "react-stately";

type TableHeaderRowProps<T> = {
  item: GridNode<T>,
  children: ReactNode,
  state: TableState<T>,
  className?: string,
};

export function TableHeaderRow<T>(props: TableHeaderRowProps<T>) {
  const { item, children, state, className } = props;
  const ref = useRef<HTMLTableRowElement>(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr
      {...rowProps}
      ref={ref}
      className={className}
    >
      {children}
    </tr>
  );
}
