import { VStack } from "@css/styled-system/jsx";
import { toastRecipe } from "@css/styled-system/recipes";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { IconButton, Text, Portal } from "../";
import { NOTIFICATION_TIMEOUT } from "../../constants";
import {
  NotificationOptions,
  NotificationsContextType,
  NotificationsOptions,
} from "../../providers/NotificationsProvider/notificationsContext";
import { Draggable } from "../Draggable";

export type Props = {
  id: string,
  content: NotificationOptions,
  options: NotificationsOptions,
  closeNotification: NotificationsContextType["closeNotification"],
};

export const Toast = ({
  id,
  content,
  closeNotification,
  options,
}: Props) => {
  const timerRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const hasProgressBar = options && !options?.hideProgressBar;

  const getTimeout = useCallback(() => {
    if (options?.autoClose === undefined) {
      return NOTIFICATION_TIMEOUT;
    }
    if (typeof options.autoClose === "number") {
      return options.autoClose;
    }

    return options.autoClose ? NOTIFICATION_TIMEOUT : null;
  }, [options?.autoClose]);

  const timeout = getTimeout();

  const getColor = useCallback(() => {
    if (content.appearance === "negative") {
      return "ruby";
    }

    if (content.appearance === "positive") {
      return "grass";
    }

    if (content.appearance === "notice") {
      return "orange";
    }

    return "indigo";
  }, [content.appearance]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeNotification(id);
    }
  }, [closeNotification, id]);

  const startTimer = useCallback((duration: number) => {
    if (!duration) {
      return;
    }

    startTimeRef.current = Date.now();
    remainingTimeRef.current = duration;

    timerRef.current = window.setTimeout(() => {
      closeNotification(id);
    }, duration);
  }, [closeNotification, id]);

  const pauseTimer = useCallback(() => {
    if (!timerRef.current) {
      return;
    }
    window.clearTimeout(timerRef.current);
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current -= elapsed;
    timerRef.current = undefined;
  }, []);

  const resumeTimer = useCallback(() => {
    if (!remainingTimeRef.current) {
      return;
    }
    startTimer(remainingTimeRef.current);
  }, [startTimer]);

  useEffect(() => {
    if (timeout !== null) {
      startTimer(timeout);
    }

    return () => window.clearTimeout(timerRef.current);
  }, [startTimer, timeout]);

  useEffect(() => {
    if (!options?.pauseOnHover) {
      return;
    }

    if (isHovered) {
      pauseTimer();
    } else {
      resumeTimer();
    }
  }, [isHovered, options?.pauseOnHover, pauseTimer, resumeTimer]);

  const toastStyles = toastRecipe({
    color: getColor(),
  });

  return (
    <Portal targetSelector={options.portalTarget} renderWithoutTarget>
      <Draggable
        draggablePercent={options.draggablePercent}
        dragDirection={options.dragDirection}
        draggable={options.draggable}
        onDragEscape={() => closeNotification(id)}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          id={id}
        >
          <div
            className={toastStyles.root}
            onMouseEnter={() => options?.pauseOnHover && setIsHovered(true)}
            onMouseLeave={() => options?.pauseOnHover && setIsHovered(false)}
            role="alert"
            aria-live={content.appearance === "negative" ? "assertive" : "polite"}
            aria-atomic="true"
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-desc`}
          >
            {!content.customContent && (
              <VStack alignItems="start" pr="8">
                {content.title && (
                  <Text
                    weight="bold"
                    size="3"
                    id={`${id}-title`}
                  >
                    {content.title}
                  </Text>
                )}

                {content.description && (
                  <Text
                    size="2"
                    id={`${id}-desc`}
                  >
                    {content.description}
                  </Text>
                )}
              </VStack>
            )}

            {options.closable && (
              <IconButton
                size="1"
                color={getColor()}
                className={toastStyles.closeButton}
                onPress={() => closeNotification(id)}
                aria-label="Close notification"
              >
                <X
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
              </IconButton>
            )}

            {content.customContent && content.customContent}

            {hasProgressBar && timeout !== null && (
              <div
                className={toastStyles.progressBar}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Notification timeout progress"
                style={{
                  animationDuration: `${timeout}ms`,
                  animationPlayState: isHovered ? "paused" : "running",
                }}
              />
            )}
          </div>
        </motion.div>
      </Draggable>
    </Portal>
  );
};
