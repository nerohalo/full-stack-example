import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Dashboard from "@/routes/dashboard";

vi.mock("@/components/TodoList", () => ({
  default: () => <div data-testid="todo-list" />,
}));

describe("Dashboard Component", () => {
  it("should render TodoList component", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
  });

  it("should apply correct layout structure", () => {
    const { container } = render(<Dashboard />);

    const stackDiv = container.firstChild as HTMLElement;
    expect(stackDiv).toHaveClass(
      "radix-d_flex",
      "radix-flex-d_column",
      "radix-gap_4"
    );
  });
});
