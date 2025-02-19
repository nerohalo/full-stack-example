import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import TodoList from "@/components/TodoList";
import { useGetTodos, getGetTodosResponseMock } from "@/gen/api";
import { useIsMobile } from "@/hooks";

vi.mock("@/gen/api", async(importOriginal) => ({
  ...await importOriginal<typeof import("@/gen/api")>(),
  useGetTodos: vi.fn(),
}));

vi.mock("@/hooks", () => ({
  useIsMobile: vi.fn(),
}));

vi.mock("@/components/TodoList/DesktopView", () => ({
  __esModule: true,
  default: ({ todos }: { todos: any }) => (
    <div data-testid="desktop-view">{`DesktopView: ${JSON.stringify(todos)}`}</div>
  ),
}));

vi.mock("@/components/TodoList/MobileView", () => ({
  __esModule: true,
  default: ({ todos }: { todos: any }) => (
    <div data-testid="mobile-view">{`MobileView: ${JSON.stringify(todos)}`}</div>
  ),
}));

describe("TodoList", () => {
  let useIsMobileMock: any;
  let useGetTodosQueryMock: any;

  const mockData = getGetTodosResponseMock();

  beforeEach(() => {
    useIsMobileMock = useIsMobile;
    useGetTodosQueryMock = useGetTodos;

    vi.clearAllMocks();
  });

  it("renders loading state when data is being fetched", () => {
    useIsMobileMock.mockReturnValue(false);
    useGetTodosQueryMock.mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<TodoList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders DesktopView when not mobile", () => {
    useIsMobileMock.mockReturnValue(false);
    useGetTodosQueryMock.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<TodoList />);

    expect(screen.getByTestId("desktop-view")).toBeInTheDocument();
    expect(screen.getByTestId("desktop-view")).toHaveTextContent(
      `DesktopView: ${JSON.stringify(mockData)}`
    );
  });

  it("renders MobileView when mobile", () => {
    useIsMobileMock.mockReturnValue(true);
    useGetTodosQueryMock.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<TodoList />);

    expect(screen.getByTestId("mobile-view")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-view")).toHaveTextContent(
      `MobileView: ${JSON.stringify(mockData)}`
    );
  });

  it("handles empty data gracefully", () => {
    useIsMobileMock.mockReturnValue(false);
    useGetTodosQueryMock.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<TodoList />);

    expect(screen.getByTestId("desktop-view")).toBeInTheDocument();
    expect(screen.getByTestId("desktop-view")).toHaveTextContent("DesktopView: []");
  });
});
