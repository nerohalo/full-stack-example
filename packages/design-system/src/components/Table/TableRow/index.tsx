import type { GridNode } from "@react-types/grid";
import { type ReactNode, useRef } from "react";
import { useTableRow } from "react-aria";
import type { TableState } from "react-stately";

type TableRowProps<T> = {
  item: GridNode<T>,
  children: ReactNode,
  state: TableState<T>,
  className?: string,
};

export function TableRow<T>(props: TableRowProps<T>) {
  const { item, children, state, className } = props;
  const ref = useRef<HTMLTableRowElement>(null);
  const { rowProps } = useTableRow(
    {
      node: item,
    },
    state,
    ref
  );

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
