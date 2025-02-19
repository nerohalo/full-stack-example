import type { IconButtonRecipeVariantProps } from "@css/styled-system/recipes";
import { IconButton, Tooltip } from "design-system";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/providers";

export default function ThemeToggle(props: IconButtonRecipeVariantProps) {
  const {
    size,
    color = "gray",
    ...rest
  } = props;
  const { setTheme, theme } = useTheme();

  const renderToggleIcon = () => {
    if (theme === "dark") {
      return <Sun />;
    }

    return <Moon />;
  };

  return (
    <Tooltip
      config={{
        offset: 12,
      }}
    >
      <Tooltip.Trigger>
        <IconButton
          {...rest}
          size={size}
          color={color}
          onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {renderToggleIcon()}
        </IconButton>
      </Tooltip.Trigger>
      <Tooltip.Layer>
        <Tooltip.Layer.Arrow />
        set to {theme === "dark" ? "light" : "dark"} mode
      </Tooltip.Layer>
    </Tooltip>
  );
}
