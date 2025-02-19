import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import	{ Draggable  } from "../../components";
import { setupStrictMode } from "../utils";

describe("Draggable", () => {
  setupStrictMode();

  describe("Basic Functionality", () => {
    it("should render with expected children", () => {
      render(<Draggable>Draggable Content</Draggable>);
      const draggable = screen.getByText(/Draggable Content/i);

      expect(draggable).toBeInTheDocument();
    });

    it("should render as a fragment when draggable is false", () => {
      render(
        <Draggable draggable={false}>
          Non-draggable content
        </Draggable>
      );

      const textContent = screen.getByText(/Non-draggable content/i);
      expect(textContent).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should merge custom classes", () => {
      render(<Draggable className="custom-class" aria-label="draggable">Custom drags</Draggable>);

      const draggableElement = screen.getByLabelText("draggable");
      expect(draggableElement).toHaveClass("custom-class");
    });

    it("should forward HTML attributes", () => {
      render(
        <Draggable
          data-testid="draggable-id"
          title="Draggable tooltip"
        >
          Draggable with attributes
        </Draggable>
      );

      const draggable = screen.getByTestId("draggable-id");
      expect(draggable).toHaveAttribute("title", "Draggable tooltip");
    });

    it("should handle complex children", () => {
      render(<Draggable><span data-testid="child">Complex</span> Content</Draggable>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText(/Content/i)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should accept aria attributes", () => {
      render(<Draggable aria-live="polite">Dragging</Draggable>);

      const draggableElement = screen.getByText(/Dragging/i);

      expect(draggableElement).toHaveAttribute("aria-live", "polite");
    });

    it("should have proper role when specified", () => {
      render(<Draggable role="dialog">Dialog Content</Draggable>);
      const draggableElement = screen.getByRole("dialog");

      expect(draggableElement).toBeInTheDocument();
    });
  });
});
