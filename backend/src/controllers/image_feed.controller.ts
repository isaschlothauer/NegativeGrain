import { Router, Request, Response } from 'express';
import { imageFeed } from '../services/image_feed'
import { NewestFeedProps } from '../../@types/express';
import { jwtVerification } from '../services/jwt_services'


const router = Router();

router.post('/', async (req: Request, res: Response) => {
  let imageListData : NewestFeedProps[];

  const imageStoragePath = `${process.env.IMG_BASE_STORAGE_DIRECTORY}${process.env.IMG_DIRECTORY}`;

  // Data retrieval
  try {
    imageListData = await imageFeed(req.body)

    // Adding storageURL path
    // const updatedImageArray = imageListData.map(arrItem => ({
    //   ...arrItem,
    //   storage_url: imageStoragePath
    // }))

    // console.log("img list data: ", imageListData)
    // return res.status(200).send({ access: true, message: ['Newest image feed data retrieval successful'], storage_path: updatedImageArray});
    return res.status(200).send({ access: true, message: ['Newest image feed data retrieval successful'], imageData: imageListData});
  }
  catch (error: unknown) {
    console.error(error);
    return res.status(500).send({ success: false, errors: ['Server error. Image data retrieval failed']});
  }
})

export default router;