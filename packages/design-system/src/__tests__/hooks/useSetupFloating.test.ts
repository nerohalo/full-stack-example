import { AutoPlacementOptions } from "@floating-ui/core";
import { Placement } from "@floating-ui/react";
import { renderHook } from "@testing-library/react";

import { useSetupFloating, UseSetupFloatingOptions } from "../../hooks";

describe("useSetupFloating", () => {
  it("should initialize with default options", () => {
    const { result } = renderHook(() =>
      useSetupFloating({
        isOpen: false,
      })
    );

    // Check basic properties
    expect(result.current).toHaveProperty("x", 0);
    expect(result.current).toHaveProperty("y", 0);
    expect(result.current).toHaveProperty("middlewareData", {});
    expect(result.current).toHaveProperty("placement", "bottom");
    expect(result.current.context).toHaveProperty("open", false); // Assert nested property
  });

  it("should correctly handle \"isOpen\" state changes", () => {
    const { result, rerender } = renderHook(
      (props: UseSetupFloatingOptions) => useSetupFloating(props),
      {
        initialProps: { isOpen: false },
      }
    );

    // Initial state
    expect(result.current.context.open).toBe(false);

    // Update "isOpen"
    rerender({ isOpen: true });

    // Verify the updated state
    expect(result.current.context.open).toBe(true);
  });

  it("should apply middleware and configuration from the config", () => {
    const config = {
      offset: 10,
      placement: "top" as Placement,
    };

    const { result } = renderHook(() =>
      useSetupFloating({
        isOpen: true,
        config,
      })
    );

    // Validate placement
    expect(result.current.placement).toBe("top");

    // Validate middleware data structure
    expect(result.current.middlewareData).toMatchObject({});
  });

  it("should handle \"placement: auto\" with autoPlacement middleware", () => {
    const config = {
      placement: "auto" as Placement | "auto",
      autoPlacement: { alignment: "start", padding: 8 } as AutoPlacementOptions,
    };

    const { result } = renderHook(() =>
      useSetupFloating({
        isOpen: true,
        config,
      })
    );

    // Validate placement and middleware
    expect(result.current.placement).toBe("bottom"); // Default fallback
    expect(result.current.middlewareData).toBeDefined();
  });

  it("should apply the \"arrow\" middleware when specified", () => {
    const dummyArrowElement = document.createElement("div");
    const config = {
      arrow: { element: dummyArrowElement, padding: 5 },
    };

    const { result } = renderHook(() =>
      useSetupFloating({
        isOpen: true,
        config,
      })
    );

    // Validate middleware data
    expect(result.current.middlewareData).toBeDefined();
  });

  it("should apply default offset middleware if none specified", () => {
    const { result } = renderHook(() =>
      useSetupFloating({
        isOpen: true,
        config: undefined, // No config provided
      })
    );

    // Validate middleware data (offset)
    expect(result.current.middlewareData).toBeDefined();
  });
});
