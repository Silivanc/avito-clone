import { useState, useEffect, FC } from "react";
import defaultImage from "../assets/defaulImage.png";

type ImageComponentProps = {
  src?: string;
  alt: string;
};

export const ImageComponent: FC<ImageComponentProps> = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState(defaultImage); // Сначала показываем заглушку
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setLoading(false);
    };

    img.onerror = () => {
      setImageSrc(defaultImage);
      setError(true);
      setLoading(false);
    };
  }, [src]);

  return (
    <div className="w-full h-full rounded-md flex-shrink-0 bg-gray-200">
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover rounded-md ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      />
    </div>
  );
};
