import { describe, it, expect, vi } from "vitest";

import { filterDOMProps } from "../../helpers";

describe("filterDOMProps", () => {
  it("should return all props if `enabled` is false", () => {
    const props = {
      id: "test-id",
      type: "text",
      "data-test": "test-data",
      onClick: vi.fn(),
    };

    const result = filterDOMProps(props, { enabled: false });

    expect(result).toEqual(props);
  });

  it("should filter out props not in the DOMPropNames set by default", () => {
    const props = {
      id: "test-id",
      customProp: "custom-value",
      className: "test-class",
      onClick: vi.fn(),
    };

    const result = filterDOMProps(props);

    expect(result).toEqual({
      id: "test-id",
      className: "test-class",
      onClick: props.onClick,
    });
    expect(result).not.toHaveProperty("customProp");
  });

  it("should include aria-* props when labelable is true", () => {
    const props = {
      id: "test-id",
      "aria-label": "test-label",
      role: "button",
    };

    const result = filterDOMProps(props, { labelable: true });

    expect(result).toEqual({
      id: "test-id",
      "aria-label": "test-label",
      role: "button",
    });
  });

  it("should exclude aria-* props when labelable is false", () => {
    const props = {
      id: "test-id",
      "aria-label": "test-label",
      role: "button",
    };

    const result = filterDOMProps(props, { labelable: false });

    expect(result).toEqual({
      id: "test-id",
      role: "button",
    });
    expect(result).not.toHaveProperty("aria-label");
  });

  it("should include valid DOM props and custom prop names", () => {
    const props = {
      id: "test-id",
      customProp: "custom-value",
      anotherCustomProp: "another-value",
    };

    const result = filterDOMProps(props, {
      propNames: new Set(["customProp"]),
    });

    expect(result).toEqual({
      id: "test-id",
      customProp: "custom-value",
    });
    expect(result).not.toHaveProperty("anotherCustomProp");
  });

  it("should omit props included in omitPropNames", () => {
    const props = {
      id: "test-id",
      className: "test-class",
      customProp: "custom-value",
    };

    const result = filterDOMProps(props, {
      omitPropNames: new Set(["className", "customProp"]),
    });

    expect(result).toEqual({
      id: "test-id",
    });
  });

  it("should omit event props when omitEventProps is true", () => {
    const props = {
      id: "test-id",
      onClick: vi.fn(),
      onMouseEnter: vi.fn(),
    };

    const result = filterDOMProps(props, { omitEventProps: true });

    expect(result).toEqual({
      id: "test-id",
    });
    expect(result).not.toHaveProperty("onClick");
    expect(result).not.toHaveProperty("onMouseEnter");
  });

  it("should omit specific event props included in omitEventNames", () => {
    const props = {
      id: "test-id",
      onClick: vi.fn(),
      onMouseEnter: vi.fn(),
    };

    const result = filterDOMProps(props, {
      omitEventNames: new Set(["onClick"]),
    });

    expect(result).toEqual({
      id: "test-id",
      onMouseEnter: props.onMouseEnter,
    });
    expect(result).not.toHaveProperty("onClick");
  });

  it("should omit data-* props if omitDataProps is true", () => {
    const props = {
      id: "test-id",
      "data-test": "test-data",
      "data-custom": "custom-data",
    };

    const result = filterDOMProps(props, { omitDataProps: true });

    expect(result).toEqual({
      id: "test-id",
    });
    expect(result).not.toHaveProperty("data-test");
    expect(result).not.toHaveProperty("data-custom");
  });

  it("should include data-* props if omitDataProps is false", () => {
    const props = {
      id: "test-id",
      "data-test": "test-data",
      "data-custom": "custom-data",
    };

    const result = filterDOMProps(props, { omitDataProps: false });

    expect(result).toEqual({
      id: "test-id",
      "data-test": "test-data",
      "data-custom": "custom-data",
    });
  });

  it("should correctly combine multiple filtering options", () => {
    const props = {
      id: "test-id",
      className: "test-class",
      customProp: "custom-value",
      "data-test": "test-data",
      onClick: vi.fn(),
      onMouseEnter: vi.fn(),
    };

    const result = filterDOMProps(props, {
      omitEventProps: true,
      omitDataProps: true,
      omitPropNames: new Set(["customProp"]),
    });

    expect(result).toEqual({
      id: "test-id",
      className: "test-class",
    });
    expect(result).not.toHaveProperty("onClick");
    expect(result).not.toHaveProperty("onMouseEnter");
    expect(result).not.toHaveProperty("data-test");
    expect(result).not.toHaveProperty("customProp");
  });

  it("should include valid DOM props and event props", () => {
    const props = {
      id: "test-id",
      className: "test-class",
      onClick: vi.fn(),
    };

    const result = filterDOMProps(props);

    expect(result).toEqual({
      id: "test-id",
      className: "test-class",
      onClick: props.onClick,
    });
  });
});
