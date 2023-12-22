import { useState } from "react";
import Image from "next/image";

export default function FallbackImage(props: {
  src?: string | null;
  fallbackSrc: string;
  width: number;
  height: number;
  alt: string;
}) {
  const [img, setImg] = useState<string | null | undefined>(props.src);

  if (!img) {
    return (
      <Image
        width={props.width}
        height={props.height}
        className="object-cover"
        src={props.fallbackSrc}
        alt={props.alt}
      />
    );
  }

  return (
    <Image
      width={props.width}
      height={props.height}
      className="w-full object-cover"
      src={img || props.fallbackSrc}
      alt={props.alt}
      onError={() => {
        setImg(props.fallbackSrc);
      }}
    />
  );
}

export function ProductFallbackImage(props: {
  src?: string | null;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <FallbackImage
      src={props.src}
      fallbackSrc="/products/placeholder.png"
      width={props.width}
      height={props.height}
      alt={props.alt}
    />
  );
}
