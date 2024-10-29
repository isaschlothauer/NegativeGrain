import { database } from '../config/database'
import { ImageFavoriteProps } from '../../@types/express/index';
import { ResultSetHeader } from 'mysql2';

export async function favoriteImageOperation (fileName: string, username: string | undefined, userFavoriteMode: boolean) {

// BUGGY! FIX IT

  let favoriteImageData: ImageFavoriteProps[] = [];
  try {
    const [rows] = await database.promise().query<ImageFavoriteProps[]>(
      'SELECT image.id AS imageId, users.id AS userId FROM image JOIN users ON image.user_id = users.id WHERE image.file_name = ? AND users.username = ?;', 
      [fileName, username]
    );
    favoriteImageData = rows;
  }
  catch (error: unknown) {
    console.error(error);
    return undefined;
  }


  console.log('fav image data: ', favoriteImageData )
  // Manipulating user_favorite table
  console.log("userFavoriteMode: ", userFavoriteMode);
  // if (userFavoriteMode) {
  //   console.log(favoriteImageData[0].userId, favoriteImageData[0].imageId);

  //   try {
  //     await database.promise().query('INSERT INTO user_favorite (user_id, image_id) VALUES (?, ?);', [favoriteImageData[0].userId, favoriteImageData[0].imageId]);

  //     console.log('Insertation ok');


  //     return true;

  //   }
  //   catch (error: unknown) {
  //     console.error("Insertation error: ", error);
  //     return undefined;
  //   }

    // try {
    //   const [newRow]: any = await database.promise().query('INSERT INTO user_favorite (image_id, user_id) VALUES (?, ?);', [favoriteImageData[0].userId, favoriteImageData[0].imageId]);

    //   console.log("new row: ", newRow);
    // }
    // catch (error: unknown) {
    //   console.error("insertation error: ", error);
    //   return undefined;
    // }

    // try {
    //   const [newRow] : any = await database.promise().query('INSERT INTO user_favorite (image_id, user_id) VALUES (?, ?);', [favoriteImageData[0].userId, favoriteImageData[0].imageId]);

    //   console.log(newRow);
    //   return true;
    // }
    // catch (error: unknown) {
    //   console.error("Insert into user_favorite failed");
    //   return undefined;
    // }

    // try {
    //   const [result]: [ResultSetHeader, any] = await database.promise().query(
    //     'DELETE FROM user_favorite WHERE image_id = ? AND user_id = ?;', 
    //     [favoriteImageData[0].imageId, favoriteImageData[0].userId]
    //   )

    //   console.log('Affected rows: ', result.affectedRows);

    //   if (result.affectedRows == 0) 
    //     return true;
    //   else
    //     return false;
    // }
    // catch (error: unknown) {
    //   console.error("user favorite table delete failure", error);
    //   return false;
    // }
  // } else {
  //   try {
  //     await database.promise().query('DELETE FROM user_favorite WHERE image_id = ? AND user_id = ?;', [favoriteImageData[0].userId, favoriteImageData[0].imageId])

  //     console.log("what the...")
  //   }
  //   catch (error: unknown) {
  //     console.error(error);
  //     return undefined;
  //   }


  //   return true;
    // try {
    //   const [newRow] : any = await database.promise().query('INSERT INTO user_favorite (image_id, user_id) VALUES (?, ?);', [favoriteImageData[0].userId, favoriteImageData[0].imageId]);

    //   console.log(newRow);
    //   return true;
    // }
    // catch (error: unknown) {
    //   console.error("Insert into user_favorite failed");
    //   return undefined;
    // }
  // }
  // if (userFavoriteMode) {

  //   try {
  //     const [result]: [ResultSetHeader, any] = await database.promise().query(
  //       'DELETE FROM user_favorite WHERE image_id = ? AND user_id = ?;', 
  //       [favoriteImageData[0].imageId, favoriteImageData[0].userId]
  //     );

  //     // Accessing affectedRows from ResultSetHeader
  //     console.log('Affected rows: ', result.affectedRows);

  //     if (result.affectedRows == 0) {
  //       return { success: false, errors: ['user_favorite row deletion failed']};
  //     } else {
  //       return { success: true, messages: ['user_favorite row deleted']};
  //     }

  //   }
  //   catch (error: unknown) {
  //     return { success: false, errors: [`Server error. Favorite database operation failed. ${error}`]};
  
  //   }

  // } else {
  //   const [newRow] : any = await database.promise().query('INSERT INTO user_favorite (image_id, user_id) VALUES (?, ?);', [favoriteImageData[0].userId, favoriteImageData[0].imageId]);

  //   console.log(newRow);
  // }

}