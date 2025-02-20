import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Text } from "../../components";
import { setupStrictMode } from "../utils";

describe("Text", () => {
  setupStrictMode();

  describe("Basic Functionality", () => {
    it("should render with default classes", () => {
      render(<Text>Default text</Text>);

      // Verify the text content and default CSS classes
      const textElement = screen.getByText(/Default text/i);
      expect(textElement).toBeInTheDocument();
      expect(textElement).toHaveClass(
        "radix-text",
        "radix-text--size_3",
        "radix-text--color_inherit",
        "radix-text--weight_regular"
      );
    });

    it("should render as a span element", () => {
      render(<Text>Test</Text>);

      expect(screen.getByText(/Test/i).tagName).toBe("SPAN");
    });
  });

  describe("Color Variations", () => {
    it.each(["indigo", "ruby", "orange", "grass", "gray"])(
      "should render with %s color",
      (color) => {
        render(<Text color={color as any}>{color} text</Text>);

        // Verify that the element has correct class
        const textElement = screen.getByText(`${color} text`);
        expect(textElement).toHaveClass(`radix-text--color_${color}`);
      }
    );
  });

  describe("Size Variations", () => {
    it.each(["1", "2", "3"])("should render with size %s", (size) => {
      render(<Text size={size as any}>{`Size ${size}`}</Text>);

      // Verify that the element has correct class
      const textElement = screen.getByText(`Size ${size}`);
      expect(textElement).toHaveClass(`radix-text--size_${size}`);
    });
  });

  describe("Weight Variations", () => {
    it.each(["thin", "regular", "bold"])("should render weight %s", (weight) => {
      render(<Text weight={weight as any}>{weight} text</Text>);

      // Verify that the element has correct class
      const textElement = screen.getByText(`${weight} text`);
      expect(textElement).toHaveClass(`radix-text--weight_${weight}`);
    });
  });

  describe("Alignment Variations", () => {
    it.each(["left", "center", "right"])(
      "should render with %s alignment",
      (align) => {
        render(<Text align={align as any}>{`Aligned ${align}`}</Text>);

        // Verify that the element has correct class
        const textElement = screen.getByText(`Aligned ${align}`);
        expect(textElement).toHaveClass(`radix-text--align_${align}`);
      }
    );
  });

  describe("Edge Cases", () => {
    it("should merge custom classes", () => {
      render(<Text className="custom-class">Custom Text</Text>);

      // Verify that the custom css class is merged
      const textElement = screen.getByText(/Custom Text/i);
      expect(textElement).toHaveClass("radix-text", "custom-class");
    });

    it("should forward HTML attributes", () => {
      render(
        <Text data-testid="text-id" title="Text tooltip">
          Text with attributes
        </Text>
      );

      // Verify that the custom HTML attribute is forwarded correctly
      const textElement = screen.getByTestId("text-id");
      expect(textElement).toHaveAttribute("title", "Text tooltip");
    });

    it("should forward ref correctly", () => {
      const ref = { current: null };

      render(
        <Text ref={ref}>
          Text with ref
        </Text>
      );

      // Verify that a ref is forwarded correctly and points to the rendered element
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("should handle complex children", () => {
      render(
        <Text>
          <span data-testid="child">Child Text</span> and more text.
        </Text>
      );

      // Verify that the complex children are rendered correctly
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText(/and more text/i)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should accept aria attributes", () => {
      render(<Text aria-live="polite">Accessible text</Text>);

      // Verify that ARIA attributes are passed
      const accessibleText = screen.getByText(/Accessible text/i);
      expect(accessibleText).toHaveAttribute("aria-live", "polite");
    });

    it("should have proper role when provided", () => {
      render(<Text role="status">Status text</Text>);

      // Verify that the appropriate role is assigned
      const roleText = screen.getByRole("status");
      expect(roleText).toBeInTheDocument();
    });
  });
});
