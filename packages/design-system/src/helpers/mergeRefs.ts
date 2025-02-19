export const mergeRefs = (...refs: Array<any>) => (element: HTMLElement | null) => {
  for (const ref of refs) {
    if (!ref) {
      continue;
    }

    if (typeof ref === "function") {
      ref(element);
    } else {
      ref.current = element;
    }
  }
};
