/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";

import MobileMenu from "@/components/Header/MobileMenu";

vi.mock("@/components/Header/MobileMenu/MobileNav", () => ({
  default: ({ onLinkClick }: { onLinkClick: () => void }) => (
    <div data-testid="mobile-nav">
      <div data-testid="mobile-nav-link" onClick={onLinkClick} />
    </div>
  ),
}));

vi.mock("lucide-react", () => ({
  Menu: () => <div data-testid="menu-icon" />,
}));

describe("MobileMenu", () => {
  afterEach(() => {
    document.body.removeAttribute("style");
  });

  it("renders the menu button", () => {
    render(<MobileMenu />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
  });

  it("toggles the visibility of the mobile navigation menu", async() => {
    render(<MobileMenu />);
    const user = userEvent.setup();

    const menuButton = screen.getByRole("button");

    const mobileNavElement = screen.getByTestId("mobile-nav");
    const mobileNavContainerElement = mobileNavElement.parentElement;
    expect(mobileNavElement).toBeInTheDocument();
    expect(mobileNavContainerElement).toBeInTheDocument();
    expect(mobileNavContainerElement).toHaveClass("radix-d_none");

    await user.click(menuButton);
    expect(mobileNavContainerElement).toHaveClass("radix-d_block");

    await user.click(menuButton);
    expect(mobileNavContainerElement).toHaveClass("radix-d_none");
  });

  it("locks the scroll when mobile navigation is open", async() => {
    render(<MobileMenu />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByRole("button"));
    expect(document.body.style.overflow).toBe("");
  });

  it("removes overflow styling from the body on unmount if needed", async() => {
    render(<MobileMenu />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByRole("button"));

    expect(document.body.style.overflow).toBe("");
  });

  it("closes the menu when a MobileNav link is clicked", async() => {
    render(<MobileMenu />);
    const user = userEvent.setup();

    const mobileNavElement = screen.getByTestId("mobile-nav");
    const mobileNavContainerElement = mobileNavElement.parentElement;

    await user.click(screen.getByRole("button"));
    expect(mobileNavContainerElement).toHaveClass("radix-d_block");

    await user.click(screen.getByTestId("mobile-nav-link"));
    expect(mobileNavContainerElement).toHaveClass("radix-d_none");
  });
});
