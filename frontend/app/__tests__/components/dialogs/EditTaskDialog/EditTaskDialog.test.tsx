import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";

import { createTestQueryClient, renderWithClient } from "@/__tests__/utils";
import EditTaskDialog from "@/components/dialogs/EditTaskDialog";
import { getGetTodoResponseMock } from "@/gen/api";

vi.mock("design-system", async(importOriginal) => ({
  ...await importOriginal<typeof import("design-system")>(),
  useNotification: vi.fn(() => ({
    showNotification: vi.fn(),
  })),
}));

describe("EditTaskDialog", () => {
  const queryClient = createTestQueryClient();

  const mockTodoData = getGetTodoResponseMock();

  it("renders Dialog with title and description", () => {
    const mockCloseDialog = vi.fn();

    renderWithClient(
      queryClient,
      <EditTaskDialog
        data={mockTodoData}
        closeDialog={mockCloseDialog}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByText("Make changes to the task")).toBeInTheDocument();
    expect(screen.getByTestId("edit-task-form")).toBeInTheDocument();
  });

  it("calls closeDialog when dialog is closed", async() => {
    const mockCloseDialog = vi.fn();

    renderWithClient(
      queryClient,
      <EditTaskDialog
        data={mockTodoData}
        closeDialog={mockCloseDialog}
      />
    );

    const dialogCloseButton = screen.getByText("Cancel");
    await userEvent.click(dialogCloseButton);

    expect(mockCloseDialog).toHaveBeenCalledTimes(1);
  });
});
