import { Router, Request, Response } from 'express';
import { NewAccountRegistrationProps, NewUserDataPasswordHash } from '../../@types/express/index'
import { newAccountDatabase } from '../services/account_check_duplicates'
import { addNewAccountDatabase } from '../services/add_new_accounts_database'
import { passwordHashGenerator } from '../services/password_hash_function'

const router = Router();

router.post('/', async (req: Request, res: Response) => {

  const { username, email }: NewAccountRegistrationProps = req.body;

  let users: boolean;


  // Return error if email or username is undefined
  if (email == undefined || username == undefined) {
    return res.status(500).send({ success: false, errors: "Unable to process account creation request"});
  }


  try {
    users = await newAccountDatabase(username, email);
  }
  catch (error) {
    return res.status(400).send({ success: false, errors: "Unable to create new account"});
  }

  // true: username or email exists in database
  // false: no username or email present in database
  if (users) {
    return res.status(400).send({ success: false, errors: "This account or email address is already in use"});
  }

  // Create password hash via argon2
  const hash = await passwordHashGenerator(req.body.password);

  if (hash == null) {
    return res.status(500).send({ success: false, errors: "Unable to create password hash"});
  }

  delete req.body.password;

  req.body.password_hash = hash;

  // Inserting new user data into database 
  try {
    const newAccount: boolean = await addNewAccountDatabase(req.body)

    if (newAccount == true) {
      return res.status(201).send({ success: true, messages: "Account successfully created"})
    } else {
      return res.status(400).send({ success: false, errors: "Unable to create new account"})
    }
  }
  catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, errors: "Server error. Unable to handle this request at this time"})
  }

})

export default router;