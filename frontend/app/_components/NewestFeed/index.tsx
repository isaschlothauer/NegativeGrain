// import { imageFeedArrayProps } from '../ImageDisplayPanel'
// import Image from 'next/image'
// import styles from './index.module.css'

// interface NewestImageFeedProps {
//   imageData: imageFeedArrayProps[];
// }

// export default function NewestImageFeed ({ imageData } : NewestImageFeedProps) {

//   console.log("imageData: ", imageData);
//   return (
//     <>
//       Recent Image Feed
//       {imageData.map(item => {
//         return (
//           // <div className={styles.newImageFeedContainer}>
//           //   <Image
//           //     src={`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_IMAGE_STORAGE}/thumbnails/${item.file_name}`}
//           //     sizes="100vw"
//           //     style={{
//           //       width: '100vw',
//           //       height: 'auto',
//           //     }}
//           //     width={0}
//           //     height={0}
//           //     alt="Picture of the author"
//           //   />
//           // </div>
//         )
//       })}
//     </>
//   )
// } 