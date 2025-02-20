/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, screen, act } from "@testing-library/react";
import { ReactNode } from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { Toast, type Props } from "../../components";
import { NOTIFICATION_TIMEOUT } from "../../constants";
import { user, setupStrictMode } from "../utils";

// Mock the Portal component to simplify DOM testing by rendering its children directly
vi.mock("../../components/Portal", () => ({
  Portal: ({ children }: { children: ReactNode }) => children,
}));

// Mock the Draggable component to disable drag-related functionality during tests
vi.mock("../../components/Draggable", () => ({
  Draggable: ({ children }: { children: ReactNode }) => children,
}));

// Define the default props for the Toast component used in tests
const defaultProps: Props = {
  id: "test-toast",
  content: {
    title: "Test Title",
    description: "Test Description",
    appearance: "informative",
  },
  options: {
    autoClose: NOTIFICATION_TIMEOUT,
    portalTarget: document.body,
    closable: true,
    pauseOnHover: true,
  },
  closeNotification: vi.fn(),
};

describe("Toast Component", () => {
  // Mocked callback for the `closeNotification` function
  const closeNotificationCallback = vi.fn();

  // Apply strict mode setup to test for React-specific issues (like side effects and warnings).
  setupStrictMode();

  // Before each test, set up fake timers for time manipulation
  beforeEach(() => {
    vi.useFakeTimers();
  });

  // After each test, clear all mocks and restore real timers
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("renders basic content", () => {
    render(<Toast {...defaultProps} />);

    // Validate the presence of title, description, and alert role
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("auto-closes after timeout", () => {
    render(<Toast {...defaultProps} closeNotification={closeNotificationCallback} />);

    // Advance the timer to simulate the passage of time beyond the timeout
    act(() => {
      vi.advanceTimersByTime(NOTIFICATION_TIMEOUT + 100);
    });

    // Verify that the closeNotification callback is triggered
    expect(closeNotificationCallback).toHaveBeenCalledWith("test-toast");
  });

  it("pauses timer on hover", async() => {
    render(<Toast {...defaultProps} closeNotification={closeNotificationCallback} />);

    const toast = screen.getByRole("alert");

    // Simulate a hover event
    await user.hover(toast);

    // Advance the timer but ensure the closeNotification callback is not triggered
    act(() => {
      vi.advanceTimersByTime(NOTIFICATION_TIMEOUT - 100);
    });
    expect(closeNotificationCallback).not.toHaveBeenCalled();

    // Simulate the user stopping the hover
    await user.unhover(toast);

    // Advance the timer and verify the callback is now triggered
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(closeNotificationCallback).toHaveBeenCalled();
  });

  it("closes on escape key", async() => {
    render(<Toast {...defaultProps} closeNotification={closeNotificationCallback} />);

    // Focus on the parent element of the Toast and simulate an Escape key press
    screen.getByRole("alert").parentElement!.focus();
    await user.keyboard("{Escape}");

    // Verify that the closeNotification callback is triggered
    expect(closeNotificationCallback).toHaveBeenCalledWith("test-toast");
  });

  it("shows progress bar when enabled", () => {
    render(<Toast {...defaultProps} />);

    // Check if the progress bar element is present
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("hides progress bar when disabled", () => {
    // Override props to disable the progress bar
    const props = {
      ...defaultProps,
      options: { ...defaultProps.options, hideProgressBar: true },
    };
    render(<Toast {...props} />);

    // Verify the absence of the progress bar element
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("closes when close button clicked", async() => {
    render(<Toast {...defaultProps} closeNotification={closeNotificationCallback} />);

    // Simulate a click event on the close button
    await user.click(screen.getByRole("button", { name: /close/i }));

    // Verify that the closeNotification callback is triggered
    expect(closeNotificationCallback).toHaveBeenCalledWith("test-toast");
  });

  it("renders custom content", () => {
    // Override props to add custom content
    const props = {
      ...defaultProps,
      content: {
        ...defaultProps.content,
        customContent: <div data-testid="custom-content">Custom</div>,
      },
    };
    render(<Toast {...props} />);

    // Verify the presence of the custom content
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });

  it("does not auto-close when autoClose is false", () => {
    // Override props to disable auto-close
    const props = {
      ...defaultProps,
      options: { ...defaultProps.options, autoClose: false },
    };
    render(<Toast {...props} closeNotification={closeNotificationCallback} />);

    // Advance the timer beyond the usual timeout period
    act(() => {
      vi.advanceTimersByTime(NOTIFICATION_TIMEOUT * 2);
    });

    // Verify that the callback is not triggered
    expect(closeNotificationCallback).not.toHaveBeenCalled();
  });
});
