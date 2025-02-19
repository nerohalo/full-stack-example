import { renderHook } from "@testing-library/react";
import { useResizeObserver } from "design-system";
import { Mock } from "vitest";

import { useIsMobile } from "@/hooks/useIsMobile";

vi.mock("design-system", () => ({
  useResizeObserver: vi.fn(),
}));

describe("useIsMobile", () => {
  it("returns true when the width is less than 768px", () => {
    (useResizeObserver as Mock).mockImplementation(() => ({ width: 500 }));

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("returns false when the width is greater than or equal to 768px", () => {
    (useResizeObserver as Mock).mockImplementation(() => ({ width: 800 }));

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });
});
