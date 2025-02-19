import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Plus } from "lucide-react";
import { describe, it, expect } from "vitest";

import { IconButton } from "../../components";
import { setupStrictMode } from "../utils";

describe("IconButton", () => {
  setupStrictMode();

  describe("Basic Functionality", () => {
    it("should render with default classes", () => {
      render(
        <IconButton aria-label="Default button">
          <Plus />
        </IconButton>
      );

      const button = screen.getByLabelText(/Default button/i);

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(
        "radix-iconButton",
        "radix-iconButton--color_gray",
        "radix-iconButton--size_2"
      );
    });

    it("should render as a button element", () => {
      render(
        <IconButton aria-label="Button test">
          <Plus />
        </IconButton>
      );

      expect(screen.getByLabelText(/Button test/i).tagName).toBe("BUTTON");
    });
  });

  describe("Color Variations", () => {
    it.each([
      "indigo",
      "ruby",
      "orange",
      "grass",
      "gray",
    ])("should render %s color button", (color) => {
      render(
        <IconButton color={color as any} aria-label={`${color} button`}>
          <Plus />
        </IconButton>
      );

      const button = screen.getByLabelText(`${color} button`);
      expect(button).toHaveClass(`radix-iconButton--color_${color}`);
    });
  });

  describe("Size Variations", () => {
    it.each(["1", "2", "3"])("should render size %s button", (size) => {
      render(
        <IconButton size={size as any} aria-label={`Size ${size} button`}>
          <Plus />
        </IconButton>
      );

      const button = screen.getByLabelText(`Size ${size} button`);
      expect(button).toHaveClass(`radix-iconButton--size_${size}`);
    });
  });

  describe("Interactions", () => {
    it("should handle hover state", async() => {
      const user = userEvent.setup();
      render(
        <IconButton className="hover:bg-indigo-500" aria-label="Hover button">
          <Plus />
        </IconButton>
      );

      const button = screen.getByLabelText(/Hover button/i);
      await user.hover(button);

      expect(button).toHaveClass("hover:bg-indigo-500");
    });
  });

  describe("Edge Cases", () => {
    it("should merge custom classes", () => {
      render(
        <IconButton className="custom-class" aria-label="Custom class button">
          <Plus />
        </IconButton>
      );

      const button = screen.getByLabelText(/Custom class button/i);
      expect(button).toHaveClass("radix-iconButton", "custom-class");
    });

    it("should forward HTML attributes", () => {
      render(
        <IconButton data-testid="icon-button-id" title="Icon button tooltip">
          <Plus />
        </IconButton>
      );

      const button = screen.getByTestId("icon-button-id");
      expect(button).toHaveAttribute("title", "Icon button tooltip");
    });

    it("should forward ref correctly", () => {
      const reference = { current: null };
      render(
        <IconButton ref={reference} aria-label="Ref button">
          <Plus />
        </IconButton>
      );

      expect(reference.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("should handle complex children", () => {
      render(
        <IconButton aria-label="Complex button">
          <span data-testid="icon-child">Icon</span> Button
        </IconButton>
      );

      expect(screen.getByTestId("icon-child")).toBeInTheDocument();
      expect(screen.getByText(/Button/i)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have appropriate aria-label", () => {
      render(
        <IconButton aria-label="Accessible button">
          <Plus />
        </IconButton>
      );

      expect(screen.getByLabelText(/Accessible button/i)).toBeInTheDocument();
    });

    it("should accept aria attributes", () => {
      render(
        <IconButton aria-live="assertive" aria-label="Aria button">
          <Plus />
        </IconButton>
      );

      const button = screen.getByLabelText(/Aria button/i);
      expect(button).toHaveAttribute("aria-live", "assertive");
    });
  });
});
