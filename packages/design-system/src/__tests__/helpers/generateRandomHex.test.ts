import { describe, it, expect } from "vitest";

import { generateRandomHex } from "../../helpers";

describe("generateRandomHex", () => {
  it("should generate a string of the specified size", () => {
    const size = 10;
    const result = generateRandomHex(size);

    expect(result.length).toBe(size);
  });

  it("should generate a valid hexadecimal string", () => {
    const size = 20;
    const result = generateRandomHex(size);

    expect(/^[0-9a-f]+$/.test(result)).toBe(true);
  });

  it("should generate different results for successive calls", () => {
    const size = 16;
    const firstResult = generateRandomHex(size);
    const secondResult = generateRandomHex(size);

    expect(firstResult).not.toBe(secondResult);
  });

  it("should produce an empty string if size is 0", () => {
    const size = 0;
    const result = generateRandomHex(size);

    expect(result).toBe("");
  });

  it("should throw an error if size is negative", () => {
    const size = -5;

    expect(() => generateRandomHex(size)).toThrow();
  });

  it("should produce consistent results given a mock for Math.random", () => {
    const size = 8;

    vi.spyOn(Math, "random").mockImplementation(() => 0.1);

    const result = generateRandomHex(size);

    expect(result).toBe("11111111");

    vi.restoreAllMocks();
  });
});
