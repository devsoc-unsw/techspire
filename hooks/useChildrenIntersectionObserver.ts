import { useEffect, useState } from "react";
import type { RefObject } from "react";

const useChildrenIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  config = {}
) => {
  const [intersecting, setIntersecting] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        setIntersecting(entries.findIndex((entry) => entry.isIntersecting)),
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
