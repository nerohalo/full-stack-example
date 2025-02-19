import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { Tooltip } from "../../components";
import { setupStrictMode } from "../utils";

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

    const triggerElement = screen.getByText(/trigger/i);

    expect(triggerElement).toBeInTheDocument();
    expect(triggerElement).toHaveClass("radix-tooltip__trigger");
    expect(screen.queryByText(/layer/i)).toBeNull();
  });

  describe("Interactions", () => {
    it("should show the Tooltip when hovered on the trigger", async() => {
      render(<TestComponent />);
      const user = userEvent.setup();

      const triggerElement = screen.getByText(/trigger/i);

      await user.hover(triggerElement);

      await waitFor(() => {
        const layerElement = screen.getByText(/layer/i).parentElement;
        expect(layerElement).toBeInTheDocument();
        expect(layerElement).toHaveClass("radix-tooltip__layer");
      });
    });

    it("should hide the Tooltip when mouse leaves the trigger", async() => {
      render(<TestComponent />);
      const user = userEvent.setup();

      const triggerElement = screen.getByText(/trigger/i);

      await user.hover(triggerElement);
      await waitFor(() => {
        expect(screen.getByText(/layer/i)).toBeInTheDocument();
      });

      await user.unhover(triggerElement);
      await waitFor(() => {
        expect(screen.queryByText(/layer/i)).toBeNull();
      });
    });

    it("should render the Tooltip arrow when shown", async() => {
      render(<TestComponent />);
      const user = userEvent.setup();

      const triggerElement = screen.getByText(/trigger/i);

      await user.hover(triggerElement);

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
    const user = userEvent.setup();

    const triggerElement = screen.getByText(/trigger/i);
    expect(triggerElement).toHaveClass("radix-tooltip__trigger", "custom-trigger");

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
    const user = userEvent.setup();

    const triggerElement = screen.getByText(/trigger/i);

    await user.hover(triggerElement);

    await waitFor(() => {
      const layerElement = screen.getByText(/layer/i).parentElement;
      expect(layerElement).toHaveAttribute("role", "tooltip");
      expect(layerElement).toHaveAttribute("aria-hidden", "false");
    });

    await user.unhover(triggerElement);

    await waitFor(() => {
      const layerElement = screen.queryByText(/layer/i)?.parentElement;
      if (layerElement) {
        expect(layerElement).toHaveAttribute("aria-hidden", "true");
      }
    });
  });
});
