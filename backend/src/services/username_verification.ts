import { database } from '../config/database'
import { UsernameDB } from '../../@types/express/index'


export const usernameVerification = async (username: string) => {

  
  try {
    const [ user, _ ] = await database.promise().query<UsernameDB[]>("SELECT id FROM users WHERE username =?", [username])

    if (user.length > 0) 
      return true;
    else  
      return false;
  }
  catch (error) {
    console.error(error);
    return undefined;
  }

}