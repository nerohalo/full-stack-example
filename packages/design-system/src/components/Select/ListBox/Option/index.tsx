import { Check } from "lucide-react";
import { useRef } from "react";
import { useOption } from "react-aria";
import type { ListState, Node } from "react-stately";

export type OptionProps<T> = {
  item: Node<T>,
  state: ListState<T>,
  className?: string,
};

export const Option = <T extends object>({ item, state, className }: OptionProps<T>) => {
  const ref = useRef(null);
  const { optionProps, isSelected } = useOption({ key: item.key }, state, ref);

  return (
    <li
      {...optionProps}
      ref={ref}
      className={className}
    >
      {item.rendered}
      {isSelected ? <Check width="14" height="14" /> : null}
    </li>
  );
};
