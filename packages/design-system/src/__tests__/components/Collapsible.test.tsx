import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

import { Collapsible } from "../../components";
import { setupStrictMode } from "../utils";

vi.mock("lucide-react", () => ({
  ChevronUp: () => <svg data-testid="chevron-up" />,
  ChevronDown: () => <svg data-testid="chevron-down" />,
}));

describe("Collapsible", () => {
  setupStrictMode();
  const user = userEvent.setup();

  describe("Basic Functionality", () => {
    test("renders trigger and panel with initial classes", () => {
      render(
        <Collapsible>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible>
      );

      const trigger = screen.getByRole("button");
      const panel = screen.getByText(/Content/i);

      expect(trigger).toHaveClass(
        "radix-collapsible__trigger",
        "radix-collapsible__trigger--expanded_false"
      );
      expect(panel).toHaveClass(
        "radix-collapsible__panel",
        "radix-collapsible__panel--expanded_false"
      );
    });

    test("toggles panel visibility on click", async() => {
      render(
        <Collapsible>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible>
      );

      const trigger = screen.getByRole("button");
      const panel = screen.getByText(/Content/i);

      await user.click(trigger);
      expect(panel).toHaveClass(
        "radix-collapsible__panel",
        "radix-collapsible__panel--expanded_true"
      );

      await user.click(trigger);
      expect(panel).toHaveClass(
        "radix-collapsible__panel",
        "radix-collapsible__panel--expanded_false"
      );
    });
  });

  describe("Accessibility", () => {
    test("has proper aria attributes", () => {
      render(
        <Collapsible>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible>
      );

      const trigger = screen.getByRole("button");
      const panel = screen.getByText(/Content/i);

      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute("aria-controls", panel.id);
    });

    test("updates aria-expanded on toggle", async() => {
      render(
        <Collapsible>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible>
      );

      const trigger = screen.getByRole("button");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("Keyboard Navigation", () => {
    test("toggles with Enter key", async() => {
      render(
        <Collapsible>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible>
      );

      const panel = screen.getByText(/Content/i);

      await user.tab();
      await user.keyboard("[Enter]");
      expect(panel).toHaveClass(
        "radix-collapsible__panel",
        "radix-collapsible__panel--expanded_true"
      );

      await user.keyboard("[Enter]");
      expect(panel).toHaveClass(
        "radix-collapsible__panel",
        "radix-collapsible__panel--expanded_false"
      );
    });

    test("toggles with Space key", async() => {
      render(
        <Collapsible>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible>
      );

      const panel = screen.getByText(/Content/i);

      await user.tab();
      await user.keyboard("[Space]");
      expect(panel).toHaveClass(
        "radix-collapsible__panel",
        "radix-collapsible__panel--expanded_true"
      );

      await user.keyboard("[Space]");
      expect(panel).toHaveClass(
        "radix-collapsible__panel",
        "radix-collapsible__panel--expanded_false"
      );
    });
  });

  describe("Edge Cases", () => {
    test("handles custom class merging", () => {
      render(
        <Collapsible>
          <Collapsible.Trigger className="custom-trigger">Toggle</Collapsible.Trigger>
          <Collapsible.Panel className="custom-panel">Content</Collapsible.Panel>
        </Collapsible>
      );

      expect(screen.getByRole("button")).toHaveClass(
        "radix-collapsible__trigger",
        "radix-collapsible__trigger--expanded_false",
        "custom-trigger"
      );
      expect(screen.getByText(/Content/i)).toHaveClass(
        "radix-collapsible__panel",
        "radix-collapsible__panel--expanded_false",
        "custom-panel"
      );
    });

    test("maintains focus during interaction", async() => {
      render(
        <Collapsible>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible>
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);
      expect(trigger).toHaveFocus();
    });

    test("shows correct chevron state", async() => {
      render(
        <Collapsible>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible>
      );

      const trigger = screen.getByRole("button");

      expect(screen.queryByTestId("chevron-down")).toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      await user.click(trigger);

      expect(screen.queryByTestId("chevron-up")).toBeInTheDocument();
      expect(screen.queryByTestId("chevron-down")).not.toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      await user.click(trigger);

      expect(screen.queryByTestId("chevron-down")).toBeInTheDocument();
      expect(screen.queryByTestId("chevron-up")).not.toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("State Management", () => {
    test("respects defaultExpanded prop", () => {
      render(
        <Collapsible defaultExpanded>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Panel>Content</Collapsible.Panel>
        </Collapsible>
      );

      expect(screen.getByText(/Content/i)).toHaveClass(
        "radix-collapsible__panel",
        "radix-collapsible__panel--expanded_true"
      );
      expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    });
  });
});
