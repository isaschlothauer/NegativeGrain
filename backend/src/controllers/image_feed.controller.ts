import { Router, Request, Response } from 'express';
import { imageFeed } from '../services/image_feed'
import path from 'path'
import { NewestFeedProps } from '../../@types/express';


// interface ImageListDataProps {
//     file_name: string,
//     created_at: Date
//   }

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  let imageListData : NewestFeedProps[];

  // Mode selector switch: 1 (newest feed) or 2 (user feed)
  const { mode } : {mode: string | null} = req.body;
  const imageStoragePath = path.join(__dirname, '../image_storage');

  // Data retrieval
  try {
    imageListData = await imageFeed(mode)

    // if (imageListData !== true)
    //   return null;

    for (let item in imageListData) {
      console.log(imageListData[item]);
    }
  }
  catch (error: unknown) {
    console.error(error);
    return res.status(500).send({ success: false, errors: ['Server error. Image data retrieval failed']});
  }

  return res.status(200).send({ status: true, messages: ['Image download successful']});
})

export default router;