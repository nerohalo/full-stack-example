import { useResizeObserver } from "design-system";

export const useIsMobile = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const { width } = useResizeObserver({ element: document.body });

  return width < 768;
};
