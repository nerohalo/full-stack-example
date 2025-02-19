import { Stack } from "@css/styled-system/jsx";
import { dialogRecipe } from "@css/styled-system/recipes";
import type { OverlayTriggerProps } from "@react-types/overlays";
import { type ReactNode, useRef } from "react";
import {
  type AriaDialogProps,
  type AriaModalOverlayProps,
  Overlay,
  useDialog,
  useModalOverlay,
} from "react-aria";
import { useOverlayTriggerState } from "react-stately";

import { Content } from "./Content";
import { Description } from "./Description";
import { DialogProvider } from "./dialogContext.ts";
import { Title } from "./Title";

export type DialogProps = {
  children: ReactNode,
} & AriaDialogProps & AriaModalOverlayProps & OverlayTriggerProps;

export const Dialog = ({
  children,
  isOpen,
  defaultOpen,
  onOpenChange,
  ...props
}: DialogProps) => {
  const state = useOverlayTriggerState({
    isOpen,
    defaultOpen,
    onOpenChange,
  });

  const dialogRef = useRef<HTMLDivElement>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const { modalProps, underlayProps } = useModalOverlay(props, state, modalRef);
  const { dialogProps } = useDialog(props, dialogRef);

  const dialogStyles = dialogRecipe();

  return isOpen
    ? (
      <DialogProvider value={{ dialogStyles }}>
        <Overlay>
          <div className={dialogStyles.underlay} {...underlayProps}>
            <Stack
              {...modalProps}
              ref={modalRef}
              w="100%"
              maxW="450px"
            >
              <div
                {...dialogProps}
                ref={dialogRef}
                className={dialogStyles.root}
                aria-modal="true"
              >
                {children}
              </div>
            </Stack>
          </div>
        </Overlay>
      </DialogProvider>
    )
    : null;
};

Dialog.Content = Content;
Dialog.Title = Title;
Dialog.Description = Description;
