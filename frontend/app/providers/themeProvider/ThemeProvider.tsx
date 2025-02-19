import React, { useCallback, useEffect, useState } from "react";

import { Provider, AvailableThemes, ThemeContextType } from "./themeContext";

const isBrowser = typeof window !== "undefined";

const safeLocalStorage = {
  getItem: (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore write errors
    }
  },
};

const getSystemTheme = (): AvailableThemes => {
  if (!isBrowser) {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (
  theme: AvailableThemes,
  attribute: string,
  enableColorScheme: boolean,
  themes: Array<string>
) => {
  const doc = document.documentElement;

  themes.forEach((t) => doc.classList.remove(t));
  if (attribute) {
    doc.removeAttribute(attribute);
  }

  if (enableColorScheme) {
    doc.style.colorScheme = "";
  }

  if (theme === "system") {
    const systemTheme = getSystemTheme();
    if (attribute) {
      doc.setAttribute(attribute, systemTheme);
    } else {
      doc.classList.add(systemTheme);
    }
    if (enableColorScheme) {
      doc.style.colorScheme = systemTheme;
    }
  } else {
    if (attribute) {
      doc.setAttribute(attribute, theme);
    } else {
      doc.classList.add(theme);
    }
    if (enableColorScheme) {
      doc.style.colorScheme = theme;
    }
  }
};

const getInitialTheme = (
  defaultTheme: AvailableThemes,
  enableSystem: boolean
): AvailableThemes => {
  const storedTheme = safeLocalStorage.getItem("theme") as AvailableThemes | null;

  if (storedTheme) {
    return storedTheme;
  }

  if (enableSystem && isBrowser) {
    return getSystemTheme();
  }

  return defaultTheme;
};

type ThemeProviderProps = {
  children?: React.ReactNode,
  enableColorScheme?: boolean,
  enableSystem?: boolean,
  themes?: Array<string>,
  defaultTheme?: ThemeContextType["theme"],
  value?: { theme: AvailableThemes, setTheme: ThemeContextType["setTheme"] },
  attribute?: string,
  onThemeChange?: (theme: AvailableThemes) => void,
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  enableColorScheme = false,
  enableSystem = true,
  themes = ["light", "dark", "system"],
  defaultTheme = "light",
  value,
  attribute = "data-theme",
  onThemeChange,
}) => {
  const [themeState, setThemeState] = useState<AvailableThemes>(() =>
    value?.theme ?? getInitialTheme(defaultTheme, enableSystem)
  );

  const setTheme = useCallback(
    (newTheme: AvailableThemes) => {
      setThemeState(newTheme);
      safeLocalStorage.setItem("theme", newTheme);
      applyTheme(newTheme, attribute, enableColorScheme, themes);
      onThemeChange?.(newTheme);
    },
    [attribute, enableColorScheme, themes, onThemeChange]
  );

  useEffect(() => {
    if (themeState === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        applyTheme("system", attribute, enableColorScheme, themes);
        onThemeChange?.("system");
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [themeState, attribute, enableColorScheme, themes, onThemeChange]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "theme" && event.newValue) {
        setTheme(event.newValue as AvailableThemes);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setTheme]);

  useEffect(() => {
    if (value?.theme && value.theme !== themeState) {
      setTheme(value.theme);
    }
  }, [value?.theme, setTheme, themeState]);

  useEffect(() => {
    applyTheme(themeState, attribute, enableColorScheme, themes);
  }, [themeState, attribute, enableColorScheme, themes]);

  return (
    <Provider value={{ theme: themeState, setTheme }}>
      {children}
    </Provider>
  );
};
