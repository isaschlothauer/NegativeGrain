import { database } from "../config/database";
import { NewestFeedProps } from '../../@types/express';
import { RowDataPacket } from "mysql2";

export async function imageFeed (modeSelector: { mode: string}) {
  
  const { mode } = modeSelector ;
  
  // Newest image feed data
  if (mode === '1') {
    const [fetchResult] = await database.promise().query<NewestFeedProps[]>('SELECT image.id, image.file_name, image.created_at, image_data.camera_brand, image_data.camera_model, image_data.lens_brand,image_data.lens_model, image_data.lens_focal_length, image_data.lens_aperture, image_data.film_stock, image_data.caption FROM image JOIN image_data ON image.id = image_data.image_id ORDER BY image.created_at DESC LIMIT 500');    

    return fetchResult;
  } else {
    console.log("imageFeed service: 2");
    return [];
  }
}