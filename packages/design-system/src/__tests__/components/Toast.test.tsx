import { render, screen, fireEvent, act } from "@testing-library/react";
import { ReactNode } from "react";
import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";

import { Toast, type Props } from "../../components";
import { NOTIFICATION_TIMEOUT } from "../../constants";

vi.mock("@/components/Portal", () => ({
  Portal: ({ children }: { children: ReactNode }) => children,
}));

vi.mock("../Draggable", () => ({
  Draggable: ({ children }: { children: ReactNode }) => children,
}));

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
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  test("renders basic content", () => {
    render(<Toast {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  test("auto-closes after timeout", () => {
    const closeNotification = vi.fn();
    render(<Toast {...defaultProps} closeNotification={closeNotification} />);

    act(() => {
      vi.advanceTimersByTime(NOTIFICATION_TIMEOUT + 100);
    });

    expect(closeNotification).toHaveBeenCalledWith("test-toast");
  });

  test("pauses timer on hover", () => {
    const closeNotification = vi.fn();
    render(<Toast {...defaultProps} closeNotification={closeNotification} />);

    const toast = screen.getByRole("alert");

    fireEvent.mouseEnter(toast);
    act(() => {
      vi.advanceTimersByTime(NOTIFICATION_TIMEOUT - 100);
    });
    expect(closeNotification).not.toHaveBeenCalled();

    fireEvent.mouseLeave(toast);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(closeNotification).toHaveBeenCalledTimes(1);
  });

  test("closes on escape key", () => {
    const closeNotification = vi.fn();
    render(<Toast {...defaultProps} closeNotification={closeNotification} />);

    fireEvent.keyDown(screen.getByRole("alert"), { key: "Escape" });
    expect(closeNotification).toHaveBeenCalledWith("test-toast");
  });

  test("shows progress bar when enabled", () => {
    render(<Toast {...defaultProps} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("hides progress bar when disabled", () => {
    const props = {
      ...defaultProps,
      options: {
        ...defaultProps.options,
        hideProgressBar: true,
      },
    };
    render(<Toast {...props} />);
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  test("closes when close button clicked", () => {
    const closeNotification = vi.fn();
    render(<Toast {...defaultProps} closeNotification={closeNotification} />);

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(closeNotification).toHaveBeenCalledWith("test-toast");
  });

  test("renders custom content", () => {
    const props = {
      ...defaultProps,
      content: {
        ...defaultProps.content,
        customContent: <div data-testid="custom-content">Custom</div>,
      },
    };
    render(<Toast {...props} />);
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });

  test("does not auto-close when autoClose is false", () => {
    const props = {
      ...defaultProps,
      options: {
        ...defaultProps.options,
        autoClose: false,
      },
    };
    const closeNotification = vi.fn();
    render(<Toast {...props} closeNotification={closeNotification} />);

    act(() => {
      vi.advanceTimersByTime(NOTIFICATION_TIMEOUT * 2);
    });

    expect(closeNotification).not.toHaveBeenCalled();
  });
});
