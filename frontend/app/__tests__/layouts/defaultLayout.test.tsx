import { render, screen } from "@testing-library/react";
import { Route, Routes, MemoryRouter } from "react-router";
import { describe, it, expect, vi } from "vitest";

import DefaultLayout from "@/layouts/defaultLayout";

vi.mock("@/components/Header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));

describe("DefaultLayout", () => {
  const renderWithRouter = (initialEntries = ["/"]) =>
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<div data-testid="outlet-content">Test</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

  it("renders header and outlet content", () => {
    const { container } = renderWithRouter();

    expect(screen.getByTestId("header")).toBeInTheDocument();

    const mainStack = container.querySelector("#main-content");
    expect(mainStack).toBeInTheDocument();
    expect(mainStack).toHaveClass(
      "radix-d_flex",
      "radix-flex-d_column",
      "radix-gap_10px",
      "radix-h_100%",
      "radix-pos_relative",
      "radix-ov-y_auto"
    );
    expect(screen.getByTestId("outlet-content")).toBeInTheDocument();
  });

  it("matches layout snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <DefaultLayout />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
