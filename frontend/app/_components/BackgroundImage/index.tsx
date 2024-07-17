import Image from 'next/image';

export interface ImageProps {
  alt: string,
  src: string,
  width: number,
  height: number,
  sizes: string,
  style: {
    width: string,
    height: string
  }
  
}

export default function BackgroundImage ({ alt, src, width, height, sizes, style}: ImageProps) {
  return <Image src={src} alt={alt} width={width} height={height} sizes={sizes} style={style} />
}

