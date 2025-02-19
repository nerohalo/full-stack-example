import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotificationsProvider } from "design-system";
import { http, HttpResponse } from "msw";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { Todo } from "@/gen/types";

import { server } from "@/__tests__/utils";
import { createTestQueryClient, renderWithClient } from "@/__tests__/utils";
import AddTaskForm from "@/components/dialogs/AddTaskDialog/AddTaskForm";

const showNotificationMock = vi.fn();

vi.mock("design-system", async(importOriginal) => ({
  ...await importOriginal<typeof import("design-system")>(),
  useNotification: vi.fn(() => ({
    showNotification: showNotificationMock,
  })),
}));

describe("AddTaskForm", () => {
  const queryClient = createTestQueryClient();
  queryClient.setQueryData(["todos"], []);
  const closeDialogMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    closeDialogMock.mockReset();
  });

  /**
   * Helper function: Fill and interact with the form.
   */
  const fillForm = async({
    taskName,
    status,
  }: { taskName?: string, status?: string } = {}) => {
    if (taskName) {
      const nameInput = screen.getByLabelText(/task name/i);
      await userEvent.type(nameInput, taskName);
    }
    if (status) {
      const statusSelect = screen.getByLabelText(/status/i);
      await userEvent.click(statusSelect);
      const option = screen.getAllByText(new RegExp(status, "i"))[1];
      await userEvent.click(option);
    }
  };

  const Component = (
    <NotificationsProvider>
      <AddTaskForm closeDialog={closeDialogMock} />
    </NotificationsProvider>
  );

  describe("Rendering", () => {
    it("renders the form with all fields and buttons", () => {
      renderWithClient(queryClient, Component);

      expect(screen.getByLabelText(/task name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    });
  });

  describe("Validation", () => {
    it("displays validation errors when task name is missing", async() => {
      renderWithClient(queryClient, Component);

      const saveButton = screen.getByRole("button", { name: /save/i });
      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(screen.getAllByText(/Required/i)[0]).toBeInTheDocument();
      });
    });

    it("displays validation errors when status is missing", async() => {
      renderWithClient(queryClient, Component);

      await fillForm({ taskName: "Valid Task Name" });

      const saveButton = screen.getByRole("button", { name: /save/i });
      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(/Required/i)).toBeInTheDocument();
      });
    });

    it("removes validation error once valid data is entered", async() => {
      renderWithClient(queryClient, Component);

      const saveButton = screen.getByRole("button", { name: /save/i });
      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(screen.getAllByText(/Required/i)[0]).toBeInTheDocument();
      });

      await fillForm({ taskName: "New Task", status: "Done" });

      await waitFor(() => {
        expect(screen.queryByText(/Required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe("Form Interactions", () => {
    it("calls closeDialog when cancel button is clicked", async() => {
      renderWithClient(queryClient, Component);

      const cancelButton = screen.getByRole("button", { name: /cancel/i });
      await userEvent.click(cancelButton);

      expect(closeDialogMock).toHaveBeenCalledTimes(1);
    });

    it("submits the form successfully and handles query onSuccess logic", async() => {
      renderWithClient(queryClient, Component);

      const todos = queryClient.getQueryData<Array<Todo>>(["todos"]);
      expect(todos?.length).toBe(0);

      await fillForm({ taskName: "My new task", status: "Done" });

      const saveButton = screen.getByRole("button", { name: /Save/i });
      await userEvent.click(saveButton);

      await waitFor(() => {
        const todos = queryClient.getQueryData<Array<Todo>>(["todos"]);

        expect(todos?.length).toBe(1);
      }, { timeout: 2000 });

      await waitFor(() => {
        expect(closeDialogMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Error Handling", () => {
    it("shows notification on API error (mocked failure case)", async() => {
      server.use(
        http.post("*/api/todos", async() => HttpResponse.error(), { once: true })
      );

      renderWithClient(queryClient, <AddTaskForm closeDialog={closeDialogMock} />);

      await fillForm({ taskName: "My new task", status: "Done" });

      const saveButton = screen.getByRole("button", { name: /save/i });
      await userEvent.click(saveButton);

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
});
