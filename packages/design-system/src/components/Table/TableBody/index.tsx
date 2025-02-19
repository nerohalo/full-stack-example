import { type ElementType, forwardRef, type ReactNode } from "react";
import { useTableRowGroup } from "react-aria";

type TableBodyProps = {
  type?: ElementType,
  children: ReactNode,
  className?: string,
};

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (
    props,
    ref
  ) => {
    const { children, className } = props;
    const { rowGroupProps } = useTableRowGroup();

    return (
      <tbody
        {...rowGroupProps}
        className={className}
        ref={ref}
      >
        {children}
      </tbody>
    );
  }
);
