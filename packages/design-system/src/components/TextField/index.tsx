import { cx } from "@css/styled-system/css";
import { Stack } from "@css/styled-system/jsx";
import { textFieldRecipe, type TextFieldRecipeVariantProps } from "@css/styled-system/recipes";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { type AriaTextFieldOptions, useObjectRef, useTextField } from "react-aria";

import { Text } from "../Text";

export type TextFieldProps = {
  label?: ReactNode,
  loading?: boolean,
  slots?: {
    root?: string,
    input?: string,
    control?: string,
    label?: string,
  },
  successMessage?: ReactNode,
  warningMessage?: ReactNode,
}
  & TextFieldRecipeVariantProps
  & Omit<InputHTMLAttributes<HTMLInputElement>, "prefix">
  & AriaTextFieldOptions<"input">;

export const TextField = forwardRef<HTMLInputElement, Omit<TextFieldProps, "color">>((
  props,
  forwardRef
) => {
  const {
    fluid,
    loading = false,
    slots,
    successMessage,
    warningMessage,
    isInvalid,
    ...rest
  } = props;
  const ref = useObjectRef(forwardRef);
  const invalid = isInvalid || !!props.errorMessage;
  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    validationErrors,
  } = useTextField({ ...rest, isInvalid: invalid }, ref);

  const isDisabled = loading || props.disabled;

  const getColor = () => {
    if (loading) {
      return "gray";
    }

    if (invalid) {
      return "ruby";
    }

    if (successMessage) {
      return "grass";
    }

    if (warningMessage) {
      return "orange";
    }
  };

  const textFieldStyles = textFieldRecipe({ fluid, color: getColor() });

  return (
    <div className={cx(textFieldStyles.root, slots?.root)}>
      {props.label && (
        <label {...labelProps} className={cx(textFieldStyles.label, slots?.label)}>
          <Text size="2">
            {props.label}
          </Text>
        </label>
      )}

      <Stack w="100%" direction="column" gap="1">
        <div className={cx(textFieldStyles.control, slots?.control)}>
          <input
            {...inputProps}
            className={cx(textFieldStyles.input, slots?.input)}
            ref={ref}
            disabled={isDisabled}
          />
        </div>

        {invalid && props.errorMessage && (
          <Text size="1" color="ruby" {...errorMessageProps}>
            {typeof props.errorMessage !== "function" ? props.errorMessage : validationErrors.join(" ")}
          </Text>
        )}

        {!invalid && props.description && (
          <Text size="1" color="gray" {...descriptionProps}>
            {props.description}
          </Text>
        )}

        {!invalid && successMessage && (
          <Text size="1" color="grass" {...descriptionProps}>
            {successMessage}
          </Text>
        )}

        {!invalid && warningMessage && (
          <Text size="1" color="orange" {...descriptionProps}>
            {warningMessage}
          </Text>
        )}
      </Stack>
    </div>
  );
});

TextField.displayName = "TextField";
