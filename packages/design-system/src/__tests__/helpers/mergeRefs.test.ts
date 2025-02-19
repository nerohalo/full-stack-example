import { describe, it, expect, vi } from "vitest";

import { mergeRefs } from "../../helpers";

describe("mergeRefs", () => {
  it("should set the element to multiple ref objects", () => {
    const ref1: { current: HTMLElement | null } = { current: null };
    const ref2: { current: HTMLElement | null } = { current: null };

    const element = document.createElement("div");
    const mergedRef = mergeRefs(ref1, ref2);

    mergedRef(element);

    expect(ref1.current).toBe(element);
    expect(ref2.current).toBe(element);
  });

  it("should call all ref functions with the element", () => {
    const refFn1 = vi.fn();
    const refFn2 = vi.fn();

    const element = document.createElement("div");
    const mergedRef = mergeRefs(refFn1, refFn2);

    mergedRef(element);

    expect(refFn1).toHaveBeenCalledTimes(1);
    expect(refFn1).toHaveBeenCalledWith(element);

    expect(refFn2).toHaveBeenCalledTimes(1);
    expect(refFn2).toHaveBeenCalledWith(element);
  });

  it("should support mixing ref objects and ref functions", () => {
    const ref1: { current: HTMLElement | null } = { current: null };
    const refFn2 = vi.fn();

    const element = document.createElement("div");
    const mergedRef = mergeRefs(ref1, refFn2);

    mergedRef(element);

    expect(ref1.current).toBe(element);

    expect(refFn2).toHaveBeenCalledTimes(1);
    expect(refFn2).toHaveBeenCalledWith(element);
  });

  it("should handle null or undefined refs gracefully", () => {
    const ref1: { current: HTMLElement | null } = { current: null };
    const refFn2 = vi.fn();

    const element = document.createElement("div");
    const mergedRef = mergeRefs(ref1, undefined, null, refFn2);

    mergedRef(element);

    expect(ref1.current).toBe(element);
    expect(refFn2).toHaveBeenCalledTimes(1);
    expect(refFn2).toHaveBeenCalledWith(element);
  });

  it("should properly handle null elements", () => {
    const ref1: { current: HTMLElement | null } = { current: null };
    const refFn2 = vi.fn();

    const mergedRef = mergeRefs(ref1, refFn2);

    mergedRef(null);

    expect(ref1.current).toBe(null);
    expect(refFn2).toHaveBeenCalledTimes(1);
    expect(refFn2).toHaveBeenCalledWith(null);
  });
});
