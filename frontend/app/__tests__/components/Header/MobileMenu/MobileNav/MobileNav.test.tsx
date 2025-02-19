import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import MobileNav from "@/components/Header/MobileMenu/MobileNav";

vi.mock("react-router", () => ({
  ...vi.importActual("react-router"),
  NavLink: ({ to, className, children, onClick }: any) => {
    const isActive = window.location.pathname === to;

    return (
      <a
        href={to}
        className={className({ isActive })}
        data-testid={`navlink-${to}`}
        onClick={onClick}
      >
        {children}
      </a>
    );
  },
}));

vi.mock("@/components/Header/MobileMenu/MobileNav/MobileNav.css.ts", () => ({
  container: "mobile-nav-container",
  link: ({ isActive }: { isActive: boolean }) =>
    isActive ? "active-link" : "inactive-link",
}));

describe("MobileNav", () => {
  const onLinkClick = vi.fn();

  beforeEach(() => {
    onLinkClick.mockClear();
    window.history.pushState({}, "Test Page", "/");
  });

  it("renders navigation links", () => {
    render(<MobileNav />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("about")).toBeInTheDocument();
  });

  it("applies `active` class to the link matching the current route", () => {
    window.history.pushState({}, "Test Page", "/");

    const { rerender } = render(<MobileNav />);

    expect(screen.getByText("Home")).toHaveClass("active-link");
    expect(screen.getByText("about")).toHaveClass("inactive-link");

    window.history.pushState({}, "About Page", "/about");

    rerender(<MobileNav />);

    expect(screen.getByText("about")).toHaveClass("active-link");
    expect(screen.getByText("Home")).toHaveClass("inactive-link");
  });

  it("calls `onLinkClick` when a navigation link is clicked", async() => {
    const user = userEvent.setup();
    render(<MobileNav onLinkClick={onLinkClick} />);

    await user.click(screen.getByTestId("navlink-/about"));

    expect(onLinkClick).toHaveBeenCalled();

    await user.click(screen.getByTestId("navlink-/"));

    expect(onLinkClick).toHaveBeenCalled();
  });

  it("does not throw errors when `onLinkClick` is undefined", async() => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByText("about"));

    await user.click(screen.getByText("Home"));
  });
});
