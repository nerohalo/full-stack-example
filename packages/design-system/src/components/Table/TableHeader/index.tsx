import { type ElementType, forwardRef, type ReactNode } from "react";
import { useTableRowGroup } from "react-aria";

type TableHeaderProps = {
  type?: ElementType,
  children: ReactNode,
  className?: string,
};

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  (
    props,
    ref
  ) => {
    const { children, className } = props;
    const { rowGroupProps } = useTableRowGroup();

    return (
      <thead
        {...rowGroupProps}
        className={className}
        ref={ref}
      >
        {children}
      </thead>
    );
  }
);
