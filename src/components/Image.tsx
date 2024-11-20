type ImageProps = {
  src: string;
  dimensions: {
    width: number;
    height: number;
  };
};

const Image = ({ src, dimensions }: ImageProps) => {
  const { width, height } = dimensions;
  return (
    <img src={src} alt={src} style={{ width, height }} className="max-w-none object-cover" />
  );
};
export default Image;
