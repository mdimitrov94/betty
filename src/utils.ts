export const TRANSITION_DELAY_MS = 300

export const fetchImages = (count: number) => {
  const images = Array.from({ length: count }).map(async () => {
    const data = await fetch("https://picsum.photos/200");
    return data.url;
  });
  return Promise.all(images);
};

export const getImageSrc = ({
  images,
  index,
  type,
}: {
  images: string[];
  index: number;
  type: "prev" | "next";
}): string => {
  if (type === "prev") {
    return index === 0 ? images[images.length - 1] : images[index - 1];
  } else {
    return index === images.length - 1 ? images[0] : images[index + 1];
  }
};
