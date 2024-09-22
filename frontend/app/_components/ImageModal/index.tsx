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
  const imageFileName: string = fileData['file_name'].replace('tn-', '');

  const router = useRouter();

  // Favorite icon trigger color
  const [ favorite, setFavorite ] = useState<boolean>(false);

  // Date reformat
  const datePosted = DateFormatter(fileData.created_at as Date);

  useEffect(() => {
    const favTrigger = async () => {

      try {
        
        await axios.post(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_FAVORITE}`,
          { favorite },
          {
            withCredentials: true
          }
        )
      }
      catch (err: any) {
        console.error("fTrigger error: ", err.response.status);

        if (err.response.status == 401) {
          router.push('/signoff')
        }
      }
    }

    favTrigger();
  }, [favorite]);

  const linkedIconTrigger = () => {
    const imageSrc = favorite ? ClipboardCheck : Clipboard;  
    return (
      <div 
        role='button'
        onClick={() => setFavorite((prevState) => !prevState)} 
        className={styles.favoriteIconContainer}
        
      >
        <Image
          src={imageSrc}
          width={24}
          height={24}
          alt='Favorite image icon'
          className={styles.iconStyles}
        />
      </div>
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
          />
          <div className={styles.modalImageDataContainer}>
            <div className={styles.modalImageDetails}>
              <div>{fileData.username}</div>
              {linkedIconTrigger()}
            </div>
          </div>
          <div className={styles.modalImageDateContainer}>
            <div className={styles.modalImageDate}>{datePosted}</div>
          </div>
        </div>
      </div>
    </>
  )
}