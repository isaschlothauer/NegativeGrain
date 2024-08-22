import { Router, Request, Response } from 'express';
import { jwtVerification } from '../services/jwt_services';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  
  const verified = await jwtVerification(req.cookies['authenticationToken'])

  if (!verified) {
    return res.status(401).send({ success: false, errors: ['No or invalid credential']})
  }

  return res.status(200).send({ success: true, messages: ['User access ok'], userData: verified })

})

export default router;