import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "vitest";

import { createContext } from "../createContext";

describe("createContext", () => {
  it("should return a Context.Provider, a useContext hook, and the raw Context", () => {
    const [Provider, useCustomContext, RawContext] = createContext<string>();

    expect(Provider).toBeDefined();
    expect(useCustomContext).toBeDefined();
    expect(RawContext).toBeDefined();
  });

  describe("when strict mode is enabled (default)", () => {
    const [Provider, useCustomContext] = createContext<string>();

    it("should throw an error if useContext is called outside the provider", () => {
      const Component = () => {
        useCustomContext();

        return null;
      };

      expect(() => render(<Component />)).toThrowError(
        "useContext: `context` is undefined. Seems you forgot to wrap component within the Provider"
      );
    });

    it("should provide the correct context value", () => {
      const ConsumerComponent = () => {
        const contextValue = useCustomContext();

        return <div>{contextValue}</div>;
      };

      render(
        <Provider value="Hello, world!">
          <ConsumerComponent />
        </Provider>
      );

      expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    });
  });

  describe("when strict mode is disabled", () => {
    const [_Provider, useCustomContext] = createContext<string>({
      strict: false,
    });

    it("should not throw an error if useContext is called outside the provider", () => {
      const Component = () => {
        const contextValue = useCustomContext();
        expect(contextValue).toBeUndefined();

        return null;
      };

      expect(() => render(<Component />)).not.toThrowError();
    });
  });

  it("should throw a custom error message if provided", () => {
    const customErrorMessage = "Custom error: context is not defined!";
    const [, useCustomContext] = createContext<number>({
      strict: true,
      errorMessage: customErrorMessage,
    });

    const Component = () => {
      useCustomContext();

      return null;
    };

    expect(() => render(<Component />)).toThrowError(customErrorMessage);
  });

  it("should attach the correct display name if provided", () => {
    const [_Provider, , Context] = createContext<number>({
      name: "TestContext",
    });

    expect(Context.displayName).toBe("TestContext");
  });

  describe("integration tests", () => {
    it("should support setting and accessing context correctly via the Provider and useContext", () => {
      type ContextType = { value: number };
      const [Provider, useCustomContext] = createContext<ContextType>();

      const ConsumerComponent = () => {
        const context = useCustomContext();

        return <span>{context.value}</span>;
      };

      render(
        <Provider value={{ value: 42 }}>
          <ConsumerComponent />
        </Provider>
      );

      expect(screen.getByText("42")).toBeInTheDocument();
    });
  });
});
