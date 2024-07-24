import { database } from "../config/database";
import { UsernameDB, emailDB } from '../../@types/express/index'

export async function checkDuplicates (username: string, email : string) {

  // true: username or email exists in database
  // false: no username or email present in database

  try {
    const [ username_login , _0 ] = await database.promise().query<UsernameDB[]>("SELECT id FROM User WHERE username = ?", [username])

    const [ email_login , _1 ] = await database.promise().query<emailDB[]>("SELECT id FROM User WHERE email = ?", [email])

    // username or email exists in database
    if (username_login.length > 0 || email_login.length > 0) {
      return true; 
    }

    return false;
  }
  catch (error) {

    console.error("new_account_creation.controller log", error)

    // Could not verify 
    return true;
  }
}