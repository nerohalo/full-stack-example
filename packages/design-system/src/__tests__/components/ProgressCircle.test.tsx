import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { ProgressCircle } from "../../components";
import { setupStrictMode } from "../utils";

describe("ProgressCircle", () => {
  setupStrictMode();

  describe("Basic Functionality", () => {
    it("should render with default classes and attributes", () => {
      render(<ProgressCircle value={50} size="2" color="gray" />);
      const svg = screen.getByRole("progressbar", { hidden: true });

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("aria-valuemin", "0");
      expect(svg).toHaveAttribute("aria-valuemax", "100");
      expect(svg).toHaveAttribute("aria-valuenow", "50");
    });

    it("should render as an SVG element", () => {
      render(<ProgressCircle value={70} aria-label="progress-circle" />);
      const svg = screen.getByLabelText(/progress-circle/i);

      expect(svg.tagName).toBe("svg");
    });
  });

  describe("Color Variations", () => {
    it.each(["gray", "indigo", "ruby", "orange", "green"])(
      "should render with %s color",
      (color) => {
        render(<ProgressCircle value={80} color={color as any} />);
        const svg = screen.getByRole("progressbar", { hidden: true });
        expect(svg).toHaveClass(
          "radix-progressCircle__root",
          `radix-progressCircle__root--color_${color}`,
          "radix-progressCircle__root--size_2",
          "radix-progressCircle__root--isIndeterminate_true"
        );
      }
    );
  });

  describe("Size Variations", () => {
    it.each(["1", "2", "3"])("should support size %s", (size) => {
      render(<ProgressCircle value={40} size={size as any} />);
      const svg = screen.getByRole("progressbar", { hidden: true });
      expect(svg).toHaveClass(
        "radix-progressCircle__root",
        "radix-progressCircle__root--color_gray",
        `radix-progressCircle__root--size_${size}`,
        "radix-progressCircle__root--isIndeterminate_true"
      );
    });
  });

  describe("Edge Cases", () => {
    it("should allow custom stroke width", () => {
      render(<ProgressCircle circleStrokeWidth={6} value={65} />);
      const track = screen.getAllByRole("presentation", { hidden: true })[1];
      expect(track).toHaveAttribute("stroke-width", "6");
    });

    it("should have default aria attributes if value is undefined (indeterminate)", () => {
      render(<ProgressCircle />);
      const svg = screen.getByRole("progressbar", { hidden: true });
      expect(svg).not.toHaveAttribute("aria-valuenow");
    });
  });

  describe("Accessibility", () => {
    it("should have appropriate role and aria-label", () => {
      render(<ProgressCircle aria-label="Loading progress" value={70} />);
      const svg = screen.getByLabelText(/loading progress/i);
      expect(svg).toHaveAttribute("role", "progressbar");
    });

    it("should accept additional aria attributes", () => {
      render(<ProgressCircle aria-live="polite" value={20} />);
      const svg = screen.getByRole("progressbar", { hidden: true });
      expect(svg).toHaveAttribute("aria-live", "polite");
    });
  });
});
