import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";

import DialogRenderer from "@/components/DialogRenderer";
import { DIALOGS } from "@/constants";

vi.mock("@/components/dialogs/AddTaskDialog", () => ({
  __esModule: true,
  default: () => <div data-testid="AddTaskDialog">test</div>,
}));

vi.mock("@/components/dialogs/EditTaskDialog", () => ({
  __esModule: true,
  default: () => <div data-testid="EditTaskDialog">test</div>,
}));

vi.mock("@/components/dialogs/DeleteTaskDialog", () => ({
  __esModule: true,
  default: () => <div data-testid="DeleteTaskDialog">test</div>,
}));

describe("DialogRenderer", () => {
  const mockShowDialog = vi.fn();
  const mockCloseDialog = vi.fn();
  const mockCloseCallback = vi.fn();

  const defaultProps = {
    showDialog: mockShowDialog,
    closeDialog: mockCloseDialog,
    closeCallback: mockCloseCallback,
  };

  it("renders AddTaskDialog when name is ADD_TASKS_DIALOG", () => {
    render(
      <DialogRenderer
        name={DIALOGS.ADD_TASKS_DIALOG}
        data={{ id: 1 }}
        {...defaultProps}
      />
    );

    expect(screen.getByTestId("AddTaskDialog")).toBeInTheDocument();
  });

  it("renders EditTaskDialog when name is EDIT_TASKS_DIALOG", () => {
    render(
      <DialogRenderer
        name={DIALOGS.EDIT_TASKS_DIALOG}
        data={{ id: 2 }}
        {...defaultProps}
      />
    );

    expect(screen.getByTestId("EditTaskDialog")).toBeInTheDocument();
  });

  it("renders DeleteTaskDialog when name is DELETE_TASKS_DIALOG", () => {
    render(
      <DialogRenderer
        name={DIALOGS.DELETE_TASKS_DIALOG}
        data={{ id: 3 }}
        {...defaultProps}
      />
    );

    expect(screen.getByTestId("DeleteTaskDialog")).toBeInTheDocument();
  });

  it("renders null when name does not match any dialog", () => {
    const { container } = render(
      <DialogRenderer
        name="UNKNOWN_DIALOG"
        data={{ id: 4 }}
        {...defaultProps}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
