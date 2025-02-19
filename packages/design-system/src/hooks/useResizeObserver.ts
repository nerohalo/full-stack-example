import { useEffect, useState } from "react";
import type { RefObject } from "react";

type DOMRectReadOnly = {
  readonly height: number,
  readonly width: number,
};

type useResizeObserverProperties = {
  /**
   * Ref object from `useRef`.
   */
  ref?: RefObject<Element | null> | null,

  /**
   * DOM element. E.g. from `querySelector()`
   */
  element?: Element | null | undefined,

  /**
   * Callback to fire when the observed component or Element
   * resizes.
   */
  onResize?: ({ width, height }: { width: number, height: number }) => void,
};

export const useResizeObserver = ({
  ref,
  element,
  onResize,
}: useResizeObserverProperties) => {
  const [sizes, setSizes] = useState<DOMRectReadOnly>({
    height: 1,
    width: 1,
  });

  const handleResize = (entries: Array<ResizeObserverEntry>) => {
    const entry = entries[0];
    const width = entry.contentBoxSize ? entry.contentBoxSize[0].inlineSize : entry.contentRect.width;
    const height = entry.contentBoxSize ? entry.contentBoxSize[0].blockSize : entry.contentRect.height;

    if (onResize) {
      onResize({ width, height });
    }

    setSizes({ height, width });
  };

  const [resizeObs] = useState(() => new ResizeObserver(handleResize));

  useEffect(() => {
    if (!resizeObs) {
      return;
    }

    let domNode;

    if (ref) {
      domNode = ref.current;
    } else if (element) {
      domNode = element;
    }

    if (domNode) {
      resizeObs.observe(domNode);
    }

    return () => {
      resizeObs.disconnect();
    };
  }, [ref, resizeObs, element]);

  return sizes;
};
