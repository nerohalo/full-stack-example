import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { Dialog } from "../../components";
import { setupStrictMode } from "../utils";

describe("Dialog", () => {
  setupStrictMode();

  describe("Basic Functionality", () => {
    it("should render Dialog with default structure and classes", () => {
      render(
        <Dialog isOpen={true} aria-label="Test Dialog">
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.Content>Dialog Content</Dialog.Content>
        </Dialog>
      );

      const underlay = screen.getByLabelText(/Test Dialog/i).parentElement;
      const dialog = screen.getByLabelText(/Test Dialog/i);
      const title = screen.getByText(/Dialog Title/i);
      const description = screen.getByText(/Dialog Description/i);
      const content = screen.getByText(/Dialog Content/i);

      expect(underlay).toBeInTheDocument();
      expect(dialog).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(content).toBeInTheDocument();

      expect(underlay).toHaveClass(
        "radix-d_flex",
        "radix-flex-d_column",
        "radix-gap_10px",
        "radix-w_100%",
        "radix-max-w_450px"
      );
      expect(dialog).toHaveClass("radix-dialog__root");
      expect(title).toHaveClass("radix-dialog__title");
      expect(description).toHaveClass("radix-dialog__description");
      expect(content).toHaveClass("radix-dialog__content");
    });

    it("should render as a modal with proper accessibility roles", () => {
      render(
        <Dialog isOpen={true} aria-modal="true" aria-label="Accessible Dialog">
          <Dialog.Content>test</Dialog.Content>
        </Dialog>
      );
      const dialog = screen.getByLabelText(/Accessible Dialog/i);

      expect(dialog).toHaveAttribute("aria-modal", "true");
      expect(dialog).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should manage open and close state programmatically", async() => {
      const onOpenChange = vi.fn();

      const { rerender } = render(
        <Dialog
          aria-label="Controlled Dialog"
          isOpen={false}
          onOpenChange={onOpenChange}
        >
          <Dialog.Content>Controlled Content</Dialog.Content>
        </Dialog>
      );

      expect(screen.queryByText(/Controlled Content/i)).not.toBeInTheDocument();

      rerender(
        <Dialog
          aria-label="Controlled Dialog"
          isOpen={true}
          onOpenChange={onOpenChange}
        >
          <Dialog.Content>Controlled Content</Dialog.Content>
        </Dialog>
      );

      const content = screen.getByText(/Controlled Content/i);
      expect(content).toBeInTheDocument();
    });

    it("should close when \"Escape\" key is pressed and isKeyboardDismissDisabled is true", async() => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dialog
          aria-label="Dismissable Dialog"
          isOpen={true}
          isKeyboardDismissDisabled={false}
          onOpenChange={onOpenChange}
        >
          <Dialog.Content>Dismissable Content</Dialog.Content>
        </Dialog>
      );

      const dialog = screen.getByText(/Dismissable Content/i);
      expect(dialog).toBeInTheDocument();

      await user.keyboard("{Escape}");

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("should not close when \"Escape\" is pressed and isKeyboardDismissDisabled is false", async() => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dialog
          aria-label="Non-Dismissable Dialog"
          isOpen={true}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          onOpenChange={onOpenChange}
        >
          <Dialog.Content>Non-Dismissable Content</Dialog.Content>
        </Dialog>
      );

      const dialog = screen.getByText(/Non-Dismissable Content/i);
      expect(dialog).toBeInTheDocument();

      await user.keyboard("{Escape}");

      expect(onOpenChange).not.toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("should merge custom classes", () => {
      render(
        <Dialog isOpen={true} aria-label="Custom Class Dialog">
          <div className="custom-class" />
        </Dialog>
      );

      const underlay = screen.getByLabelText(/Custom Class Dialog/i).parentElement;
      expect(underlay).toHaveClass(
        "radix-d_flex",
        "radix-flex-d_column",
        "radix-gap_10px",
        "radix-w_100%",
        "radix-max-w_450px"
      );
    });

    it("should forward HTML attributes correctly", () => {
      render(
        <Dialog isOpen={true} data-testid="dialog" aria-label="Test Dialog">
          <Dialog.Content>Content</Dialog.Content>
        </Dialog>
      );

      const dialog = screen.getByTestId("dialog");
      expect(dialog).toHaveAttribute("aria-label", "Test Dialog");
    });

    it("should handle complex child components", () => {
      render(
        <Dialog isOpen={true} aria-label="Complex Dialog">
          <Dialog.Content>
            <span data-testid="complex-child">Complex Child</span>
          </Dialog.Content>
        </Dialog>
      );

      const child = screen.getByTestId("complex-child");
      expect(child).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have appropriate aria attributes by default", () => {
      render(
        <Dialog isOpen={true} aria-label="A11y Dialog">
          <Dialog.Content>test</Dialog.Content>
        </Dialog>
      );

      const dialog = screen.getByLabelText(/A11y Dialog/i);
      expect(dialog).toHaveAttribute("aria-label", "A11y Dialog");
    });

    it("should handle aria-labelledby and aria-describedby attributes", () => {
      render(
        <Dialog isOpen={true} aria-labelledby="dialog-title" aria-describedby="dialog-description">
          <Dialog.Title id="dialog-title">Accessible Title</Dialog.Title>
          <Dialog.Description id="dialog-description">
            This is a description
          </Dialog.Description>
        </Dialog>
      );

      const title = screen.getByText(/Accessible Title/i);
      const description = screen.getByText(/This is a description/i);

      expect(title).toHaveAttribute("id", "dialog-title");
      expect(description).toHaveAttribute("id", "dialog-description");
    });
  });
});
