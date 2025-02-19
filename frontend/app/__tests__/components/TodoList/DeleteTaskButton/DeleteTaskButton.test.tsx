import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import DeleteTaskButton from "@/components/TodoList/DeleteTaskButton";
import { DIALOGS } from "@/constants";
import { getGetTodoResponseMock } from "@/gen/api";

const showDialogMock = vi.fn();

vi.mock("design-system", async(importOriginal) => ({
  ...await importOriginal<typeof import("design-system")>(),
  useDialogs: vi.fn(() => ({
    showDialog: showDialogMock,
  })),
}));

vi.mock("lucide-react", () => ({
  Trash2: ({ size }: { size: string }) => (
    <svg data-testid="trash-icon" data-size={size} />
  ),
}));

describe("DeleteTaskButton", () => {
  const todoMock = getGetTodoResponseMock();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the button with the correct text and icon", () => {
    render(<DeleteTaskButton todo={todoMock} />);

    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toBeInTheDocument();

    expect(button).toHaveClass(
      "radix-button",
      "radix-button--color_ruby",
      "radix-button--fluid_false",
      "radix-button--size_2"
    );

    expect(screen.getByTestId("trash-icon")).toBeInTheDocument();
    expect(screen.getByTestId("trash-icon")).toHaveAttribute("data-size", "16px");
  });

  it("calls `showDialog` with the correct arguments when clicked", async() => {
    const user = userEvent.setup();
    render(<DeleteTaskButton todo={todoMock} />);

    const button = screen.getByRole("button", { name: /delete/i });
    await user.click(button);

    expect(showDialogMock).toHaveBeenCalledTimes(1);

    expect(showDialogMock).toHaveBeenCalledWith(DIALOGS.DELETE_TASKS_DIALOG, { ...todoMock });
  });
});
