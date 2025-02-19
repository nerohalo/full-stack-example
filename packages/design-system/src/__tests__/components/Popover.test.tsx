import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, it, expect } from "vitest";

import { Popover } from "../../components";
import { setupStrictMode } from "../utils";

describe("Popover", () => {
  setupStrictMode();

  const TestComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Popover isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <Popover.Trigger>trigger</Popover.Trigger>
        <Popover.Layer>
          <Popover.Layer.Arrow />
          layer
        </Popover.Layer>
      </Popover>
    );
  };

  it("should render a Popover component", async() => {
    render(<TestComponent />);

    const triggerElement = screen.getByText(/trigger/i);

    expect(triggerElement).toBeInTheDocument();
    expect(triggerElement).toHaveClass("radix-popover__trigger");
    expect(screen.queryByText(/layer/i)).toBeNull();
  });

  describe("Interactions", () => {
    it("should open the Popover when trigger is clicked", async() => {
      render(<TestComponent />);
      const user = userEvent.setup();

      const triggerElement = screen.getByText(/trigger/i);

      await user.click(triggerElement);

      await waitFor(() => {
        const layerElement = screen.getByText(/layer/i);
        expect(layerElement).toBeInTheDocument();
        expect(layerElement).toHaveClass("radix-popover__layer");
      });
    });

    it("should close the Popover on another click", async() => {
      render(<TestComponent />);
      const user = userEvent.setup();

      const triggerElement = screen.getByText(/trigger/i);

      await user.click(triggerElement);
      await waitFor(() => {
        expect(screen.getByText(/layer/i)).toBeInTheDocument();
      });

      await user.click(triggerElement);
      await waitFor(() => {
        expect(screen.queryByText(/layer/i)).toBeNull();
      });
    });

    it("should render the arrow correctly within the Popover", async() => {
      render(<TestComponent />);
      const user = userEvent.setup();

      const triggerElement = screen.getByText(/trigger/i);

      await user.click(triggerElement);

      await waitFor(() => {
        const arrowElement = screen.getByRole("img", { hidden: true });
        expect(arrowElement).toBeInTheDocument();
        expect(arrowElement).toHaveClass("radix-popover__arrow");
      });
    });
  });

  it("should merge custom classes with recipe classes", async() => {
    const CustomComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <Popover isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <Popover.Trigger className="custom-trigger">trigger</Popover.Trigger>
          <Popover.Layer className="custom-layer">
            <Popover.Layer.Arrow className="custom-arrow" />
            layer
          </Popover.Layer>
        </Popover>
      );
    };

    render(<CustomComponent />);
    const user = userEvent.setup();

    const triggerElement = screen.getByText(/trigger/i);
    expect(triggerElement).toHaveClass("radix-popover__trigger", "custom-trigger");

    await user.click(triggerElement);
    await waitFor(() => {
      const layerElement = screen.getByText(/layer/i);
      expect(layerElement).toHaveClass("radix-popover__layer", "custom-layer");

      const arrowElement = screen.getByRole("img", { hidden: true });
      expect(arrowElement).toHaveClass("radix-popover__arrow", "custom-arrow");
    });
  });

  it("should handle Popover without an arrow", async() => {
    const ComponentWithoutArrow = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <Popover isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <Popover.Trigger className="trigger">trigger</Popover.Trigger>
          <Popover.Layer>
            layer
          </Popover.Layer>
        </Popover>
      );
    };

    render(<ComponentWithoutArrow />);
    const user = userEvent.setup();

    const triggerElement = screen.getByText(/trigger/i);

    await user.click(triggerElement);

    await waitFor(() => {
      const layerElement = screen.getByText(/layer/i);
      expect(layerElement).toBeInTheDocument();
      expect(layerElement).toHaveClass("radix-popover__layer");
    });

    const arrowElement = screen.queryByRole("img", { hidden: true });
    expect(arrowElement).toBeNull();
  });

  it("should handle controlled `isOpen` prop changes", async() => {
    const ControlledComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger>trigger</Popover.Trigger>
          <Popover.Layer>
            <Popover.Layer.Arrow />
            layer
          </Popover.Layer>
        </Popover>
      );
    };

    render(<ControlledComponent />);
    const user = userEvent.setup();

    const triggerElement = screen.getByText(/trigger/i);

    expect(screen.queryByText(/layer/i)).toBeNull();

    await user.click(triggerElement);

    await waitFor(() => {
      expect(screen.getByText(/layer/i)).toBeInTheDocument();
    });

    await user.click(triggerElement);
    await waitFor(() => {
      expect(screen.queryByText(/layer/i)).toBeNull();
    });
  });

  it("should have proper aria attributes", async() => {
    render(<TestComponent />);
    const user = userEvent.setup();

    const triggerElement = screen.getByText(/trigger/i);
    await user.click(triggerElement);

    await waitFor(() => {
      const layerElement = screen.getByText(/layer/i);
      expect(layerElement).toHaveAttribute("role", "dialog");
    });
  });
});
