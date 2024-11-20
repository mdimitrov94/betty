import { useEffect, useRef, useState } from "react";

export const useImageSize = () => {
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [offset, setOffset] = useState(dimensions.width);

  const updateOffset = () => {
    if (mainContainerRef.current) {
      setDimensions({
        width: mainContainerRef.current.clientWidth,
        height: mainContainerRef.current.clientHeight,
      });
      setOffset(-mainContainerRef.current.clientWidth);
    }
  };

  useEffect(() => {
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => {
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  return { ref: mainContainerRef, dimensions, offset, setOffset };
};
