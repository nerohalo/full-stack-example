import { describe, test, expect } from "vitest";

import { css, cx } from "../css";

describe("css", () => {
  test("should be a css function", () => {
    expect(css).toBeDefined();
    expect(css({ bgColor: "black" })).toEqual("radix-bg-c_black");
  });

  test("should be a cx function", () => {
    expect(typeof cx).toBe("function");
  });
});
