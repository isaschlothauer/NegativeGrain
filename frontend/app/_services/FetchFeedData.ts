import axios from 'axios';

export default async function FetchFeedData (mode: string | null) {
  
  try {
    const fetchedData: any = await axios.post(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_IMAGE_FEED}`,
      { mode }, 
      {withCredentials: true,
    })

    return fetchedData;
  }
  catch (error: any) {
    console.error("This is a error from FetchFeedData")
    return error;
  }
}