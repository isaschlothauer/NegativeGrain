import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ImageFeedArrayProps } from '../ImageDisplayPanel';
import styles from './index.module.css';
import DateFormatter from '../../_services/DateFormatConverter';
import Clipboard from '../../../public/icons/clipboard.png';
import ClipboardCheck from '../../../public/icons/clipboard-check.png';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const imageModal = (fileData: ImageFeedArrayProps) => {
  const imageFileName: string = fileData.file_name;

  const router = useRouter();

  // Favorite icon trigger color
  const [ favorite, setFavorite ] = useState<boolean | undefined>(fileData.is_favorite as unknown as boolean);

  // Date reformat
  const datePosted = DateFormatter(fileData.created_at as Date);

  // useEffect(() => {
  //   const handleFavoriteUpdates = async () => {
  // try {

  //     const response =  await axios.put(
  //       `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_FAVORITE}`, 
  //       { favorite, imageFileName },
  //       { withCredentials: true }
  //     );
  //     console.log('Favorite updated successfully:', await response);
  //   }
  //   catch (error: unknown) {
  //     console.error('favorite update error: ', error);
  //   }

  //   }
  //   handleFavoriteUpdates();
  // }, [favorite])

  // useEffect(() => {
  //   console.log("favorite", favorite);
  // }, [favorite])
  const handleFavoriteUpdates:() => void = async () => {
    // setFavorite((prevState) => !prevState);
    !favorite? setFavorite(true) : setFavorite(false);
    try {
        const response =  await axios.put(
          `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_FAVORITE}`, 
          { favorite, imageFileName },
          { withCredentials: true }
        );
        // console.log('Favorite updated successfully:', response);
      }
      catch (error: unknown) {
        console.error('favorite update error: ', error);
      }

    // console.log(favorite)
    }

    console.log(favorite);

  const linkedIconTrigger = () => {

    // Clipboard icon selector
    const imageSrc = favorite? ClipboardCheck : Clipboard;  
    // let imageSrc: React.Component
    return (
      <button 
        className={styles.favoriteIconContainer}
        onClick={handleFavoriteUpdates}
      >
        <Image
          src={imageSrc}
          width={24}
          height={24}
          alt='Favorite image icon'
          className={styles.iconStyles}
          loading="lazy"
        />
      </button>
    );
  }

  return (
    <>
      <div className={styles.imageModal}>
        <div className={styles.imageContainer}>
          <Image
            src={`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_IMAGE_STORAGE}/${imageFileName}`}
            style={{
              width: 'auto',
              height: 'auto',
              objectFit: 'contain'
            }}
            unoptimized
            width={0}
            height={0}
            alt={fileData.caption}
            className={styles.modalImage}
            loading="lazy"
          />
          <div className={styles.modalImageDataContainer}> 
            <div>{fileData.username}</div>
            <div>{fileData.caption} test test test test test test test test test test test test test test </div>
            {/* <div>{fileData.}</div> */}



            {/* <div className={styles.modalImageDetails}> */}
              {/* <div>{fileData.username}</div> */}
              {/* <div>{fileData.title}</div> */}
              {/* {linkedIconTrigger()} */}
              {/* <div className={styles.modalImageDate}>{datePosted}</div> */}
            {/* </div> */}

            {/* <div className={styles.imageData}> */}

              {/* Column 1 */}
              {/* <div> */}
                {/* <div>{fileData.caption}</div> */}
              {/* </div> */}

              {/* Column 2 */}
              {/* <div> */}
                {/* <div>Photographer:</div> */}
                  {/* {fileData.} */}

                  {/* CREATE LIST OF IMAGE DETAILS */}
              {/* </div> */}
            </div>




            {/* <div>{fileData.username}</div> */}
          {/* </div> */}
          {/* <div className={styles.modalImageDateContainer}>
            <div className={styles.modalImageDate}>{datePosted}</div>*/}
          {/* </div>  */}
        </div>
      </div>
    </>
  )
}