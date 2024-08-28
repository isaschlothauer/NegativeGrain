import { database } from "../config/database";
import { ImageDataProps, UserID, ImageIDProps } from '../../@types/express/index';
import { FileNameProps } from '../../@types/express/index'
import { FieldPacket, QueryResult, ResultSetHeader, RowDataPacket } from "mysql2";

export const uploadDatabaseOperation = async ({email, fullFileName, imageData} : {email: string, fullFileName: string | undefined, imageData:ImageDataProps}) => {

  const { imageTitle, cameraBrand, cameraModel, lensBrand, lensModel, flength, aperture, filmStock, caption } = imageData;

  // Check for duplicate file name (duplicate file name shouldn't exist, but still checks)
  const [ duplicateFile ] = await database.promise().query<FileNameProps[]>("SELECT file_name FROM image WHERE file_name = ?", [fullFileName]);

  if (duplicateFile.length !== 0) {
    return { success: false, messages: ['Operation error: Duplicate file name found']};
  };

  // User ID
  let userID: number | null = null;
  try {
    const [ user_id, _0] = await database.promise().query<UserID[]>("SELECT id FROM users WHERE email = ?", [email]);

    if (user_id[0])
      userID = user_id[0].id;
    else
      return Promise.resolve({ success: false, messages: ['Operation error: User not found. Contact administrator']});
  }
  catch (err: unknown) {
    return Promise.resolve({ success: false, messages: ['Operation error: Unable to retrieve user id during database operation']});
  };

  let imageID: number | undefined;

  // image table operation
  try {
    await database.promise().query<ResultSetHeader>("INSERT INTO image (file_name, user_id, created_at) VALUES (?, ?, CURRENT_TIME)", [fullFileName, userID]);

    const [imageIDRows] = await database.promise().query<ImageIDProps[]>("SELECT id FROM image WHERE file_name = ?;", [fullFileName])

    if (imageIDRows.length > 0) {
      imageID = imageIDRows[0].id
    } else {
      return Promise.resolve({ success: false, messages: ['Operation error: Unable to retrieve image id during database operation']});
    }
  }
  catch (err: unknown) {
    return { success: false, messages: ['Operation error: Unable to commit to image table']};
  };

  // Storing image data into image_data table;
  try {
    await database.promise().query<ResultSetHeader>("INSERT INTO image_data (title, camera_brand, camera_model, lens_brand, lens_model, lens_focal_length, lens_aperture, film_stock, caption, image_id) VALUES (?,  ?,  ?,  ?,  ?,  ?,  ?,  ?,  ?, ?);", [imageTitle, cameraBrand, cameraModel, lensBrand, lensModel, flength, aperture, filmStock, caption, imageID])
  }
  catch (err: unknown) {
    return Promise.resolve({ success: false, messages: [`Operation error: ${err}`]});
  }

  return Promise.resolve({ success: true, messages: ['Image data and file ok']});
}