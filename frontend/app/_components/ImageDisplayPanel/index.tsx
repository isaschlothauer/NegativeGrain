import styles from './index.module.css';
import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';

import { Tabs } from '@mantine/core';

import RecentImagFeed from '../RecentImageFeed';
import UserRecentFeed from '../UserRecentFeed';




export default function ImageDisplayPanel() {
  const [ imageFeedArray, setImageFeedArray ] = useState<any>();
  const [ testArr, setTestArr ] = useState<any>();

  // FUTURE FUNCTIONALITY CONSIDERATION: Add isUserFeed column in user table to make user choice persistent

  // User or discovery feed mode selector (true: )
  const [ feedModeTab, setFeedModeTab ] = useState<string | null>('recent');

  console.log("Feed order: ", feedModeTab);


  useEffect(() => {
    const fetchedImageData = async () => {
      try {
        const response: any = await axios.get(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_IMAGE_FEED}`, 
          {withCredentials: true,
        })
        setTestArr(response);
      }
      catch (error: any) {
        // Debug console
        setTestArr(error);
      }

    }
    fetchedImageData();
  }, [])
  console.log("test console on ImageDisplayPanel: ", testArr);

  return (
    <>
      <div className={styles.feedModeTab}>
      <Tabs value={feedModeTab} onChange={setFeedModeTab}>
        <Tabs.List>
          <Tabs.Tab value="recent" style={{ fontSize: 24}}>Recent Image</Tabs.Tab>
          <Tabs.Tab value="user" style={{ fontSize: 24}}>User Feed</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="recent"><RecentImagFeed /></Tabs.Panel>
        <Tabs.Panel value="user"><UserRecentFeed /></Tabs.Panel>
      </Tabs>
      </div>
    </>
  )
}