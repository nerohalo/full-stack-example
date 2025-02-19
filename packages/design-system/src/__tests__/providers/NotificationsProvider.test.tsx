import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fragment, ReactNode } from "react";
import { describe, it, vi, expect, beforeEach } from "vitest";

import { NotificationsProvider, useNotification } from "../../providers";

vi.mock("../../components/Draggable", () => ({
  Draggable: ({ children }: { children: ReactNode }) => <Fragment>{children}</Fragment>,
}));

const TestComponent = () => {
  const { showNotification, closeAllNotifications } = useNotification();

  return (
    <div>
      <button
        type="button"
        data-testid="show-notification"
        onClick={() =>
          showNotification(
            {
              title: "Test Notification",
              description: "This is a test notification.",
            },
            {
              autoClose: 3000,
              pauseOnHover: true,
              closable: true,
            }
          )
        }
      >
        Show Notification
      </button>
      <button
        type="button"
        data-testid="close-all-notifications"
        onClick={closeAllNotifications}
      >
        Close All Notifications
      </button>
    </div>
  );
};

describe("NotificationsProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders children correctly", () => {
    render(
      <NotificationsProvider>
        <div>Test Child</div>
      </NotificationsProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("renders a notification and removes it after timeout", async() => {
    const user = userEvent.setup();

    render(
      <NotificationsProvider>
        <TestComponent />
      </NotificationsProvider>
    );

    const showNotificationButton = screen.getByTestId("show-notification");
    await user.click(showNotificationButton);

    expect(
      await screen.findByText("Test Notification")
    ).toBeInTheDocument();
    expect(screen.getByText("This is a test notification.")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.queryByText("Test Notification")).not.toBeInTheDocument();
    });
  });

  it("closes all notifications when closeAllNotifications is called", async() => {
    const user = userEvent.setup();

    render(
      <NotificationsProvider>
        <TestComponent />
      </NotificationsProvider>
    );

    const showNotificationButton = screen.getByTestId("show-notification");
    await user.click(showNotificationButton);
    await user.click(showNotificationButton);

    expect(await screen.findAllByText("Test Notification")).toHaveLength(2);

    const closeAllButton = screen.getByTestId("close-all-notifications");
    await user.click(closeAllButton);

    expect(screen.queryByText("Test Notification")).not.toBeInTheDocument();
  });

  it("pauses autoClose when notification is hovered and resumes on unhover", async() => {
    const user = userEvent.setup();

    render(
      <NotificationsProvider>
        <TestComponent />
      </NotificationsProvider>
    );

    const showNotificationButton = screen.getByTestId("show-notification");
    await user.click(showNotificationButton);

    const notification = await screen.findByText("Test Notification");
    screen.debug();
    expect(notification).toBeInTheDocument();

    await user.hover(notification);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(notification).toBeInTheDocument();

    await user.unhover(notification);
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.queryByText("Test Notification")).not.toBeInTheDocument();
    });
  });

  it("adds notifications with `newestOnTop` set and ensures correct order", async() => {
    const user = userEvent.setup();

    render(
      <NotificationsProvider config={{ newestOnTop: true }}>
        <TestComponent />
      </NotificationsProvider>
    );

    const showNotificationButton = screen.getByTestId("show-notification");
    await user.click(showNotificationButton);
    await user.click(showNotificationButton);

    const notificationContainer = screen.getByRole("region", { name: /notifications/i });

    const notifications = within(notificationContainer).getAllByRole("alert");
    expect(notifications).toHaveLength(2);

    expect(notifications[0]).toBeInTheDocument();
    expect(notifications[1]).toBeInTheDocument();

    expect(notificationContainer.firstChild).toBe(notifications[0].parentElement);
    expect(notificationContainer.lastChild).toBe(notifications[1].parentElement);
  });

  it("handles `autoClose=false` notifications and keeps them open", async() => {
    const user = userEvent.setup();

    render(
      <NotificationsProvider config={{ autoClose: false }}>
        <TestComponent />
      </NotificationsProvider>
    );

    const showNotificationButton = screen.getByTestId("show-notification");
    await user.click(showNotificationButton);

    const notification = await screen.findByText("Test Notification");
    expect(notification).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(notification).toBeInTheDocument();
  });
});
