import type { GridNode } from "@react-types/grid";
import { useRef } from "react";
import {
  useTableCell,
  useTableColumnHeader,
  useTableSelectAllCheckbox,
  useTableSelectionCheckbox,
  VisuallyHidden,
} from "react-aria";
import type { TableState } from "react-stately";

import { Checkbox } from "../../Checkbox";

type TableCheckboxCellProps<T> = {
  cell: GridNode<T>,
  state: TableState<T>,
  className?: string,
};

type TableSelectAllCellProps<T> = {
  column: GridNode<T>,
  state: TableState<T>,
};

export function TableCheckboxCell<T>(props: TableCheckboxCellProps<T>) {
  const { cell, state, className } = props;

  const ref = useRef<HTMLTableCellElement>(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey || "" },
    state
  );

  return (
    <td
      {...gridCellProps}
      ref={ref}
      className={className}
    >
      <Checkbox {...checkboxProps} className="my-auto mx-1" />
    </td>
  );
}

export function TableSelectAllCell<T>(props: TableSelectAllCellProps<T>) {
  const { column, state } = props;
  const ref = useRef<HTMLTableCellElement>(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  const { checkboxProps } = useTableSelectAllCheckbox(state);

  return (
    <th
      {...columnHeaderProps}
      ref={ref}
    >
      {state.selectionManager.selectionMode === "single"
        ? (
          <VisuallyHidden>{checkboxProps["aria-label"]}</VisuallyHidden>
        )
        : (
          <Checkbox {...checkboxProps} />
        )}
    </th>
  );
}
