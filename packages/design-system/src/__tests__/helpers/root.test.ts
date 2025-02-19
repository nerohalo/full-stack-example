import { mergeRefs, generateRandomHex, filterDOMProps } from "../../helpers";

describe("Re-exported functions from index", () => {
  it("should export mergeRefs", () => {
    expect(mergeRefs).toBeDefined();
    expect(typeof mergeRefs).toBe("function");
  });

  it("should export generateRandomHex", () => {
    expect(generateRandomHex).toBeDefined();
    expect(typeof generateRandomHex).toBe("function");
  });

  it("should export filterDOMProps", () => {
    expect(filterDOMProps).toBeDefined();
    expect(typeof filterDOMProps).toBe("function");
  });
});
