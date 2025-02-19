import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { vi } from "vitest";

import ListItem from "@/components/TodoList/MobileView/ListItem";
import { getGetTodoResponseMock } from "@/gen/api";

vi.mock("@/components/TodoList/Status", () => ({
  __esModule: true,
  default: ({ status }: { status: string }) => (
    <div data-testid="status">{status}</div>
  ),
}));

vi.mock("@/components/TodoList/DeleteTaskButton", () => ({
  __esModule: true,
  default: () => <button type="button" data-testid="delete-task-btn">Delete</button>,
}));

vi.mock("@/components/TodoList/EditTaskButton", () => ({
  __esModule: true,
  default: () => <button type="button" data-testid="edit-task-btn">Edit</button>,
}));

describe("ListItem", () => {
  const todoMock = getGetTodoResponseMock({
    id: "1",
    name: "Test Task",
    createdAt: "2023-10-10T08:00:00Z",
    updatedAt: "2023-10-11T10:00:00Z",
    status: "in_progress",
  });

  it("renders the task details correctly in collapsed state", () => {
    render(<ListItem todo={todoMock} />);

    const collapsibleTrigger = screen.getByRole("button", { name: /test task/i });
    expect(collapsibleTrigger).toBeInTheDocument();

    expect(screen.getByTestId("status")).toHaveTextContent(todoMock.status);
    expect(screen.getByText("Test Task")).toBeInTheDocument();

    const collapsiblePanel = screen.getByRole("group", { hidden: true });
    expect(collapsiblePanel).toBeInTheDocument();

    expect(collapsiblePanel).toHaveClass("radix-collapsible__panel--expanded_false");
  });

  it("expands and shows details on trigger click", async() => {
    const user = userEvent.setup();
    render(<ListItem todo={todoMock} />);

    const collapsibleTrigger = screen.getByRole("button");

    const collapsiblePanel = screen.getByRole("group", { hidden: true });
    expect(collapsiblePanel).toBeInTheDocument();

    expect(collapsiblePanel).toHaveClass("radix-collapsible__panel--expanded_false");

    await user.click(collapsibleTrigger);

    expect(collapsiblePanel).toHaveClass("radix-collapsible__panel--expanded_true");

    expect(screen.getByText(dayjs(todoMock.createdAt).format("lll"))).toBeInTheDocument();
    expect(screen.getByText(dayjs(todoMock.updatedAt).format("lll"))).toBeInTheDocument();

    expect(screen.getByTestId("delete-task-btn")).toBeInTheDocument();
    expect(screen.getByTestId("edit-task-btn")).toBeInTheDocument();
  });

  it("renders DeleteTaskButton and EditTaskButton", () => {
    render(<ListItem todo={todoMock} />);

    expect(screen.getByTestId("delete-task-btn")).toBeInTheDocument();
    expect(screen.getByTestId("edit-task-btn")).toBeInTheDocument();
  });
});
