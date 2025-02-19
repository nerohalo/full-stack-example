import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { Badge } from "../../components";
import { setupStrictMode } from "../utils";

describe("Badge", () => {
  setupStrictMode();

  describe("Basic Functionality", () => {
    it("should render with default classes", () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText(/Default/i);

      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass(
        "radix-badge",
        "radix-badge--size_3",
        "radix-badge--color_gray"
      );
    });

    it("should render as a span element", () => {
      render(<Badge>Test</Badge>);
      expect(screen.getByText(/Test/i).tagName).toBe("SPAN");
    });
  });

  describe("Color Variations", () => {
    it.each([
      "indigo",
      "ruby",
      "orange",
      "grass",
      "gray",
    ])("should render %s color", (color) => {
      render(<Badge color={color as any}>{color} badge</Badge>);
      expect(screen.getByText(`${color} badge`)).toHaveClass(
        `radix-badge--color_${color}`
      );
    });
  });

  describe("Size Variations", () => {
    it.each(["1", "2", "3"])("should render size %s", (size) => {
      render(<Badge size={size as any}>Size {size}</Badge>);
      const badge = screen.getByText(`Size ${size}`);

      expect(badge).toHaveClass(`radix-badge--size_${size}`);
    });
  });

  describe("Interactions", () => {
    it("should handle hover state", async() => {
      const user = userEvent.setup();
      render(<Badge className="hover:bg-red-500">Hover me</Badge>);

      const badge = screen.getByText(/Hover me/i);
      await user.hover(badge);

      expect(badge).toHaveClass("hover:bg-red-500");
    });
  });

  describe("Edge Cases", () => {
    it("should merge custom classes", () => {
      render(<Badge className="custom-class">Test</Badge>);
      expect(screen.getByText(/Test/i)).toHaveClass(
        "radix-badge",
        "custom-class"
      );
    });

    it("should forward HTML attributes", () => {
      render(
        <Badge data-testid="badge-id" title="Badge tooltip">
          Test
        </Badge>
      );

      const badge = screen.getByTestId("badge-id");
      expect(badge).toHaveAttribute("title", "Badge tooltip");
    });

    it("should forward ref correctly", () => {
      const ref = { current: null };
      render(<Badge ref={ref}>Test</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("should handle complex children", () => {
      render(
        <Badge>
          <span data-testid="child">Complex</span> Content
        </Badge>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText(/Content/i)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper role when interactive", () => {
      render(<Badge role="status">Status</Badge>);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("should accept aria attributes", () => {
      render(<Badge aria-live="polite">Loading</Badge>);
      expect(screen.getByText(/Loading/i)).toHaveAttribute(
        "aria-live",
        "polite"
      );
    });
  });
});
