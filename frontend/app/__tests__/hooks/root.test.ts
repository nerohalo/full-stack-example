import { useIsMobile } from "@/hooks";

describe("Re-exported hooks from index", () => {
  it("should export useIsMobile", () => {
    expect(useIsMobile).toBeDefined();
    expect(typeof useIsMobile).toBe("function");
  });
});
