import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Select } from "../../components";
import { setupStrictMode, user } from "../utils";

describe("Select", () => {
  setupStrictMode();

  describe("Basic Functionality", () => {
    it("should render with default classes and label", () => {
      render(
        <Select label="Select Label" placeholder="Select an option">
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      // Verify that the label is rendered correctly in the DOM.
      const labelElement = screen.getByText(/Select Label/i);
      expect(labelElement).toBeInTheDocument();

      // Validate that the placeholder is displayed inside a button element.
      const buttonElement = screen.getByRole("button", { name: /Select an option/i });
      expect(buttonElement).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should open the dropdown menu on click and allow selecting an option", async() => {
      render(
        <Select label="Select Label" placeholder="Select an option">
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      // Simulate a click on the button to open the dropdown menu.
      const buttonElement = screen.getByRole("button", { name: /Select an option/i });
      await user.click(buttonElement);

      // Verify that the dropdown menu (listbox) is visible after clicking.
      const listbox = screen.getByRole("listbox");
      expect(listbox).toBeInTheDocument();

      // Simulate selecting an item by clicking on "Option 1".
      const option = screen.getAllByText("Option 1")[1]; // Get the visible item from the listbox.
      await user.click(option);

      // Ensure that the button's content updates to reflect the selected option.
      expect(buttonElement).toHaveTextContent("Option 1");
    });

    it("should close the dropdown menu when selecting an option", async() => {
      render(
        <Select label="Select Label" placeholder="Select an option">
          <Select.Item key="1">Option 1</Select.Item>
        </Select>
      );

      // Simulate a click to open the dropdown.
      const buttonElement = screen.getByRole("button", { name: /Select an option/i });
      await user.click(buttonElement);

      const listbox = screen.getByRole("listbox");
      expect(listbox).toBeInTheDocument();

      // Select the item and ensure the dropdown menu closes.
      await user.click(screen.getAllByText("Option 1")[1]);
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument(); // The dropdown should no longer be visible.
    });

    it("should allow keyboard navigation through options", async() => {
      render(
        <Select label="Select Label" placeholder="Select an option">
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      // Open the dropdown menu by clicking the button.
      const buttonElement = screen.getByRole("button", { name: /Select an option/i });
      await user.click(buttonElement);
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      // Navigate through the options with keyboard interactions.
      await user.keyboard("[ArrowDown]"); // Move focus to "Option 1".
      expect(screen.getAllByText("Option 1")[1]).toHaveFocus();

      await user.keyboard("[ArrowDown]"); // Move focus to "Option 2".
      expect(screen.getAllByText("Option 2")[1]).toHaveFocus();

      // Select "Option 2" using the Enter key and validate dropdown closure.
      await user.keyboard("[Enter]");
      expect(buttonElement).toHaveTextContent("Option 2");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("Validation States", () => {
    it("should render an error message and apply 'ruby' color when invalid", () => {
      render(
        <Select
          label="Invalid Select"
          placeholder="Select an option"
          errorMessage="This is an error"
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      // Verify that the error message is correctly displayed in the DOM.
      const errorMessage = screen.getByText(/This is an error/i);
      expect(errorMessage).toBeInTheDocument();

      // Ensure the error message is styled with the correct class for "ruby" color.
      expect(errorMessage).toHaveClass("radix-text--color_ruby");
    });

    it("should render a success message and apply 'grass' color", () => {
      render(
        <Select
          label="Success Select"
          successMessage="Great success!"
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      // Verify that the success message is correctly displayed in the DOM.
      const successMessage = screen.getByText(/Great success!/i);
      expect(successMessage).toBeInTheDocument();

      // Ensure the success message is styled with the correct class for "grass" color.
      expect(successMessage).toHaveClass("radix-text--color_grass");
    });
  });
});
