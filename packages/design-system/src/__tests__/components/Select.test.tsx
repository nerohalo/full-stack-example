import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { Select } from "../../components";
import { setupStrictMode } from "../utils";

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

      const labelElement = screen.getByText(/Select Label/i);
      expect(labelElement).toBeInTheDocument();

      const buttonElement = screen.getByRole("button", { name: /Select an option/i });
      expect(buttonElement).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should open the dropdown menu on click and allow selecting an option", async() => {
      const user = userEvent.setup();
      render(
        <Select label="Select Label" placeholder="Select an option">
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      const buttonElement = screen.getByRole("button", { name: /Select an option/i });

      await user.click(buttonElement);
      const listbox = screen.getByRole("listbox");

      expect(listbox).toBeInTheDocument();

      const option = screen.getAllByText("Option 1")[1];
      await user.click(option);

      expect(buttonElement).toHaveTextContent("Option 1");

    });

    it("should close the dropdown menu when selecting an option", async() => {
      const user = userEvent.setup();
      render(
        <Select label="Select Label" placeholder="Select an option">
          <Select.Item key="1">Option 1</Select.Item>
        </Select>
      );

      const buttonElement = screen.getByRole("button", { name: /Select an option/i });

      await user.click(buttonElement);

      const listbox = screen.getByRole("listbox");
      expect(listbox).toBeInTheDocument();

      await user.click(screen.getAllByText("Option 1")[1]);

      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("should allow keyboard navigation through options", async() => {
      const user = userEvent.setup();
      render(
        <Select label="Select Label" placeholder="Select an option">
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      const buttonElement = screen.getByRole("button", { name: /Select an option/i });

      await user.click(buttonElement);
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      await user.keyboard("[ArrowDown]");
      expect(screen.getAllByText("Option 1")[1]).toHaveFocus();

      await user.keyboard("[ArrowDown]");
      expect(screen.getAllByText("Option 2")[1]).toHaveFocus();

      await user.keyboard("[Enter]");

      expect(buttonElement).toHaveTextContent("Option 2");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("Validation States", () => {
    it("should render an error message and apply \"ruby\" color when invalid", () => {
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

      const errorMessage = screen.getByText(/This is an error/i);
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass("radix-text--color_ruby");
    });

    it("should render a success message and apply \"grass\" color", () => {
      render(
        <Select
          label="Success Select"
          successMessage="Great success!"
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      const successMessage = screen.getByText(/Great success!/i);
      expect(successMessage).toBeInTheDocument();
      expect(successMessage).toHaveClass("radix-text--color_grass");
    });

    it("should render a warning message and apply \"orange\" color", () => {
      render(
        <Select
          label="Warning Select"
          warningMessage="Be cautious!"
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      const warningMessage = screen.getByText(/Be cautious!/i);
      expect(warningMessage).toBeInTheDocument();
      expect(warningMessage).toHaveClass("radix-text--color_orange");
    });
  });

  describe("Disabled and Loading States", () => {
    it("should render as disabled when \"loading\" is true", () => {
      render(
        <Select
          label="Disabled Select"
          loading
          placeholder="Loading..."
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      const buttonElement = screen.getByRole("button", { name: /Loading.../i });
      expect(buttonElement).toBeDisabled();
    });

    it("should render as disabled when the \"isDisabled\" prop is true", () => {
      render(
        <Select
          label="Disabled Select"
          isDisabled
          placeholder="Can't interact"
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      const buttonElement = screen.getByRole("button", { name: /Can't interact/i });
      expect(buttonElement).toBeDisabled();
    });
  });

  describe("Accessibility", () => {
    it("should associate the label and placeholder with the button via aria", () => {
      render(
        <Select
          label="Accessible Select"
          placeholder="Choose..."
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      const labelTextElement = screen.getByText(/Accessible Select/i);
      const labelElement = labelTextElement.parentElement;
      const buttonElement = screen.getByRole("button", { name: /Choose.../i });
      const placeholderElement = screen.getByText(/Choose.../i);

      expect(buttonElement).toHaveAttribute("aria-labelledby", `${placeholderElement.id} ${labelElement?.id}`);
    });

    it("should respect aria-invalid when invalid", () => {
      render(
        <Select
          label="Aria Invalid Select"
          errorMessage="This is an error"
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      const buttonElement = screen.getByRole("button");

      expect(buttonElement).toHaveAttribute("aria-invalid", "true");
    });

    it("should support aria-describedby for error messages", () => {
      render(
        <Select
          label="Aria Descriptions"
          errorMessage="This is an error"
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      const buttonElement = screen.getByRole("button");
      const errorMessageElement = screen.getByText(/This is an error/i);

      expect(buttonElement).toHaveAttribute(
        "aria-describedby",
        `${errorMessageElement.id}`
      );
    });

    it("should support aria-describedby for successMessage", () => {
      render(
        <Select
          label="Aria Descriptions"
          successMessage="This is a success message"
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      const buttonElement = screen.getByRole("button");
      const successMessageElement = screen.getByText(/This is a success message/i);

      expect(buttonElement).toHaveAttribute(
        "aria-describedby",
        `${successMessageElement.id}`
      );
    });

    it("should support aria-describedby for warningMessage", () => {
      render(
        <Select
          label="Aria Descriptions"
          warningMessage="This is a warning message"
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      const buttonElement = screen.getByRole("button");
      const warningMessageElement = screen.getByText(/This is a warning message/i);

      expect(buttonElement).toHaveAttribute(
        "aria-describedby",
        `${warningMessageElement.id}`
      );
    });

    it("should support aria-describedby for description", () => {
      render(
        <Select
          label="Aria Descriptions"
          description="This is a description"
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      const buttonElement = screen.getByRole("button");
      const descriptionMessageElement = screen.getByText(/This is a description/i);

      expect(buttonElement).toHaveAttribute(
        "aria-describedby",
        `${descriptionMessageElement.id}`
      );
    });
  });

  describe("Edge Cases", () => {
    it("should forward ref correctly", () => {
      const ref = { current: null };
      render(
        <Select
          ref={ref}
          label="Ref Test"
          placeholder="Testing ref"
        >
          <Select.Item key="1">Option 1</Select.Item>
          <Select.Item key="2">Option 2</Select.Item>
        </Select>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
