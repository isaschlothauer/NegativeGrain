import { database } from "../config/database";
import { ResultSetHeader } from 'mysql2'
import { NewUserDataPasswordHash } from '../../@types/express/index'


export async function addNewAccountDatabase (newUser: NewUserDataPasswordHash) {
  const { username, firstname, lastname, email, password_hash } = newUser;

  try {
    await database.promise().query<ResultSetHeader>("INSERT IGNORE INTO User (username, firstname, lastname, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)", [username, firstname, lastname, email, password_hash])

    return true;
  } 
  catch (error: any) {
    console.error("add_new_account_database error: ", error)
    return false;
  }
}