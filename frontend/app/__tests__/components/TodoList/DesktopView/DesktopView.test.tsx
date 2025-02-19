import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { vi } from "vitest";

import DesktopView from "@/components/TodoList/DesktopView";
import { getGetTodoResponseMock } from "@/gen/api";

vi.mock("@/components/AddListItem", () => ({
  __esModule: true,
  default: () => <div data-testid="add-list-item" />,
}));

vi.mock("@/components/TodoList/Status", () => ({
  __esModule: true,
  default: ({ status }: { status: string }) => (
    <div data-testid="status">{`Status: ${status}`}</div>
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

describe("DesktopView", () => {
  const todosMock = [
    getGetTodoResponseMock({
      id: "1",
      name: "Task One",
      status: "in_progress",
      createdAt: "2023-10-10T08:00:00Z",
      updatedAt: "2023-10-11T10:00:00Z",
    }),
    getGetTodoResponseMock({
      id: "2",
      name: "Task Two",
      status: "ready_to_start",
      createdAt: "2023-10-09T08:00:00Z",
      updatedAt: "2023-10-10T10:00:00Z",
    }),
  ];

  it("renders the table with columns and rows", () => {
    render(<DesktopView todos={todosMock} />);

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Task name")).toBeInTheDocument();
    expect(screen.getByText("Created at")).toBeInTheDocument();
    expect(screen.getByText("Updated at")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    expect(screen.getByText("Task One")).toBeInTheDocument();
    expect(screen.getByText("Task Two")).toBeInTheDocument();

    expect(screen.getAllByTestId("status")[0]).toHaveTextContent("Status: ready_to_start");
    expect(screen.getAllByTestId("status")[1]).toHaveTextContent("Status: in_progress");

    expect(screen.getAllByTestId("delete-task-btn")).toHaveLength(2);
    expect(screen.getAllByTestId("edit-task-btn")).toHaveLength(2);
  });

  it("renders correctly without todos", () => {
    render(<DesktopView todos={[]} />);

    expect(screen.queryByText("Task One")).not.toBeInTheDocument();
    expect(screen.queryByText("Task Two")).not.toBeInTheDocument();
  });

  it("renders AddListItem at the bottom", () => {
    render(<DesktopView todos={todosMock} />);

    expect(screen.getByTestId("add-list-item")).toBeInTheDocument();
  });

  it("renders correctly formatted dates", () => {
    render(<DesktopView todos={todosMock} />);

    expect(screen.getByText(dayjs(todosMock[0].createdAt).format("lll"))).toBeInTheDocument();
    expect(screen.getByText(dayjs(todosMock[0].updatedAt).format("lll"))).toBeInTheDocument();
    expect(screen.getByText(dayjs(todosMock[1].createdAt).format("lll"))).toBeInTheDocument();
    expect(screen.getByText(dayjs(todosMock[1].updatedAt).format("lll"))).toBeInTheDocument();
  });

  it("sorts descending and ascending rows when column header is toggled", async() => {
    const user = userEvent.setup();

    render(<DesktopView todos={todosMock} />);

    let rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("ready_to_start");
    expect(rows[2]).toHaveTextContent("in_progress");

    const statusColumn = screen.getByText("Status");
    await user.click(statusColumn);

    rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("in_progress");
    expect(rows[2]).toHaveTextContent("ready_to_start");

    await user.click(statusColumn);

    rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("ready_to_start");
    expect(rows[2]).toHaveTextContent("in_progress");
  });
});
