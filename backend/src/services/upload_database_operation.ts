import { database } from "../config/database";
import { ImageDataProps, UserID, ImageIDProps } from '../../@types/express/index';
import { FileNameProps } from '../../@types/express/index'
import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";

export const uploadDatabaseOperation = async ({email, fullFileName, imageData} : {email: string, fullFileName: string | undefined, imageData:ImageDataProps}) => {

  const { imageTitle, brand, camera, lens, flength, aperture, filmStock, caption } = imageData;

  // Check for duplicate file name (duplicate file name shouldn't exist, but still checks)
  const [ duplicateFile ] = await database.promise().query<FileNameProps[]>("SELECT file_name FROM image WHERE file_name = ?", [fullFileName]);

  if (duplicateFile.length !== 0) {
    return { success: false, messages: ['Operation error: Duplicate file name found']};
  };

  // User ID
  let userID: number | null = null;
  try {
    const [ user_id, _0] = await database.promise().query<UserID[]>("SELECT id FROM users WHERE email = ?", [email]);
    userID = user_id[0].id;
  }
  catch (err: unknown) {
    return { success: false, messages: ['Operation error: Unable to retrieve user id during database operation']};
  };

  let image_id: number | null = null;

  // image table operation

  // FIX THIS
  try {
    await database.promise().query<ResultSetHeader>("INSERT INTO image (file_name, user_id, created_at) VALUES (?, ?, CURRENT_TIME)", [fullFileName, userID]);

    image_id = await database.promise().query<QueryResult>("SELECT image_id FROM image_data JOIN image ON image_data.image_id = image.id WHERE image.file_name = ?", [fullFileName]);
  }
  catch (err: unknown) {
    return { success: false, messages: ['Operation error: Unable to commit to image table']};
  };

  // Storing image data into image_data table;
  try {
    await database.promise().query<ResultSetHeader>("INSERT INTO image_data (title, camera_brand, camera_model, lens_brand, lens_model, lens_focal_length, lens_aperture, created_at, caption) VALUES ()")
  }
  catch (err: unknown) {
    return { success: false, messages: ['Operation error: Unable to commit to image data table']};

  }


  return undefined;
}