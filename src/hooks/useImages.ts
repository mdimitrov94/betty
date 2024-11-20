import { useEffect, useState } from "react";
import { fetchImages } from "../utils";

export const useImages = (count: number) => {
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      fetchImages(count)
        .then((data) => setImages(data))
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }, [count]);
  
    return { images, isLoading };
  };