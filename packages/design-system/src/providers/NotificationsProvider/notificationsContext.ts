import { createContext } from "context";
import { ReactNode } from "react";

import type { PortalContainer } from "../../components";

export type NotificationsOptions = {
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right",
  positioningStrategy?: "sticky" | "fixed" | "absolute" | "relative",
  autoClose?: number | boolean,
  draggable?: boolean,
  draggablePercent?: number,
  dragDirection?: "x" | "y",
  closable?: boolean,
  toastClassName?: string,
  portalTarget?: PortalContainer,
  newestOnTop?: boolean,
  pauseOnHover?: boolean,
  hideProgressBar?: boolean,
};

export type NotificationOptions = {
  appearance?: "negative" | "positive" | "notice" | "informative",
  title: string,
  description?: string,
  customContent?: ReactNode,
};

export type NotificationsContextType = {
  config: Omit<NotificationsOptions, "toastClassName">,
  toastIds: Array<string>,
  toasts: Array<{
    id: string,
    content: NotificationOptions,
    options: NotificationsOptions,
  }>,
  showNotification: (
    content: NotificationOptions,
    options?: NotificationsOptions,
  ) => string,
  closeNotification: (toastId: string) => void,
  closeAllNotifications: () => void,
};

export const [Provider, useNotification, NotificationsContext] = createContext<NotificationsContextType>({
  name: "NotificationsContext",
  strict: false,
});
