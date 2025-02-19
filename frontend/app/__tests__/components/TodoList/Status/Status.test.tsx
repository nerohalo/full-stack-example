import { render, screen } from "@testing-library/react";

import { TodoStatus } from "@/gen/types";

import Status from "@/components/TodoList/Status";

vi.mock("@/components/TodoList/Status/Status.css.ts", () => ({
  badge: "mock-badge-class",
}));

describe("Status", () => {
  it("renders the transformed status text", () => {
    render(<Status status={TodoStatus.done} />);

    expect(screen.getByText("done")).toBeInTheDocument();
  });

  it("applies the correct color for `done` status", () => {
    render(<Status status={TodoStatus.done} />);

    const badge = screen.getByText("done");
    expect(badge).toHaveClass(
      "radix-badge",
      "radix-badge--size_2",
      "xs:radix-badge--size_3",
      "radix-badge--color_grass",
      "mock-badge-class"
    );
  });

  it("applies the correct color for `ready_to_start` status", () => {
    render(<Status status={TodoStatus.ready_to_start} />);

    const badge = screen.getByText("ready to start");
    expect(badge).toHaveClass(
      "radix-badge",
      "radix-badge--size_2",
      "xs:radix-badge--size_3",
      "radix-badge--color_gray",
      "mock-badge-class"
    );
  });

  it("applies the correct color for `in_progress` status", () => {
    render(<Status status={TodoStatus.in_progress} />);

    const badge = screen.getByText("in progress");
    expect(badge).toHaveClass(
      "radix-badge",
      "radix-badge--size_2",
      "xs:radix-badge--size_3",
      "radix-badge--color_indigo",
      "mock-badge-class"
    );
  });

  it("applies the correct classes", () => {
    render(<Status status={TodoStatus.done} />);

    const badge = screen.getByText("done");
    expect(badge).toHaveClass("mock-badge-class");
  });
});
