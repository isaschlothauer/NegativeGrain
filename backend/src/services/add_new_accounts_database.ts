import { database } from "../config/database";
import { ResultSetHeader } from 'mysql2'
import { NewUserDataPasswordHash } from '../../@types/express/index'


export async function addNewAccountDatabase (newUser: NewUserDataPasswordHash) {
  let { username, firstname, lastname, email, password_hash } = newUser;

  username = username.trim();
  firstname = firstname?.toLowerCase().trim();
  lastname = lastname?.toLowerCase().trim();
  email = email.trim();

  try {
    await database.promise().query<ResultSetHeader>("INSERT INTO User (username, firstname, lastname, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)", [username,  firstname, lastname, email, password_hash])

    return true;
  } 
  catch (error: any) {
    console.error("add_new_account_database error: ", error)
    return false;
  }
}