import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import EditTaskButton from "@/components/TodoList/EditTaskButton";
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
  Pencil: ({ size }: { size: string }) => (
    <svg data-testid="pencil-icon" data-size={size} />
  ),
}));

describe("EditTaskButton", () => {
  const todoMock = getGetTodoResponseMock();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the button with the correct text and icon", () => {
    render(<EditTaskButton todo={todoMock} />);

    const button = screen.getByRole("button", { name: /edit/i });
    expect(button).toBeInTheDocument();

    expect(button).toHaveClass(
      "radix-button",
      "radix-button--color_gray",
      "radix-button--fluid_false",
      "radix-button--size_2"
    );

    expect(screen.getByTestId("pencil-icon")).toBeInTheDocument();
    expect(screen.getByTestId("pencil-icon")).toHaveAttribute("data-size", "16px");
  });

  it("calls `showDialog` with the correct arguments when clicked", async() => {
    const user = userEvent.setup();
    render(<EditTaskButton todo={todoMock} />);

    const button = screen.getByRole("button", { name: /edit/i });
    await user.click(button);

    expect(showDialogMock).toHaveBeenCalledTimes(1);

    expect(showDialogMock).toHaveBeenCalledWith(DIALOGS.EDIT_TASKS_DIALOG, { ...todoMock });
  });
});
