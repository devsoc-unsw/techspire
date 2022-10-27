import { useEffect } from "react";

const useFixedVh = () => {
  useEffect(() => {
    const resetHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight / 100}px`
      );
    };
    resetHeight();
    window.addEventListener("resize", resetHeight);

    return () => {
      window.removeEventListener("resize", resetHeight);
    };
  }, []);
};

export default useFixedVh;
