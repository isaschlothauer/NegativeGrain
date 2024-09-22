import { Router, Request, Response } from 'express';
import { LoginInputDataProps } from '../../@types/express/index'
import { usernameVerification } from '../services/username_verification'
import { loginPasswordVerification } from '../services/login_password_verify'
import { JWTGenerate } from '../services/jwt_services'

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  
  let { username, password }: LoginInputDataProps = req.body;
  username = username.trim();

  const userVerified: boolean | undefined= await usernameVerification(username)
  
  if (userVerified == undefined) {
    return res.status(500).send({ success: false, errors: ["Server error. Unable to perform log in"]});
  } else if (userVerified == false) {
    return res.status(401).send({ success: false, errors: [" Username not found"]});
  } 

  const passwordCheck: boolean | undefined = await loginPasswordVerification(username, password);
  if (passwordCheck == undefined) 
    return res.status(500).send({ success: false, errors: ["Unable to perform password verification"]});
  else if (passwordCheck == false) {
    return res.status(401).send({ success: false, errors: ["Invalid username or password"]});
  }

  // Generate JWToken
  const JWToken: any = await JWTGenerate(username);

  if (JWToken == false) 
    return res.status(400).send({ success: false, errors: ["Unable to generate token"]})
  else if (JWToken == undefined) {
    return res.status(500).send({ success: false, errors: ["Server error. Unable to perform request tasks"]})
  }

  if ('authToken' in JWToken) {
    const { authToken, options } = JWToken;

    // Setting session cookies
    res.cookie("authenticationToken", authToken, options);

    return res.status(200).send({ success: true, messages: ["Log in successful"]});
  }
})

export default router;