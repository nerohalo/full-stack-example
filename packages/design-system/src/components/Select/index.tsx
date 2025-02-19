import { Stack } from "@css/styled-system/jsx";
import { selectRecipe } from "@css/styled-system/recipes";
import { ChevronDown } from "lucide-react";
import { forwardRef, ForwardRefExoticComponent, RefAttributes, useEffect, useRef } from "react";
import { type AriaSelectProps, HiddenSelect, useSelect } from "react-aria";
import { Item, useSelectState } from "react-stately";

import { mergeRefs } from "../../helpers";
import { Popover } from "../Popover";
import { Text } from "../Text";

import { ListBox } from "./ListBox";
import { SelectButton } from "./SelectButton";

export type SelectProps = {
  fluid?: boolean,
  loading?: boolean,
  errorMessage?: string,
  successMessage?: string,
  warningMessage?: string,
} & AriaSelectProps<object>;

type CompoundedComponent = {
  Item: typeof Item,
} & ForwardRefExoticComponent<SelectProps & RefAttributes<HTMLButtonElement>>;

export const Select = forwardRef((
  props,
  forwardRef
) => {
  const isInvalid = props.isInvalid || !!props.errorMessage;
  const isDisabled = props.loading || props.isDisabled;
  const state = useSelectState({ ...props, isDisabled, isInvalid });

  const ref = useRef(null);

  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    descriptionProps,
    errorMessageProps,
  } = useSelect({ ...props, isDisabled, isInvalid }, state, ref);

  const getColor = () => {
    if (props.loading) {
      return "gray";
    }

    if (isInvalid) {
      return "ruby";
    }

    if (props.successMessage) {
      return "grass";
    }

    if (props.warningMessage) {
      return "orange";
    }
  };

  useEffect(() => {
    if (state.isOpen && !state.isFocused) {
      state.setOpen(false);
    }
  }, [state]);

  const selectStyles = selectRecipe({ fluid: props.fluid, color: getColor() });

  return (
    <div className={selectStyles.root}>
      <div {...labelProps} className={selectStyles.label}>
        <Text size="2">
          {props.label}
        </Text>
      </div>

      <HiddenSelect
        isDisabled={isDisabled}
        state={state}
        triggerRef={ref}
        name={props.name}
      />

      <Popover
        isOpen={state.isOpen}
        onOpenChange={(value) => {
          state.setOpen(value);
        }}
        config={{
          autoPlacement: {
            allowedPlacements: ["bottom"],
          },
          size: {
            apply({ elements }) {
              elements.floating.style.width = `${elements.reference.getBoundingClientRect().width}px`;
            },
          },
        }}
      >
        <Stack direction="column" gap="1">
          <SelectButton
            triggerProps={triggerProps}
            state={state}
            className={selectStyles.control}
            ref={mergeRefs(ref, forwardRef)}
            aria-invalid={isInvalid}
          >
            {state.selectedItem
              ? (
                <div
                  {...valueProps}
                  className={selectStyles.value}
                >
                  {state.selectedItem.rendered}
                </div>
              )
              : (
                <div
                  {...valueProps}
                  className={selectStyles.placeholder}
                >
                  {props.placeholder}
                </div>
              )}

            <ChevronDown
              width="14"
              height="14"
              className={selectStyles.valueIndicator}
            />
          </SelectButton>

          {isInvalid && props.errorMessage && (
            <Text size="1" color="ruby" {...errorMessageProps}>
              {props.errorMessage}
            </Text>
          )}

          {!isInvalid && props.description && (
            <Text size="1" color="gray" {...descriptionProps}>
              {props.description}
            </Text>
          )}

          {!isInvalid && props.successMessage && (
            <Text size="1" color="grass" {...descriptionProps}>
              {props.successMessage}
            </Text>
          )}

          {!isInvalid && props.warningMessage && (
            <Text size="1" color="orange" {...descriptionProps}>
              {props.warningMessage}
            </Text>
          )}
        </Stack>

        <Popover.Layer>
          <Popover.Layer.Arrow />

          <ListBox
            {...menuProps}
            state={state}
            className={selectStyles.listBox}
          >
            {(nodes) => nodes.map((item) => (
              <ListBox.Option
                className={selectStyles.option}
                key={item.key}
                item={item}
                state={state}
              />
            ))}
          </ListBox>
        </Popover.Layer>
      </Popover>
    </div>
  );
}) as CompoundedComponent;

Select.Item = Item;
