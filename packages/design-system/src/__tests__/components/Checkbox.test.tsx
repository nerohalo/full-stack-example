import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import { Checkbox } from "../../components";
import { setupStrictMode } from "../utils";

describe("Checkbox", () => {
  setupStrictMode();

  test("should render a checkbox", () => {
    render(
      <Checkbox />
    );

    expect(screen.getByRole("checkbox")).toBeTruthy();
  });
});
