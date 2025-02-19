import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import AddListItem from "@/components/AddListItem";
const showDialogMock = vi.fn();

vi.mock("design-system", async(importOriginal) => ({
  ...await importOriginal<typeof import("design-system")>(),
  useDialogs: vi.fn(() => ({
    showDialog: showDialogMock,
  })),
}));

describe("AddListItem Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the button with default text", () => {
    render(<AddListItem />);
    expect(screen.getByText("Add Task")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call showDialog with the correct dialog constant when clicked", async() => {
    const user = userEvent.setup();
    render(<AddListItem />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(showDialogMock).toHaveBeenCalledTimes(1);
    expect(showDialogMock).toHaveBeenCalledWith("ADD_TASKS_DIALOG");
  });

  it("should render with the default color prop `indigo`", () => {
    render(<AddListItem />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "radix-button",
      "radix-button--color_indigo",
      "radix-button--fluid_false",
      "radix-button--size_2"
    );
  });

  it("should apply passed props correctly", () => {
    render(<AddListItem fluid={true} color="ruby" />);
    const button = screen.getByRole("button");

    expect(button).toHaveClass(
      "radix-button",
      "radix-button--color_ruby",
      "radix-button--fluid_true",
      "radix-button--size_2"
    );
  });
});
