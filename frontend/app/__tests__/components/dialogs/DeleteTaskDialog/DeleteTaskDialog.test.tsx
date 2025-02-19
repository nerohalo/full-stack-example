import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, it, vi, beforeEach } from "vitest";

import { createTestQueryClient, renderWithClient, server, setupStrictMode } from "@/__tests__/utils";
import DeleteTaskDialog from "@/components/dialogs/DeleteTaskDialog";
import { getGetTodoResponseMock } from "@/gen/api";

const showNotificationMock = vi.fn();

vi.mock("design-system", async(importOriginal) => ({
  ...await importOriginal<typeof import("design-system")>(),
  useNotification: vi.fn(() => ({
    showNotification: showNotificationMock,
  })),
}));

describe("DeleteTaskDialog", () => {
  setupStrictMode();
  const queryClient = createTestQueryClient();
  const closeDialogMock = vi.fn();
  const mockTodo = getGetTodoResponseMock();

  beforeEach(() => {
    vi.clearAllMocks();
    closeDialogMock.mockReset();
    queryClient.setQueryData(["todos"], [mockTodo]);
  });

  const Component = (
    <DeleteTaskDialog closeDialog={closeDialogMock} data={mockTodo} />
  );

  it("renders the dialog with title and description", () => {
    renderWithClient(queryClient, Component);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("This will permanently delete the task.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
  });

  it("calls closeDialog when the cancel button is clicked", async() => {
    renderWithClient(queryClient, Component);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);

    expect(closeDialogMock).toHaveBeenCalledTimes(1);
  });

  it("removes the task handles query onSuccess logic", async() => {
    renderWithClient(queryClient, Component);

    const continueButton = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueButton);

    await waitFor(() => {
      const todos = queryClient.getQueryData<Array<typeof mockTodo>>(["todos"]);

      expect(todos?.length).toBe(0);
    }, { timeout: 2000 });

    expect(closeDialogMock).toHaveBeenCalledTimes(1);
  });

  it("shows notification on API error and does not close dialog", async() => {
    renderWithClient(queryClient, Component);

    server.use(
      http.delete(`*/api/todos/${mockTodo.id}`, async() => HttpResponse.error(), { once: true })
    );

    const continueButton = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueButton);

    await waitFor(() => {
      expect(showNotificationMock).toHaveBeenCalledWith({
        appearance: "negative",
        title: "Something went wrong!",
        description: "Please try again later.",
      });
    });

    expect(closeDialogMock).not.toHaveBeenCalled();
  });
});
