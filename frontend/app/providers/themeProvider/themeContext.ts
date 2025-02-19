import { createContext } from "context";

export type AvailableThemes = "dark" | "light" | "system";

export type ThemeContextType = {
  theme?: AvailableThemes,
  setTheme: (theme: AvailableThemes) => void,
};

export const [Provider, useTheme, ThemeContext] = createContext<ThemeContextType>({
  name: "themeContext",
  strict: false,
});
