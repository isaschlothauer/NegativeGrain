import { database } from "../config/database";
import { ImageDataProps, UserID } from '../../@types/express/index';
import { ResultSetHeader } from "mysql2";

export const uploadDatabaseOperation = async ({email, fullFileName, imageData} : {email: string, fullFileName: string | undefined, imageData:ImageDataProps}) => {

  // User ID
  let userID: number | null = null;
  try {
    const [ user_id, _0] = await database.promise().query<UserID[]>("SELECT id FROM users WHERE email = ?", [email]);
    userID = user_id[0].id;
  }
  catch (err: unknown) {
    return { success: false, messages: ['Unable to retrieve user id during database operation']};
  }

  const { imageTitle, brand, camera, lens, flength, aperture, filmStock, caption } = imageData;

  try {
    await database.promise().query<ResultSetHeader>("INSERT INTO image_data () ")
  }
  catch (err: unknown) {

  }

  return undefined;
}