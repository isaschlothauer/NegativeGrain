import { Router, Request, Response } from 'express';
import { imageFeed } from '../services/image_feed'
import path from 'path'

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const imageStoragePath = path.join(__dirname, '../image_storage');
  console.log(imageStoragePath);
  

  return res.status(200).send({ status: true, messages: ['Image download successful']});
})

export default router;