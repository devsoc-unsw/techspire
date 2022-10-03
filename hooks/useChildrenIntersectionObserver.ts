import { useEffect, useState } from "react";
import type { RefObject } from "react";

const useChildrenIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  config = {}
) => {
  const [intersecting, setIntersecting] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        setIntersecting(
          new Set(
            entries
              .map(
                (entry, idx) =>
                  [entry, idx] as [IntersectionObserverEntry, number]
              )
              .filter(([entry]) => entry.isIntersecting)
              .map(([_, idx]) => idx)
          )
        ),
      config
    );
    if (ref.current) {
      Array.from(ref.current.children).forEach((elem) =>
        observer.observe(elem)
      );
    }
    return () => {
      observer.disconnect();
    };
  }, [config, ref]);

  return intersecting;
};

export default useChildrenIntersectionObserver;
