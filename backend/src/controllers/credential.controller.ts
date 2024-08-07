import { Router, Request, Response } from 'express';
import { jwtVerification } from '../services/jwt_services';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const authToken: string = req.cookies['authenticationToken'];
    if (!authToken) {
      return res.status(401).send({ success: false, errors: ["User not logged in"]})
    }

    const verified = await jwtVerification(req.cookies['authenticationToken'])

    if (!verified) {
      return res.status(401).send({ success: false, errors: ['No or invalid credential']})
    }

    return res.status(200).send({ success: true, messages: ['User access ok'], userData: verified })
  }
  catch (err: any) {
    console.log(err);
    return res.status(500).send({ success: false, errors: ["Server error. Unable to fulfill request"]});
  }
})

export default router;