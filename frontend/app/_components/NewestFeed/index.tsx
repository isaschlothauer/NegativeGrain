import { imageFeedArrayProps } from '../ImageDisplayPanel'
import Image from 'next/image'
interface NewestImageFeedProps {
  imageData: imageFeedArrayProps[];
}

export default function NewestImageFeed ({ imageData } : NewestImageFeedProps) {

  console.log("imageData: ", imageData);
  return (
    <>
      Recent Image Feed
      {imageData.map(item => {
        return (
          <div>
            <Image
              src={`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_IMAGE_STORAGE}/${item.file_name}`}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        )
      })}
    </>
  )
} 