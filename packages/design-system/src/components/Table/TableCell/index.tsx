import type { GridNode } from "@react-types/grid";
import { useRef } from "react";
import { useTableCell } from "react-aria";
import type { TableState } from "react-stately";

type TableCellProps<T> = {
  cell: GridNode<T>,
  state: TableState<T>,
  className?: string,
};

export function TableCell<T>(props: TableCellProps<T>) {
  const { cell, state, className } = props;
  const ref = useRef<HTMLTableCellElement>(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);

  return (
    <td
      {...gridCellProps}
      ref={ref}
      className={className}
    >
      {cell.rendered}
    </td>
  );
}
