import { Router, Request, Response } from 'express';
import { NewAccountRegistrationProps } from '../../@types/express/index'

const router = Router();

router.post('/', async (req: Request, res: Response) => {

  const { username, firstname, lastname, email, password }: NewAccountRegistrationProps = req.body;

  

})

export default router;