import { imageFeedArrayProps } from '../ImageDisplayPanel'

interface NewestImageFeedProps {
  imageData: imageFeedArrayProps[];
}

export default function NewestFeed ({ imageData } : NewestImageFeedProps) {

  console.log(imageData)
  return (
    <>
      User Feed
    </>
  )
}