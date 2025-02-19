import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Plus } from "lucide-react";
import { describe, it, expect, vi } from "vitest";

import { Button } from "../../components";
import { setupStrictMode } from "../utils";

describe("Button", () => {
  setupStrictMode();

  it("should render a button with correct default classes", () => {
    render(<Button>it works</Button>);
    const element = screen.getByText(/it works/i);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(
      "radix-button",
      "radix-button--color_gray",
      "radix-button--fluid_false",
      "radix-button--size_2"
    );
  });

  it.each([true, false])("should handle fluid=%s", (fluidValue) => {
    render(<Button fluid={fluidValue}>it works</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      `radix-button--fluid_${fluidValue}`
    );
  });

  it.each(["indigo", "ruby", "orange", "grass", "gray"])(
    "should render %s color",
    (color) => {
      render(<Button color={color as any}>it works</Button>);
      expect(screen.getByRole("button")).toHaveClass(
        `radix-button--color_${color}`
      );
    }
  );

  it.each(["1", "2", "3"])("should handle size=%s", (size) => {
    render(<Button size={size as any}>it works</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      `radix-button--size_${size}`
    );
  });

  it("should render button with icon", () => {
    render(
      <Button>
        <Plus data-testid="icon" />
        it works
      </Button>
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByRole("button")).toContainElement(
      screen.getByTestId("icon")
    );
  });

  describe("Interactions", () => {
    it("should handle clicks", async() => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onPress={handleClick}>Click me</Button>);

      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard navigation", async() => {
      const user = userEvent.setup();
      const handlePress = vi.fn();

      render(<Button onPress={handlePress}>Test</Button>);

      const button = screen.getByRole("button");
      await user.tab();
      expect(button).toHaveFocus();

      await user.keyboard("[Enter]");
      await user.keyboard("[Space]");
      expect(handlePress).toHaveBeenCalledTimes(2);
    });

    it("should not respond when disabled", async() => {
      const user = userEvent.setup();
      const handlePress = vi.fn();

      render(
        <Button isDisabled onPress={handlePress}>
          Disabled
        </Button>
      );

      const button = screen.getByRole("button");
      await user.click(button);
      await user.keyboard("[Enter]");

      expect(handlePress).not.toHaveBeenCalled();
      expect(button).toBeDisabled();
    });
  });

  it("should forward ref correctly", () => {
    const ref = { current: null };
    render(<Button ref={ref}>Test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("merges custom classes with recipe classes", () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "radix-button",
      "custom-class"
    );
  });

  it("handles multiple prop combinations", () => {
    render(
      <Button color="ruby" size="3" fluid className="combined">
        Test
      </Button>
    );

    expect(screen.getByRole("button")).toHaveClass(
      "radix-button--color_ruby",
      "radix-button--size_3",
      "radix-button--fluid_true",
      "combined"
    );
  });

  it("has proper aria attributes when loading", () => {
    render(<Button aria-busy="true">Loading</Button>);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-busy",
      "true"
    );
  });
});
