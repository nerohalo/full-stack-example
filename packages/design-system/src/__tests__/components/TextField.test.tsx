import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { TextField } from "../../components";
import { setupStrictMode } from "../utils";

describe("TextField", () => {
  setupStrictMode();

  describe("Basic Functionality", () => {
    it("should render with default classes and label", () => {
      render(<TextField label="Test Label" />);
      const labelElement = screen.getByText(/Test Label/i);
      const inputElement = screen.getByRole("textbox");

      expect(labelElement).toBeInTheDocument();
      expect(inputElement).toBeInTheDocument();
    });

    it("should apply default slot classes", () => {
      render(<TextField label="Test Label" />);
      const inputElement = screen.getByRole("textbox");

      expect(inputElement).toHaveClass(
        "radix-textField__input",
        "radix-textField__input--fluid_false",
        "radix-textField__input--color_gray"
      );
      expect(screen.getByText(/Test Label/i)).toHaveClass(
        "radix-text radix-text--size_2",
        "radix-text--color_inherit",
        "radix-text--weight_regular"
      );
    });
  });

  describe("Disabled and Loading States", () => {
    it("should render as disabled when the \"disabled\" prop is provided", () => {
      render(<TextField label="Disabled Field" disabled />);
      const inputElement = screen.getByRole("textbox");

      expect(inputElement).toBeDisabled();
    });

    it("should be disabled when \"loading\" is true", () => {
      render(<TextField label="Loading Field" loading />);
      const inputElement = screen.getByRole("textbox");

      expect(inputElement).toBeDisabled();
    });

    it("should render with \"gray\" color when loading", () => {
      render(<TextField label="Loading Field" loading />);
      const containerElement = screen.getByText(/Loading Field/i).closest("div");

      expect(containerElement).toHaveClass(
        "radix-textField__root",
        "radix-textField__root--fluid_false",
        "radix-textField__root--color_gray"
      );
    });
  });

  describe("Validation States", () => {
    it("should render an error message and apply \"ruby\" color when invalid", () => {
      render(<TextField label="Invalid Field" errorMessage="This is an error" />);
      const errorMessage = screen.getByText(/This is an error/i);

      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass("radix-text--color_ruby");
    });

    it("should render a success message and apply \"grass\" color", () => {
      render(
        <TextField
          label="Success Field"
          successMessage="Great success!"
        />
      );
      const successMessage = screen.getByText(/Great success!/i);

      expect(successMessage).toBeInTheDocument();
      expect(successMessage).toHaveClass("radix-text--color_grass");
    });

    it("should render a warning message and apply \"orange\" color", () => {
      render(
        <TextField
          label="Warning Field"
          warningMessage="This is a warning"
        />
      );
      const warningMessage = screen.getByText(/This is a warning/i);

      expect(warningMessage).toBeInTheDocument();
      expect(warningMessage).toHaveClass("radix-text--color_orange");
    });
  });

  describe("Fluid Variations", () => {
    it("should apply the \"fluid\" class when fluid prop is enabled", () => {
      render(<TextField label="Fluid Field" fluid />);
      const containerElement = screen.getByText(/Fluid Field/i).closest("div");

      expect(containerElement).toHaveClass(
        "radix-textField__root",
        "radix-textField__root--fluid_true",
        "radix-textField__root--color_gray"
      );
    });
  });

  describe("Slot Customization", () => {
    it("should merge custom classes into the root slot", () => {
      render(
        <TextField
          label="Custom Root"
          slots={{ root: "custom-root-class" }}
        />
      );
      const containerElement = screen.getByText(/Custom Root/i).closest("div");

      expect(containerElement).toHaveClass("custom-root-class");
    });

    it("should merge custom classes into the input slot", () => {
      render(
        <TextField
          label="Custom Input"
          slots={{ input: "custom-input-class" }}
        />
      );
      const inputElement = screen.getByRole("textbox");

      expect(inputElement).toHaveClass("custom-input-class");
    });

    it("should merge custom classes for the label slot", () => {
      render(
        <TextField
          label="Custom Label"
          slots={{ label: "custom-label-class" }}
        />
      );
      const labelTextElement = screen.getByText(/Custom Label/i);
      const labelElement = labelTextElement.parentElement;

      expect(labelElement).toHaveClass("custom-label-class");
    });
  });

  describe("Interactions", () => {
    it("should accept and display user input", async() => {
      const user = userEvent.setup();
      render(<TextField label="Interactive Input" />);
      const inputElement = screen.getByRole("textbox");

      await user.type(inputElement, "Hello, world!");

      expect(inputElement).toHaveValue("Hello, world!");
    });

    it("should handle focus and blur events correctly", async() => {
      const user = userEvent.setup();
      render(<TextField label="Focus Test" />);
      const inputElement = screen.getByRole("textbox");

      await user.click(inputElement);
      expect(inputElement).toHaveFocus();

      await user.tab();
      expect(inputElement).not.toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("should associate the label with the input via aria", () => {
      render(<TextField label="Accessible Field" />);
      const labelTextElement = screen.getByText(/Accessible Field/i);
      const labelElement = labelTextElement.parentElement;
      const inputElement = screen.getByRole("textbox");

      expect(inputElement).toHaveAttribute("aria-labelledby", labelElement?.id);
    });

    it("should respect aria-invalid when invalid", () => {
      render(
        <TextField
          label="Aria Invalid"
          errorMessage="This is an error"
        />
      );
      const inputElement = screen.getByRole("textbox");

      expect(inputElement).toHaveAttribute("aria-invalid", "true");
    });

    it("should support description via aria attributes", () => {
      render(
        <TextField
          label="Aria Descriptions"
          description="This is a description"
        />
      );
      const inputElement = screen.getByRole("textbox");
      const descriptionElement = screen.getByText(/This is a description/i);

      expect(inputElement).toHaveAttribute("aria-describedby", `${descriptionElement.id}`);
    });

    it("should support error messages via aria attributes", () => {
      render(
        <TextField
          label="Aria Descriptions"
          errorMessage="This is an error"
        />
      );
      const inputElement = screen.getByRole("textbox");
      const errorMessageElement = screen.getByText(/This is an error/i);

      expect(inputElement).toHaveAttribute("aria-describedby", `${errorMessageElement.id}`);
    });

    it("should support warning messages via aria attributes", () => {
      render(
        <TextField
          label="Aria Descriptions"
          warningMessage="This is an warning"
        />
      );
      const inputElement = screen.getByRole("textbox");
      const waringMessageElement = screen.getByText(/This is an warning/i);

      expect(inputElement).toHaveAttribute("aria-describedby", `${waringMessageElement.id}`);
    });

    it("should support success messages via aria attributes", () => {
      render(
        <TextField
          label="Aria Descriptions"
          successMessage="This is an success message"
        />
      );
      const inputElement = screen.getByRole("textbox");
      const successMessageElement = screen.getByText(/This is an success message/i);

      expect(inputElement).toHaveAttribute("aria-describedby", `${successMessageElement.id}`);
    });
  });

  describe("Edge Cases", () => {
    it("should render without a label", () => {
      render(<TextField />);
      const inputElement = screen.getByRole("textbox");

      expect(inputElement).toBeInTheDocument();
      expect(screen.queryByLabelText(/./i)).not.toBeInTheDocument();
    });

    it("should merge custom props into the input element", () => {
      render(
        <TextField
          data-testid="custom-input"
          autoComplete="on"
          placeholder="Enter text"
        />
      );

      const inputElement = screen.getByTestId("custom-input");
      expect(inputElement).toHaveAttribute("autocomplete", "on");
      expect(inputElement).toHaveAttribute("placeholder", "Enter text");
    });

    it("should forward ref to the correct element", () => {
      const ref = { current: null };
      render(<TextField ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });
});
