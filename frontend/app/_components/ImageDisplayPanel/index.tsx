import styles from './index.module.css';
import { useEffect, useState } from 'react';

import { Tabs } from '@mantine/core';

import NewestFeed from '../NewestFeed';
import UserFeed from '../UserFeed';

import FetchFeedData from '../../_services/FetchFeedData';

interface imageFeedArrayProps {
  created_at: Date,
  file_name: string,
  id: number, 
  storage_url: string
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

        <Tabs.Panel value='1'><NewestFeed /></Tabs.Panel>
        <Tabs.Panel value='2'><UserFeed /></Tabs.Panel>
      </Tabs>
      </div>
    </>
  )
}