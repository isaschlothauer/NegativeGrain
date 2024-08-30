import { Router, Request, Response } from 'express';
import { imageFeed } from '../services/image_feed'

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  console.log(await imageFeed());
  

  return res.status(200).send({ status: true, messages: ['Image download successful']});
})

export default router;