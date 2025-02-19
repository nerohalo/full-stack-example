import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";

import { ThemeProvider, type AvailableThemes, useTheme } from "@/providers";

function ChildComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button type="button" onClick={() => setTheme("light")}>Light</button>
      <button type="button" onClick={() => setTheme("dark")}>Dark</button>
      <button type="button" onClick={() => setTheme("system")}>System</button>
    </div>
  );
}

function TestComponent({ onThemeChange }: { onThemeChange?: (theme: AvailableThemes) => void }) {
  return (
    <ThemeProvider
      enableSystem={false}
      defaultTheme="light"
      onThemeChange={onThemeChange}
      attribute="data-theme"
    >
      <ChildComponent />
    </ThemeProvider>
  );
}

describe("ThemeProvider", () => {
  let storageMock: Record<string, string>;
  let mediaQueryListeners: Array<(event: MediaQueryListEvent) => void>;

  beforeEach(() => {
    storageMock = {};
    mediaQueryListeners = [];

    document.documentElement.removeAttribute("data-theme");
    document.documentElement.className = "";

    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key: string) => storageMock[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        storageMock[key] = value;
      }),
      clear: vi.fn(() => {
        storageMock = {};
      }),
    });

    vi.stubGlobal("matchMedia", vi.fn((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn((_event: string, listener: (event: MediaQueryListEvent) => void) => {
        mediaQueryListeners.push(listener);
      }),
      removeEventListener: vi.fn(),
    })));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.documentElement.removeAttribute("data-theme");
    localStorage.clear();
  });

  it("should initialize with light theme by default", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("current-theme").textContent).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("should initialize with theme from localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(<TestComponent />);
    expect(screen.getByTestId("current-theme").textContent).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("should update theme and localStorage when setTheme is called", async() => {
    const user = userEvent.setup();
    render(<TestComponent />);

    await user.click(screen.getByText("Dark"));
    expect(screen.getByTestId("current-theme").textContent).toBe("dark");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("should respond to system theme changes", async() => {
    render(
      <ThemeProvider enableSystem={true}>
        <ChildComponent />
      </ThemeProvider>
    );

    await userEvent.click(screen.getByText("System"));

    act(() => {
      mediaQueryListeners.forEach((listener) => {
        vi.stubGlobal("matchMedia", vi.fn(() => ({
          matches: true,
          media: "",
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })));

        listener({
          matches: true,
          media: "(prefers-color-scheme: dark)",
        } as MediaQueryListEvent);
      });
    });

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("should handle storage events from other tabs", () => {
    class MockStorage implements Storage {
      private store = new Map<string, string>();
      getItem(key: string) {
        return this.store.get(key) ?? null;
      }
      setItem(key: string, value: string) {
        this.store.set(key, value);
      }
      removeItem(key: string) {
        this.store.delete(key);
      }
      clear() {
        this.store.clear();
      }
      get length() {
        return this.store.size;
      }
      key(index: number) {
        return Array.from(this.store.keys())[index] ?? null;
      }
    }

    const mockStorage = new MockStorage();
    vi.stubGlobal("localStorage", mockStorage);

    render(<TestComponent />);

    act(() => {
      const event = new Event("storage", { bubbles: true }) as StorageEvent;
      Object.defineProperties(event, {
        key: { value: "theme" },
        newValue: { value: "dark" },
        storageArea: { value: mockStorage },
      });
      window.dispatchEvent(event);
    });

    expect(screen.getByTestId("current-theme").textContent).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("should call onThemeChange callback when theme changes", async() => {
    const user = userEvent.setup();
    const mockCallback = vi.fn();
    render(<TestComponent onThemeChange={mockCallback} />);

    await user.click(screen.getByText("Dark"));
    expect(mockCallback).toHaveBeenCalledWith("dark");
  });

  it("should handle system theme when enableSystem is true", () => {
    vi.stubGlobal("matchMedia", vi.fn(() => ({
      matches: true,
      media: "",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })));

    render(
      <ThemeProvider enableSystem={true}>
        <ChildComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("current-theme").textContent).toBe("dark");
  });
});
