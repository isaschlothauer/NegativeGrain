import { FieldPacket, QueryResult } from "mysql2";
import { database } from "../config/database";
import { NewestFeedProps } from '../../@types/express';

export async function imageFeed (feedOrder: string | null) {

  const sampleText = feedOrder;

    if (feedOrder === '1') {
      console.log("imageFeed service: 1");

      const [fetchResult, _0] = await database.promise().query<NewestFeedProps[]>('SELECT file_name, created_at FROM image ORDER BY created_at DESC');

      // console.log("test", fetchResult)

      return fetchResult;

    } else {
      console.log("imageFeed service: 2");
      return [];
    }
}