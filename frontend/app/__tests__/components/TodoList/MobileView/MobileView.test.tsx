import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import MobileView from "@/components/TodoList/MobileView";
import { getGetTodoResponseMock } from "@/gen/api";

vi.mock("@/components/TodoList/MobileView/ListItem", () => ({
  __esModule: true,
  default: ({ todo }: { todo: any }) => (
    <div data-testid="list-item">{todo.name}</div>
  ),
}));

describe("MobileView", () => {
  const todosMock = [
    getGetTodoResponseMock({ id: "1", name: "Task One", status: "in_progress" }),
    getGetTodoResponseMock({ id: "2", name: "Task Two", status: "ready_to_start" }),
  ];

  it("renders a list of todos as ListItem components", () => {
    render(<MobileView todos={todosMock} />);

    expect(screen.getAllByTestId("list-item")).toHaveLength(todosMock.length);

    expect(screen.getByText("Task One")).toBeInTheDocument();
    expect(screen.getByText("Task Two")).toBeInTheDocument();
  });

  it("renders nothing when todos are not provided", () => {
    render(<MobileView todos={[]} />);

    expect(screen.queryByTestId("list-item")).not.toBeInTheDocument();
  });

  it("renders nothing when todos is undefined", () => {
    render(<MobileView todos={undefined} />);

    expect(screen.queryByTestId("list-item")).not.toBeInTheDocument();
  });
});
