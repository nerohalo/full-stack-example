import { render, screen } from "@testing-library/react";

import Header from "@/components/Header";

vi.mock("@/components/AddListItem", () => ({
  default: () => <div data-testid="add-list-item" />,
}));

vi.mock("@/components/Header/DesktopNav", () => ({
  default: () => <div data-testid="desktop-nav" />,
}));

vi.mock("@/components/Header/MobileMenu", () => ({
  default: () => <div data-testid="mobile-menu" />,
}));

vi.mock("@/components/ThemeToggle", () => ({
  default: () => <div data-testid="theme-toggle" />,
}));

describe("Header", () => {
  it("renders the DesktopNav component", () => {
    render(<Header />);
    expect(screen.getByTestId("desktop-nav")).toBeInTheDocument();
  });

  it("renders the AddListItem component", () => {
    render(<Header />);
    const addListItem = screen.getByTestId("add-list-item");

    expect(addListItem).toBeInTheDocument();
  });

  it("renders the ThemeToggle component", () => {
    render(<Header />);
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("renders the MobileMenu component", () => {
    render(<Header />);
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });
});
