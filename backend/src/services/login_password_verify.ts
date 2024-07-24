import { database } from '../config/database'
import { passwordDB } from '../../@types/express/index'
import argon2 from 'argon2';

export const loginPasswordVerification = async (username: string, password: string) => {

  // User password hash  
  try {
    const [rows] = await database.promise().query<passwordDB[]>("SELECT password_hash FROM User WHERE username = ?", [username]);

    if (rows.length === 0) {
      console.log("User not found");
      return false;
    }

    const userPasswordHash = rows[0]['password_hash'];

    if (!userPasswordHash) {
      console.log("Password hash not found");
      return false
    }
    
    try {
      const isPasswordValid = await argon2.verify(userPasswordHash, password);

      return isPasswordValid;
    }
    catch (error) {
      console.log("Unable to perform password verification")
      console.error(error);
    }

    return true
  }
  catch (error) {
    console.log("Unable to retrieve user hash")
    console.error(error);
    return undefined;
  }

}

