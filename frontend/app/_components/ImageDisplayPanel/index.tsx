import styles from './index.module.css';
import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';

import { Tabs } from '@mantine/core';

import NewestFeed from '../NewestFeed';
import UserFeed from '../UserFeed';

import FetchFeedData from '../../_services/FetchFeedData';

export default function ImageDisplayPanel() {
  const [ imageFeedArray, setImageFeedArray ] = useState<any>();
  const [ fetchedData, setFetchedData ] = useState<any>();

  // FUTURE FUNCTIONALITY CONSIDERATION: Add isUserFeed column in user table to make user choice persistent

  // User or discovery feed mode selector (true: )
  const [ feedMode, setFeedMode ] = useState<string | null>('newest');

  useEffect(() => {
    // const fetchedImageData = async () => {
    //   try {
    //     const response: any = await axios.get(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_IMAGE_FEED}`, 
    //       {withCredentials: true,
    //     })
    //     setTestArr(response);
    //   }
    //   catch (error: any) {
    //     // Debug console
    //     setTestArr(error);
    //   }

    // }
    // fetchedImageData();
    const testValue = FetchFeedData(feedMode);
    setFetchedData(testValue);

    
  }, [feedMode])
  console.log("test console on ImageDisplayPanel: ", fetchedData);

  return (
    <>
      <div className={styles.feedMode}>
      <Tabs value={feedMode} onChange={setFeedMode}>
        <Tabs.List>
          <Tabs.Tab value="newest" style={{ fontSize: 24}}>Newest Feed</Tabs.Tab>
          <Tabs.Tab value="user" style={{ fontSize: 24}}>User Feed</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="newest"><NewestFeed /></Tabs.Panel>
        <Tabs.Panel value="user"><UserFeed /></Tabs.Panel>
      </Tabs>
      </div>
    </>
  )
}