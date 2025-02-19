import {
  Fragment,
  type ReactNode,
  type RefObject,
  useMemo,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import ReactDOM from "react-dom";

type Lazy<T> = () => T;
export type PortalContainer = string | Element | RefObject<Element | null> | null | undefined;

export type PortalProps = {
  children: ReactNode,
  targetSelector: PortalContainer | Lazy<PortalContainer>,
  renderWithoutTarget?: boolean,
};

export const getPortalContainer = (container: PortalContainer | Lazy<PortalContainer>): Element | null => {
  const selector = typeof container === "function" ? container() : container;

  if (!selector) {
    return null;
  }

  if (typeof selector === "string") {
    return document.querySelector(selector);
  }

  if ("current" in selector) {
    return selector.current;
  }

  return selector;
};

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const Portal = ({
  children,
  targetSelector,
  renderWithoutTarget = false,
}: PortalProps) => {
  const [computedRoot, setComputedRoot] = useState<Element | null>(null);

  const resolvedTargetSelector = useMemo(() =>
    typeof targetSelector === "function" ? undefined : targetSelector,
  [targetSelector]
  );

  const targetElement = useMemo(() => getPortalContainer(resolvedTargetSelector), [resolvedTargetSelector]);

  useIsomorphicLayoutEffect(() => {
    const updateRoot = () => {
      const newRoot = getPortalContainer(targetSelector);
      if (newRoot !== computedRoot) {
        setComputedRoot(newRoot);
      }
    };

    updateRoot();

    const observer = new MutationObserver(updateRoot);

    if (targetElement instanceof Element) {
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [targetSelector, targetElement]);

  if (!computedRoot && renderWithoutTarget) {
    return <Fragment>{children}</Fragment>;
  }

  if (!computedRoot) {
    return null;
  }

  return ReactDOM.createPortal(children, computedRoot);
};

Portal.displayName = "Portal";
