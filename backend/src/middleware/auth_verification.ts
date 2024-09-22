import { Request, Response, NextFunction } from 'express';

import { jwtVerification } from '../services/jwt_services';

export const authVerification = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const authToken: string = req.cookies['authenticationToken'];
    const verified = await jwtVerification(req.cookies['authenticationToken'])


    if (!authToken || !verified) {
      return res.status(401).send({ success: false, errors: ["User not logged in"]})
    }

    next();
  }
  catch (err: any) {
    console.log(err);
    return res.status(500).send({ success: false, errors: ["Server error. Unable to fulfill request"]});
  }
}