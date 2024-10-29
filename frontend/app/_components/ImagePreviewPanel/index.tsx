import { useEffect } from 'react';
import { ImageFeedArrayProps } from '../ImageDisplayPanel'
import Image from 'next/image';
import styles from './index.module.css';

import { imageModal } from '../ImageModal';

// Mantine modal component 
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export default function ImagePreviewPanel ({imageData} : {imageData: ImageFeedArrayProps}) {
  // for Mantine modal 
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className={styles.panelStyle}>
        <Modal 
          opened={opened} 
          onClose={close} 
          // title={imageData.title}
          transitionProps={{ transition: 'fade', duration: 200 }}
          fullScreen={true}
          className={styles.modalStyle}
        >
          {imageModal(imageData)}
        </Modal>
        <div className={styles.clickableThumbnail} role='button' onClick={open} >
          <Image
            src={`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_IMAGE_STORAGE}/thumbnails/${process.env.NEXT_PUBLIC_THUMBNAIL}${imageData.file_name}`}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={0}
            height={0}
            alt={imageData.caption}
            loading="lazy"
          />
          <p className={styles.imagePanel}>{imageData.username}</p>
        </div>
      </div>
    </>
  )
}