import axios from 'axios';

// Signs off when token is invalid
export const autoSignOff = async () => {
  try {
    // API query returns res.clearCooie() response and deletes stored cookie
    await axios.delete(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_COOKIE}`, 
      {withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/cookie'
        }
      })
  }
  catch (error: any) {
    return error;
  }
}
