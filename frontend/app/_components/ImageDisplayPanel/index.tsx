import styles from './index.module.css';
import { useEffect, useState } from 'react';

import { Tabs } from '@mantine/core';

import NewestFeed from '../NewestFeed';
import UserFeed from '../UserFeed';

import FetchFeedData from '../../_services/FetchFeedData';

export interface imageFeedArrayProps {
  id: number;
  file_name: string,
  created_at: Date,
  storage_url?: string,
  camera_brand: string,
  camera_model: string,
  lens_brand: string,
  lens_model: string,
  lens_focal_length: string,
  lens_aperture: string,
  film_stock: string,
  caption: string
}

export default function ImageDisplayPanel() {
  const [ imageFeedArray, setImageFeedArray ] = useState<imageFeedArrayProps[]>([]);

  // User or newest feed mode selector: 1 (newest), 2 (user preference)
  const [ feedMode, setFeedMode ] = useState<string | null>('1');

  useEffect(() => {
    const imageDataFetch = async () => {
      const imageData = await FetchFeedData(feedMode);
      setImageFeedArray(imageData.data.storage_path);
    }
    imageDataFetch()
  }, [feedMode])

  console.log(imageFeedArray)
  return (
    <>
      <div className={styles.feedMode}>
      <Tabs value={feedMode} onChange={setFeedMode}>
        <Tabs.List>
          <Tabs.Tab value='1' style={{ fontSize: 24}}>Newest Feed</Tabs.Tab>
          <Tabs.Tab value='2' style={{ fontSize: 24}}>User Feed</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='1'><NewestFeed imageData={imageFeedArray} /></Tabs.Panel>
        <Tabs.Panel value='2'><UserFeed imageData={imageFeedArray}/></Tabs.Panel>
      </Tabs>
      </div>
    </>
  )
}