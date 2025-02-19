import type { GridNode } from "@react-types/grid";
import { ArrowDownAZ, ArrowUpZA, Ellipsis } from "lucide-react";
import { useRef } from "react";
import { useTableColumnHeader } from "react-aria";
import type { TableState } from "react-stately";

type TableColumnHeaderProps<T> = {
  column: GridNode<T>,
  state: TableState<T>,
  className?: string,
};

export function TableColumnHeader<T>(props: TableColumnHeaderProps<T>) {
  const {
    column,
    state,
    className,
  } = props;
  const ref = useRef<HTMLTableCellElement>(null);

  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );

  const allowsSorting = column.props?.allowsSorting;

  const handleOnClick = () => {
    switch (column.key) {
      case "sort-asc":
        state.sort(column.key, "ascending");
        break;
      case "sort-desc":
        state.sort(column.key, "descending");
        break;
    }
  };

  const sortIcon = state.sortDescriptor?.direction === "ascending"
    ? <ArrowDownAZ width="14" height="14" />
    : <ArrowUpZA width="14" height="14" />;

  const content = (
    <div className={className}>
      {column.props.allowsSorting && state.sortDescriptor?.column === column.key && sortIcon}
      <div>{column.rendered}</div>
      {allowsSorting ? <Ellipsis width="14" height="14" /> : null}
    </div>
  );

  if (!column) {
    return null;
  }

  return (
    <th
      ref={ref}
      {...columnHeaderProps}
      onClick={handleOnClick}
    >
      {content}
    </th>
  );
}
