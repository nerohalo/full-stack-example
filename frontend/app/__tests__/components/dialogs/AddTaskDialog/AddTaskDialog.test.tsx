import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";

import { createTestQueryClient, renderWithClient } from "@/__tests__/utils";
import AddTaskDialog from "@/components/dialogs/AddTaskDialog";

vi.mock("design-system", async(importOriginal) => ({
  ...await importOriginal<typeof import("design-system")>(),
  useNotification: vi.fn(() => ({
    showNotification: vi.fn(),
  })),
}));

describe("AddTaskDialog", () => {
  const queryClient = createTestQueryClient();
  const mockCloseDialog = vi.fn();
  const Component = (
    <AddTaskDialog closeDialog={mockCloseDialog} />
  );

  it("renders Dialog with title and description", () => {
    renderWithClient(queryClient, Component);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
    expect(screen.getByText("Add a new task")).toBeInTheDocument();
    expect(screen.getByTestId("add-task-form")).toBeInTheDocument();
  });

  it("calls closeDialog when dialog is closed", async() => {

    renderWithClient(queryClient, Component);

    const dialogCloseButton = screen.getByText("Cancel");
    await userEvent.click(dialogCloseButton);

    expect(mockCloseDialog).toHaveBeenCalledTimes(1);
  });
});
