import { cx } from "@css/styled-system/css";
import { tableRecipe } from "@css/styled-system/recipes";
import type { TableProps } from "@react-types/table";
import { type ReactNode, useRef } from "react";
import { type AriaTableProps, useTable } from "react-aria";
import { useTableState } from "react-stately";
import {
  Cell,
  Column,
  Row,
  TableBody as StatelyTableBody,
  TableHeader as StatelyTableHeader,
} from "react-stately";

import type { SelectionBehavior } from "@react-types/shared";

import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableCheckboxCell, TableSelectAllCell } from "./TableCheckbox";
import { TableColumnHeader } from "./TableColumnHeader";
import { TableHeader } from "./TableHeader";
import { TableHeaderRow } from "./TableHeaderRow";
import { TableRow } from "./TableRow";

type TableComponentProps<T> = {
  selectionBehavior?: SelectionBehavior,
  children: ReactNode,
  fluid?: boolean,
  verticalAlign?: "top" | "middle" | "bottom",
} & AriaTableProps & TableProps<T>;

export function Table<T extends object>(props: TableComponentProps<T>) {
  const {
    selectionMode,
    selectionBehavior,
    fluid,
    verticalAlign,
  } = props;

  const ref = useRef<HTMLTableElement>(null);
  const state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === "multiple" && selectionBehavior !== "replace",
  });

  const { collection } = state;
  const { gridProps } = useTable(props, state, ref);

  const tableStyles = tableRecipe({ fluid, verticalAlign });

  return (
    <table
      {...gridProps}
      ref={ref}
      className={tableStyles.root}
    >
      <TableHeader className={tableStyles.header}>
        {collection.headerRows.map((headerRow) => (
          <TableHeaderRow
            key={headerRow.key}
            item={headerRow}
            state={state}
            className={tableStyles.headerRow}
          >
            {[...headerRow.childNodes].map((column) =>
              column.props.isSelectionCell
                ? (
                  <TableSelectAllCell
                    key={column.key}
                    column={column}
                    state={state}
                  />
                )
                : (
                  <TableColumnHeader
                    key={column.key}
                    column={column}
                    state={state}
                    className={cx(tableStyles.cell, tableStyles.headerColumn)}
                  />
                )
            )}
          </TableHeaderRow>
        ))}
      </TableHeader>

      <TableBody className={tableStyles.body}>
        {[...collection.body.childNodes].map((row) => (
          <TableRow
            key={row.key}
            item={row}
            state={state}
            className={tableStyles.row}
          >
            {[...row.childNodes].map((cell) =>
              cell.props.isSelectionCell
                ? (
                  <TableCheckboxCell
                    key={cell.key}
                    cell={cell}
                    state={state}
                    className={tableStyles.checkboxCell}
                  />
                )
                : (
                  <TableCell
                    key={cell.key}
                    cell={cell}
                    state={state}
                    className={tableStyles.cell}
                  />
                )
            )}
          </TableRow>
        ))}
      </TableBody>
    </table>
  );
}

Table.Header = StatelyTableHeader;
Table.Body = StatelyTableBody;
Table.Cell = Cell;
Table.Column = Column;
Table.Row = Row;
