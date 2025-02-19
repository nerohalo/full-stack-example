import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import DesktopNav from "@/components/Header/DesktopNav";

vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  NavLink: ({ to, className, children }: any) => {
    const isActive = window.location.pathname === to;

    return (
      <a
        href={to}
        className={className({ isActive })}
        data-testid={`navlink-${to}`}
      >
        {children}
      </a>
    );
  },
}));

vi.mock("@/components/Header/DesktopNav/DesktopNav.css.ts", () => ({
  container: "desktop-nav-container",
  link: ({ isActive }: { isActive: boolean }) =>
    isActive ? "active-link" : "inactive-link",
}));

describe("DesktopNav", () => {
  it("renders navigation links", () => {
    render(<DesktopNav />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("about")).toBeInTheDocument();
  });

  it("applies the `active` class to the link matching the current route", () => {
    window.history.pushState({}, "Test Page", "/");

    render(<DesktopNav />);

    expect(screen.getByText("Home")).toHaveClass("active-link");
    expect(screen.getByText("about")).toHaveClass("inactive-link");
  });

  it("updates the active class when navigating to a different route", async() => {
    const user = userEvent.setup();

    window.history.pushState({}, "Test Page", "/");

    const { rerender } = render(<DesktopNav />);

    expect(screen.getByText("Home")).toHaveClass("active-link");
    expect(screen.getByText("about")).toHaveClass("inactive-link");

    await user.click(screen.getByText("about"));
    window.history.pushState({}, "Test Page", "/about");

    rerender(<DesktopNav />);

    expect(screen.getByText("Home")).toHaveClass("inactive-link");
    expect(screen.getByText("about")).toHaveClass("active-link");
  });
});
