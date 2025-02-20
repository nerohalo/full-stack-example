import { describe, it, expect } from "vitest";

import { css, cx } from "../css";

describe("css", () => {
  it("should be a css function", () => {
    expect(css).toBeDefined();
    expect(css({ bgColor: "black" })).toEqual("radix-bg-c_black");
  });

  it("should be a cx function", () => {
    expect(typeof cx).toBe("function");
  });
});
