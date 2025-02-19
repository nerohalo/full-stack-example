import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mock, vi } from "vitest";

import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/providers";

const setThemeMock = vi.fn();

vi.mock("@/providers", () => ({
  useTheme: vi.fn(() => ({
    theme: "dark",
    setTheme: setThemeMock,
  })),
}));

vi.mock("lucide-react", () => ({
  Sun: () => <svg data-testid="theme-toggle-icon">Sun</svg>,
  Moon: () => <svg data-testid="theme-toggle-icon">Moon</svg>,
}));

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the correct icon for the dark theme", () => {
    render(<ThemeToggle />);

    expect(screen.getByTestId("theme-toggle-icon")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle-icon")).toContainHTML("Sun");
  });

  it("should render the correct icon for the light theme", () => {
    (useTheme as Mock).mockReturnValueOnce({
      theme: "light",
      setTheme: setThemeMock,
    });

    render(<ThemeToggle />);

    expect(screen.getByTestId("theme-toggle-icon")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle-icon")).toContainHTML("Moon");
  });

  it("should toggle the theme when the button is clicked", async() => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(setThemeMock).toHaveBeenCalledTimes(1);
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  it("should display the tooltip text", async() => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.hover(screen.getByRole("button"));

    expect(screen.getByText("set to light mode")).toBeInTheDocument();
  });

  it("should pass custom props to the IconButton", () => {
    render(<ThemeToggle size="1" color="indigo" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "radix-iconButton",
      "radix-iconButton--color_indigo",
      "radix-iconButton--size_1"
    );
  });
});
