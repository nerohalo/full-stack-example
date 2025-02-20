import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";

import { useDialogs, DialogsProvider } from "../../providers";
import { user } from "../utils";

const TestComponent = () => {
  const { showDialog, closeDialog, name } = useDialogs();

  return (
    <div>
      <button
        type="button"
        data-testid="show-dialog"
        onClick={() => showDialog("testDialog", { key: "value" }, () => {})}
      >
        Show Dialog
      </button>
      <button
        type="button"
        data-testid="close-dialog"
        onClick={() => closeDialog({ key: "value" })}
      >
        Close Dialog
      </button>
      {name && <div data-testid="dialog-name">Active Dialog: {name}</div>}
    </div>
  );
};

describe("DialogProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children correctly", () => {
    render(
      <DialogsProvider>
        <div>Test Child</div>
      </DialogsProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("shows a dialog", async() => {

    render(
      <DialogsProvider>
        <TestComponent />
      </DialogsProvider>
    );

    const showDialogButton = screen.getByTestId("show-dialog");
    await user.click(showDialogButton);

    expect(screen.getByTestId("dialog-name")).toHaveTextContent("Active Dialog: testDialog");
  });

  it("closes a dialog and clears state correctly", async() => {

    render(
      <DialogsProvider>
        <TestComponent />
      </DialogsProvider>
    );

    const showDialogButton = screen.getByTestId("show-dialog");
    const closeDialogButton = screen.getByTestId("close-dialog");

    await user.click(showDialogButton);
    expect(screen.getByTestId("dialog-name")).toHaveTextContent("Active Dialog: testDialog");

    await user.click(closeDialogButton);
    expect(screen.queryByTestId("dialog-name")).not.toBeInTheDocument();
  });

  it("calls the closeCallback when closing the dialog", async() => {
    const mockCloseCallback = vi.fn();

    const TestComponentWithCallback = () => {
      const { showDialog, closeDialog, name } = useDialogs();

      return (
        <div>
          <button
            type="button"
            data-testid="show-dialog"
            onClick={() => showDialog("testDialog", { key: "value" }, mockCloseCallback)}
          >
            Show Dialog
          </button>
          <button
            type="button"
            data-testid="close-dialog"
            onClick={() => closeDialog({ key: "value" })}
          >
            Close Dialog
          </button>
          {name && <div data-testid="dialog-name">Active Dialog: {name}</div>}
        </div>
      );
    };

    render(
      <DialogsProvider>
        <TestComponentWithCallback />
      </DialogsProvider>
    );

    const showDialogButton = screen.getByTestId("show-dialog");
    const closeDialogButton = screen.getByTestId("close-dialog");

    await user.click(showDialogButton);
    await user.click(closeDialogButton);

    expect(mockCloseCallback).toHaveBeenCalledOnce();
    expect(mockCloseCallback).toHaveBeenCalledWith({ key: "value" });
  });
});
