import { Router, Request, Response } from 'express';
import { jwtVerification } from '../services/jwt_services';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  // const verified = await jwtVerification(req.cookies['authenticationToken'])

  // console.log(verified)
  // const verified : { success: boolean; message: string; error?: undefined; } | { success: boolean; error: string; message?: undefined; } | undefined = await jwtVerification(req.cookies['authenticationToken']);
  
  try {
    const authToken: string = req.cookies['authenticationToken'];
    if (!authToken) {
      return res.status(401).send({ success: false, errors: ["User not logged in"]})
    }


    const verified = await jwtVerification(req.cookies['authenticationToken'])

    console.log(verified)

    if (!verified) {
      return res.status(401).send({ success: false, errors: ['No or invalid credential']})
    }

    return res.status(200).send({ success: true, messages: ['User access ok']})
    // return res.status(200).send({ success: true, messages: ['User access ok']})
    // if (authToken) {
    //   const verifiedResult = await jwtVerification(authToken);
    //   console.log(verifiedResult)
    //   // if (verifiedResult && verifiedResult.success == true)
    //   //   return res.status(200).send(verifiedResult);

    // } else {
    //   return res.status(401).send({ success: false, errors: ["User not logged in"]})
    // }


    // if (verifiedResult && verifiedResult.success == true)
    //   return res.status(200).send(verifiedResult);
    // else
    //   return res.status(401).send(verifiedResult);
  }
  catch (err: any) {
    console.log(err);
    return res.status(500).send({ success: false, errors: ["Server error. Unable to fulfill request"]});
  }
})

export default router;