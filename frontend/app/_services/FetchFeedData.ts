import axios from 'axios';
import { database } from '../../../backend/src/config/database';

export default async function FetchFeedData (mode: string | null) {
  console.log("mode test: ", mode);

  try {
    // const response: any = await axios.post(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_IMAGE_FEED}`,
    //   mode, 
    //   {withCredentials: true,
    // })

    await axios.post(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_IMAGE_FEED}`,
      mode, 
      {withCredentials: true,
    })

    // return response;
  }
  catch (error: any) {
    console.error("This is a error from FetchFeedData")
    return error;
  }
}