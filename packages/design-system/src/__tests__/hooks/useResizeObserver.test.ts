import { renderHook, act } from "@testing-library/react";
import type { RefObject } from "react";

import { useResizeObserver } from "../../hooks";

class MockResizeObserver {
  private readonly callback: (entries: Array<ResizeObserverEntry>) => void;

  constructor(callback: (entries: Array<ResizeObserverEntry>) => void) {
    this.callback = callback;

    MockResizeObserver.createdInstances.push(this);
  }

  observe(element: Element) {
    this.callback([
      {
        target: element,
        contentRect: element.getBoundingClientRect(),
      } as ResizeObserverEntry,
    ]);
  }

  unobserve() {}

  disconnect() {}

  trigger(entries: Array<ResizeObserverEntry>) {
    this.callback(entries);
  }

  // eslint-disable-next-line no-use-before-define
  static createdInstances: Array<InstanceType<typeof MockResizeObserver>> = [];
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

const createMockElement = (width: number, height: number) => ({
  getBoundingClientRect: vi.fn(() => ({
    width,
    height,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    toJSON: () => {},
  })),
  clientWidth: width,
  clientHeight: height,
} as unknown as Element);

describe("useResizeObserver", () => {
  beforeEach(() => {
    MockResizeObserver.createdInstances = [];
  });

  it("should initialize with default sizes", () => {
    const { result } = renderHook(() => useResizeObserver({}));
    expect(result.current).toEqual({ width: 1, height: 1 });
  });

  it("should observe and return element sizes when resizing", () => {
    const mockElement = createMockElement(100, 200);
    const ref: RefObject<Element | null> = { current: mockElement };

    const { result } = renderHook(() =>
      useResizeObserver({
        ref,
      })
    );

    expect(result.current).toEqual({ width: 100, height: 200 });

    act(() => {
      mockElement.getBoundingClientRect = vi.fn(() => ({
        width: 150,
        height: 300,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        toJSON: () => {},
      }));

      const activeObserver = MockResizeObserver.createdInstances[0];
      activeObserver.trigger([
        {
          target: mockElement,
          contentRect: mockElement.getBoundingClientRect(),
        } as ResizeObserverEntry,
      ]);
    });

    expect(result.current).toEqual({ width: 150, height: 300 });
  });

  it("should trigger onResize callback when size changes", () => {
    const mockElement = createMockElement(200, 400);
    const ref: RefObject<Element | null> = { current: mockElement };
    const mockOnResize = vi.fn();

    renderHook(() =>
      useResizeObserver({
        ref,
        onResize: mockOnResize,
      })
    );

    act(() => {
      mockElement.getBoundingClientRect = vi.fn(() => ({
        width: 250,
        height: 500,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        toJSON: () => {},
      }));

      const activeObserver = MockResizeObserver.createdInstances[0];
      activeObserver.trigger([
        {
          target: mockElement,
          contentRect: mockElement.getBoundingClientRect(),
        } as ResizeObserverEntry,
      ]);
    });

    expect(mockOnResize).toHaveBeenCalledWith({ width: 250, height: 500 });
  });

  it("should disconnect observer on unmount", () => {
    const mockElement = createMockElement(100, 200);
    const ref: RefObject<Element | null> = { current: mockElement };

    const disconnectSpy = vi.fn();
    MockResizeObserver.prototype.disconnect = disconnectSpy;

    const { unmount } = renderHook(() =>
      useResizeObserver({
        ref,
      })
    );

    unmount();

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });
});
