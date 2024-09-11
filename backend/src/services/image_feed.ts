import { database } from "../config/database";
import { NewestFeedProps } from '../../@types/express';
import { RowDataPacket } from "mysql2";

export async function imageFeed (modeSelector: { mode: string}) {
  
  const { mode } = modeSelector ;
  
  // Newest image feed data
  if (mode === '1') {
    const [fetchResult] = await database.promise().query<NewestFeedProps[]>('SELECT id, file_name, created_at FROM image ORDER BY created_at DESC LIMIT 500');    

    return fetchResult;
  } else {
    console.log("imageFeed service: 2");
    return [];
  }
}