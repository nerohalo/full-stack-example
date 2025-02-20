import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Tooltip } from "../../components";
import { setupStrictMode, user } from "../utils";

describe("Tooltip", () => {
  setupStrictMode();

  const TestComponent = () => (
    <Tooltip>
      <Tooltip.Trigger>trigger</Tooltip.Trigger>
      <Tooltip.Layer>
        <Tooltip.Layer.Arrow />
        layer
      </Tooltip.Layer>
    </Tooltip>
  );

  it("should render a Tooltip component", () => {
    render(<TestComponent />);

    // Verify that the trigger is correctly in the document
    const triggerElement = screen.getByText(/trigger/i);
    expect(triggerElement).toBeInTheDocument();
    expect(triggerElement).toHaveClass("radix-tooltip__trigger");

    // Ensure the layer is hidden initially
    expect(screen.queryByText(/layer/i)).toBeNull();
  });

  describe("Interactions", () => {
    it("should show the Tooltip when hovered on the trigger", async() => {
      render(<TestComponent />);

      const triggerElement = screen.getByText(/trigger/i);

      // Simulate hover on the trigger
      await user.hover(triggerElement);

      // Wait for the layer to appear and verify its presence
      await waitFor(() => {
        const layerElement = screen.getByText(/layer/i).parentElement;
        expect(layerElement).toBeInTheDocument();
        expect(layerElement).toHaveClass("radix-tooltip__layer");
      });
    });

    it("should hide the Tooltip when mouse leaves the trigger", async() => {
      render(<TestComponent />);

      const triggerElement = screen.getByText(/trigger/i);

      // Simulate hover to show the layer
      await user.hover(triggerElement);
      await waitFor(() => {
        expect(screen.getByText(/layer/i)).toBeInTheDocument();
      });

      // Simulate unhover to hide the layer
      await user.unhover(triggerElement);
      await waitFor(() => {
        expect(screen.queryByText(/layer/i)).toBeNull();
      });
    });

    it("should render the Tooltip arrow when shown", async() => {
      render(<TestComponent />);

      const triggerElement = screen.getByText(/trigger/i);

      // Simulate hover to show the layer along with the arrow
      await user.hover(triggerElement);

      // Wait for the arrow element and ensure it is present in the DOM
      await waitFor(() => {
        const arrowElement = screen.getByRole("img", { hidden: true });
        expect(arrowElement).toBeInTheDocument();
        expect(arrowElement).toHaveClass("radix-tooltip__arrow");
      });
    });
  });

  it("should merge custom classes with recipe classes", async() => {
    const CustomComponent = () => (
      <Tooltip>
        <Tooltip.Trigger className="custom-trigger">trigger</Tooltip.Trigger>
        <Tooltip.Layer className="custom-layer">
          <Tooltip.Layer.Arrow className="custom-arrow" />
          layer
        </Tooltip.Layer>
      </Tooltip>
    );

    render(<CustomComponent />);

    // Verify the custom classes are merged with the recipe classes for the trigger
    const triggerElement = screen.getByText(/trigger/i);
    expect(triggerElement).toHaveClass("radix-tooltip__trigger", "custom-trigger");

    // Simulate hover and verify the custom classes for the layer and arrow
    await user.hover(triggerElement);
    await waitFor(() => {
      const layerElement = screen.getByText(/layer/i).parentElement;
      expect(layerElement).toHaveClass("radix-tooltip__layer", "custom-layer");

      const arrowElement = screen.getByRole("img", { hidden: true });
      expect(arrowElement).toHaveClass("radix-tooltip__arrow", "custom-arrow");
    });
  });

  it("should have proper aria attributes", async() => {
    render(<TestComponent />);

    const triggerElement = screen.getByText(/trigger/i);

    // Simulate hover to show the layer
    await user.hover(triggerElement);

    // Wait for the layer and verify its accessibility attributes
    await waitFor(() => {
      const layerElement = screen.getByText(/layer/i).parentElement;
      expect(layerElement).toHaveAttribute("role", "tooltip"); // Correct role
      expect(layerElement).toHaveAttribute("aria-hidden", "false"); // Visible
    });

    // Simulate unhover and verify the layer is now hidden
    await user.unhover(triggerElement);
    await waitFor(() => {
      const layerElement = screen.queryByText(/layer/i)?.parentElement;
      if (layerElement) {
        expect(layerElement).toHaveAttribute("aria-hidden", "true"); // Hidden
      }
    });
  });
});
