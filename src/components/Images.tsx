import { useState } from "react";
import { useImages } from "../hooks/useImages";
import { useImageSize } from "../hooks/useImageSize";
import { getImageSrc, TRANSITION_DELAY_MS } from "../utils";
import Loader from "./Loader";
import Image from "./Image";

const Images = ({ count }: { count: number }) => {
  const [index, setIndex] = useState(0);
  const { images, isLoading } = useImages(count);
  const { ref, dimensions, offset, setOffset } = useImageSize();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    if (e.deltaY > 0) {
      setOffset(0);
      setTimeout(() => {
        setIndex(
          (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
        setOffset(-dimensions.width);
        setIsTransitioning(false);
      }, TRANSITION_DELAY_MS);
    } else {
      setOffset(-2 * dimensions.width);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
        setOffset(-dimensions.width);
        setIsTransitioning(false);
      }, TRANSITION_DELAY_MS);
    }
  };

  const transitionClassNames = isTransitioning
    ? `duration-300 ease-linear transition-left`
    : "";

  return (
    <div>
      <Loader isLoading={isLoading} />
        <button
          onClick={() => window.location.reload()}
          className="absolute p-2 bg-blue-500 disabled:bg-blue-400 text-white rounded-md"
        >
          Change image count
        </button>
      <div className="flex justify-center items-center h-screen px-10">
        <div
          ref={ref}
          onWheel={handleScroll}
          className="relative max-w-[500px] w-full aspect-video overflow-hidden"
        >
          <div
            className={`absolute flex ${transitionClassNames}`}
            style={{ left: offset }}
          >
            <Image
              key={crypto.randomUUID()}
              src={getImageSrc({ images, index, type: "prev" })}
              dimensions={dimensions}
            />
            <Image
              key={crypto.randomUUID()}
              src={images[index]}
              dimensions={dimensions}
            />
            <Image
              key={crypto.randomUUID()}
              src={getImageSrc({ images, index, type: "next" })}
              dimensions={dimensions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
