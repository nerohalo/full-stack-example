import { render, screen } from "@testing-library/react";
import { Fragment, useRef } from "react";
import { describe, it, expect } from "vitest";

import { Portal } from "../../components";
import { setupStrictMode } from "../utils";

describe("Portal", () => {
  setupStrictMode();

  const testContent = "Portal Content";
  const targetId = "test-portal";

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should render children in target element", () => {
    const target = document.createElement("div");
    target.id = targetId;
    document.body.appendChild(target);

    render(
      <Portal targetSelector={`#${targetId}`}>
        {testContent}
      </Portal>
    );

    expect(target).toHaveTextContent(testContent);
    expect(screen.getByText(testContent)).toBe(target);
  });

  it("should return null when target not found and renderWithoutTarget=false", () => {
    render(
      <Portal targetSelector="#non-existent">
        {testContent}
      </Portal>
    );

    expect(screen.queryByText(testContent)).not.toBeInTheDocument();
  });

  it("should render in-place when target not found and renderWithoutTarget=true", () => {
    const { container } = render(
      <Portal targetSelector="#non-existent" renderWithoutTarget>
        {testContent}
      </Portal>
    );

    expect(container).toHaveTextContent(testContent);
  });

  it("should handle function-based target selector", () => {
    const target = document.createElement("div");
    target.id = targetId;
    document.body.appendChild(target);

    render(
      <Portal targetSelector={() => `#${targetId}`}>
        {testContent}
      </Portal>
    );

    expect(target).toHaveTextContent(testContent);
  });

  it("should update when lazy target changes", async() => {
    const { rerender } = render(
      <Portal targetSelector={() => null} renderWithoutTarget>
        {testContent}
      </Portal>
    );

    const dynamicTarget = document.createElement("div");
    dynamicTarget.id = targetId;
    document.body.appendChild(dynamicTarget);

    rerender(
      <Portal targetSelector={() => document.getElementById(targetId)}>
        {testContent}
      </Portal>
    );

    expect(dynamicTarget).toHaveTextContent(testContent);
  });

  it("should handle ref object targets", () => {
    const TestComponent = () => {
      const targetRef = useRef<HTMLDivElement>(null);

      return (
        <Fragment>
          <div ref={targetRef} data-testid="portal-target" />
          <Portal targetSelector={targetRef}>
            <div>Portal Content</div>
          </Portal>
        </Fragment>
      );
    };

    render(<TestComponent />);

    const portalTarget = screen.getByTestId("portal-target");

    const portalContent = screen.getByText("Portal Content");

    expect(portalTarget).toContainElement(portalContent);
    expect(portalContent).toBeInTheDocument();
    expect(portalContent.parentElement).toBe(portalTarget);
  });

  it("should handle null/undefined targets", () => {
    const { container } = render(
      <Portal targetSelector={null} renderWithoutTarget>
        {testContent}
      </Portal>
    );

    expect(container).toHaveTextContent(testContent);
  });

  it("should clean up portal when unmounting", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);

    const { unmount } = render(
      <Portal targetSelector={target}>
        {testContent}
      </Portal>
    );

    expect(target).toHaveTextContent(testContent);
    unmount();
    expect(target).toBeEmptyDOMElement();
  });

  it("should have proper display name", () => {
    expect(Portal.displayName).toBe("Portal");
  });
});
