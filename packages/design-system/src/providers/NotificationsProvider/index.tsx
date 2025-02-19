import { cx } from "@css/styled-system/css";
import { AnimatePresence } from "framer-motion";
import { type HTMLAttributes, type ReactNode, useRef, useState } from "react";

import { Toast } from "../../components";
import { NOTIFICATION_TIMEOUT } from "../../constants";
import { generateRandomHex } from "../../helpers";

import { NotificationsContext, Provider } from "./notificationsContext";
import type { NotificationsContextType, NotificationsOptions } from "./notificationsContext.ts";

import * as s from "./NotificationsProvider.css";

export type NotificationsProviderProps = {
  children?: ReactNode,
  config?: Omit<NotificationsOptions, "toastClassName">,
} & HTMLAttributes<HTMLDivElement>;

const notificationConfigDefaults: NotificationsProviderProps["config"]  = {
  autoClose: NOTIFICATION_TIMEOUT,
  position: "top-right",
  positioningStrategy: "fixed",
  newestOnTop: true,
  draggable: true,
  pauseOnHover: true,
  hideProgressBar: false,
  draggablePercent: 20,
  dragDirection: "x",
  closable: true,
};

export const NotificationsProvider = ({
  children,
  config,
  className,
  ...rest
}: NotificationsProviderProps) => {
  const notificationConfig = useRef<NotificationsContextType["config"]>({
    ...notificationConfigDefaults,
    ...config,
  });

  const [state, setState] = useState<Omit<NotificationsContextType, "config">>({
    toasts: [],
    toastIds: [],
    closeNotification: (toastId) => {
      if (toastId) {
        setState((prevState) => ({
          ...prevState,
          toasts: prevState.toasts.filter((toast) => toast.id !== toastId),
        }));

        setState((prevState) => ({
          ...prevState,
          toastIds: prevState.toastIds.filter((id) => id !== toastId),
        }));
      }
    },
    closeAllNotifications: () => {
      setState((prevState) => ({
        ...prevState,
        toasts: [],
        toastIds: [],
      }));
    },
    showNotification: (content, options) => {
      const id = generateRandomHex(6);
      const mergedConfig = { ...notificationConfig.current, ...options };
      if (mergedConfig.newestOnTop) {
        setState((prevState) => ({
          ...prevState,
          toasts: [{ content, options: mergedConfig, id }, ...prevState.toasts],
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          toasts: [...prevState.toasts, { content, options: mergedConfig, id }],
        }));
      }

      if (mergedConfig.autoClose === undefined && mergedConfig.hideProgressBar) {
        setTimeout(() => {
          state.closeNotification(id);
        }, NOTIFICATION_TIMEOUT);
      }

      if (mergedConfig?.autoClose) {
        if (typeof mergedConfig.autoClose === "number" && mergedConfig.hideProgressBar) {
          setTimeout(() => {
            state.closeNotification(id);
          }, mergedConfig.autoClose);
        }

        if (mergedConfig.autoClose === true && mergedConfig.hideProgressBar) {
          setTimeout(() => {
            state.closeNotification(id);
          }, NOTIFICATION_TIMEOUT);
        }
      }

      setState((prevState) => ({
        ...prevState,
        toastIds: [...prevState.toastIds, id],
      }));

      return id;
    },
  });

  if (config && JSON.stringify(notificationConfig.current) !== JSON.stringify(config)) {
    notificationConfig.current = {
      ...notificationConfigDefaults,
      ...config,
    };
  }

  return (
    <Provider
      value={{
        ...state,
        config: notificationConfig.current,
      }}
    >
      <div
        {...rest}
        role="region"
        aria-label="notifications"
        className={cx(
          s.container({
            position: notificationConfig.current.position,
            positioningStrategy: notificationConfig.current.positioningStrategy,
          }),
          className
        )}
      >
        <NotificationsContext.Consumer>
          {({
            toasts,
            closeNotification,
          }) => (
            <AnimatePresence>
              {toasts.map(({ id, content, options }) => (
                <Toast
                  key={id}
                  id={id}
                  content={content}
                  options={options}
                  closeNotification={closeNotification}
                />
              ))}
            </AnimatePresence>
          )}
        </NotificationsContext.Consumer>
      </div>
      {children}
    </Provider>
  );
};
