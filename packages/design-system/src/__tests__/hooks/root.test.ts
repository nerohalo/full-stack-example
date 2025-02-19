import { useSetupFloating, useResizeObserver, useCalculateProgressCircle } from "../../hooks";

describe("Re-exported hooks from index", () => {
  it("should export useSetupFloating", () => {
    expect(useSetupFloating).toBeDefined();
    expect(typeof useSetupFloating).toBe("function");
  });

  it("should export useResizeObserver", () => {
    expect(useResizeObserver).toBeDefined();
    expect(typeof useResizeObserver).toBe("function");
  });

  it("should export useCalculateProgressCircle", () => {
    expect(useCalculateProgressCircle).toBeDefined();
    expect(typeof useCalculateProgressCircle).toBe("function");
  });
});
