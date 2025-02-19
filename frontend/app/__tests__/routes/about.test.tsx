import { render, screen } from "@testing-library/react";

import About from "@/routes/about";

describe("About Component", () => {
  it("renders the correct content", () => {
    render(<About />);

    expect(screen.getByText("about page")).toBeInTheDocument();
  });
});
