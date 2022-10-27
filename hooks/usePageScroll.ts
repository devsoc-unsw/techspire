import { MutableRefObject, useCallback, useRef, useState } from "react";

const usePageScroll = (
  pages: number,
  throttle: number,
  predicate?: () => boolean
): [
  MutableRefObject<boolean>,
  (_direction: number) => void,
  number,
  (_focusedPage: number) => void
] => {
  const [focusedPage, _setFocusedPage] = useState(0);
  const scrolling = useRef(false);

  const setFocusedPage = useCallback(
    (focusedPage: number) => {
      _setFocusedPage(focusedPage);
      scrolling.current = true;
      setTimeout(() => {
        scrolling.current = false;
      }, throttle);
    },
    [throttle]
  );

  const handleScroll = useCallback(
    (direction: number) => {
      if (predicate?.()) {
        return;
      }

      if (direction < 0 && focusedPage > 0) {
        setFocusedPage(focusedPage - 1);
      } else if (direction > 0 && focusedPage < pages) {
        setFocusedPage(focusedPage + 1);
      }
    },
    [focusedPage, pages, predicate, setFocusedPage]
  );

  return [scrolling, handleScroll, focusedPage, setFocusedPage];
};

export default usePageScroll;
