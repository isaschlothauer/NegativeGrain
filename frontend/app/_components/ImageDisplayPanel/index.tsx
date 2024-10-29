import styles from './index.module.css';
import { useEffect, useState, useRef } from 'react';

import { Tabs } from '@mantine/core';

// import NewestFeed from '../NewestFeed';
// import UserFeed from '../UserFeed';
import ImagePreviewPanel from '../ImagePreviewPanel';

import FetchFeedData from '../../_services/FetchFeedData';

export interface ImageFeedArrayProps {
  map(arg0: (item: any) => void): string;
  id: number;
  username: string,
  file_name: string,
  title: string,
  location: string,
  created_at: Date,
  storage_url?: string,
  camera_brand: string,
  camera_model: string,
  lens_brand: string,
  lens_model: string,
  lens_focal_length: string,
  lens_aperture: string,
  film_stock: string,
  caption: string,
  is_favorite: number
}

export default function ImageDisplayPanel() {
  const [ imageFeedArray, setImageFeedArray ] = useState<ImageFeedArrayProps[]>([]);

  // User or newest feed mode selector: 1 (newest), 2 (user preference), 3 (discover)
  const [ feedMode, setFeedMode ] = useState<string | null>('1');
  // 
  // const [ feedDisplayLimitter, setFeedDisplayLimitter ] = useState<number>(6);

  // Keeps image feed rendering to a certain number
  let panelFeedLimiterRef = useRef(Number(process.env.NEXT_PUBLIC_DISPLAY_MINIMUM as string));

  // panelFeedLimiterRef.current = panelFeedLimiterRef.current + 12;

  // panelFeedLimitterRef.current = panelFeedLimitterRef.current + 6
  


  // panelFeedLimiterRef.current = panelFeedLimiterRef.current + 6

  useEffect(() => {
    const imageDataFetch = async () => {
      const imageData = await FetchFeedData(feedMode);
      setImageFeedArray(imageData.data.imageData);
    }
    imageDataFetch()
  }, [feedMode]);

  console.log("image feed data: ", imageFeedArray);

  const imageFeedPanel = (imageFeedArray: ImageFeedArrayProps[]) => {
    return (
      <>
        {imageFeedArray.map((item) => (
          // Image thumbnail & modal component
          <ImagePreviewPanel key={item.id} imageData={item} />
        ))}
      </>
    )
  }

  return (
    <section>
      <div className={styles.feedMode}>
        <Tabs value={feedMode} onChange={setFeedMode}>
          <Tabs.List>
            <Tabs.Tab value='1' style={{ fontSize: 24}}>Newest Feed</Tabs.Tab>
            <Tabs.Tab value='2' style={{ fontSize: 24}}>Circle Feed</Tabs.Tab>
            <Tabs.Tab value='3' style={{ fontSize: 24}}>Discovery</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {/* Image feed section */}
        <div className={styles.imagePanelContainer}>
          {imageFeedPanel(imageFeedArray)}
        </div>
      </div>
    </section>
  )
}