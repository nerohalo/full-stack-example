import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotificationsProvider } from "design-system";
import { http, HttpResponse } from "msw";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { Todo } from "@/gen/types";

import { server } from "@/__tests__/utils";
import { createTestQueryClient, renderWithClient } from "@/__tests__/utils";
import EditTaskForm from "@/components/dialogs/EditTaskDialog/EditTaskForm";
import { getGetTodoResponseMock, getUpdateTodoResponseMock } from "@/gen/api";

const showNotificationMock = vi.fn();

vi.mock("design-system", async(importOriginal) => ({
  ...await importOriginal<typeof import("design-system")>(),
  useNotification: vi.fn(() => ({
    showNotification: showNotificationMock,
  })),
}));

describe("EditTaskForm", () => {
  const queryClient = createTestQueryClient();
  const mockTodo = getGetTodoResponseMock({ status: "done" });

  queryClient.setQueryData(["todos"], [mockTodo]);

  const closeDialogMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    closeDialogMock.mockReset();
  });

  const Component = (
    <NotificationsProvider>
      <EditTaskForm data={mockTodo} closeDialog={closeDialogMock} />
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

    it("renders the inputs with correct values", () => {
      renderWithClient(queryClient, Component);

      const textFieldElement = screen.getByRole("textbox", { name: /Task name/i });
      const selectElement = screen.getByRole("button", { name: /Status/i });

      expect(textFieldElement).toBeInTheDocument();
      expect(selectElement).toBeInTheDocument();

      expect(textFieldElement).toHaveValue(mockTodo.name);
      expect(selectElement.firstElementChild?.innerHTML)
        .toBe(mockTodo.status[0].toUpperCase() + mockTodo.status.slice(1));
    });

    it("should have disabled save button if form is dirty", () => {
      renderWithClient(queryClient, Component);

      const saveButton = screen.getByRole("button", { name: /Save/i });

      expect(saveButton).toBeDisabled();
    });
  });

  describe("Validation", () => {
    it("displays validation error when task name is missing", async() => {
      renderWithClient(queryClient, Component);

      const textFieldElement = screen.getByRole("textbox", { name: /Task name/i });

      await userEvent.clear(textFieldElement);

      const saveButton = screen.getByRole("button", { name: /save/i });
      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText("String must contain at least 3 character(s)")).toBeInTheDocument();
      });
    });

    it("removes validation error once valid data is entered", async() => {
      renderWithClient(queryClient, Component);

      const textFieldElement = screen.getByRole("textbox", { name: /Task name/i });

      await userEvent.clear(textFieldElement);

      const saveButton = screen.getByRole("button", { name: /save/i });
      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText("String must contain at least 3 character(s)")).toBeInTheDocument();
      });

      await userEvent.type(textFieldElement, "New Task");

      await waitFor(() => {
        expect(screen.queryByText("String must contain at least 3 character(s)")).not.toBeInTheDocument();
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

      server.use(
        http.patch("*/api/todos/:id", async(info) => {
          const requestBody = await info.request.json();

          return new HttpResponse(
            JSON.stringify(getUpdateTodoResponseMock({ ...mockTodo, ...requestBody as Partial<Todo> })),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }, { once: true })
      );

      const textFieldElement = screen.getByRole("textbox", { name: /Task name/i });
      await userEvent.clear(textFieldElement);
      await userEvent.type(textFieldElement, "My new task");

      const saveButton = screen.getByRole("button", { name: /Save/i });
      await userEvent.click(saveButton);

      await waitFor(() => {
        const todos = queryClient.getQueryData<Array<Todo>>(["todos"]) as Array<Todo>;

        expect(todos[0]).toMatchObject(getGetTodoResponseMock({ ...mockTodo, name: "My new task" }));
      }, { timeout: 2000 });

      await waitFor(() => {
        expect(closeDialogMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Error Handling", () => {
    it("shows notification on API error (mocked failure case)", async() => {
      server.use(
        http.patch(`*/api/todos/${mockTodo.id}`, async() => HttpResponse.error(), { once: true })
      );

      renderWithClient(queryClient, Component);

      const textFieldElement = screen.getByRole("textbox", { name: /Task name/i });
      await userEvent.type(textFieldElement, "My new task");

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
