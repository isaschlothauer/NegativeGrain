import axios from 'axios';
import { useState, useEffect, useContext, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { UserDataContext  } from '../context/userContext';

export const useExpirationValidator = () => {  
  const [ authResponse, setAuthResponse ] = useState<any>()
  // const { isLoggedIn, userData } = useContext(UserDataContext);
  // const { isUserLoggedIn, setIsUserLoggedIn } = isLoggedIn;

  // const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserDataContext);
  
  const router = useRouter();

  useEffect(() => {
      const loginStatusCheck = async () => {
        try {
          const response: any = await axios.get(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_VERIFY}`, 
            {withCredentials: true,
          })
          setAuthResponse(response);
        }
        catch (error: any) {
          // Debug console
          setAuthResponse(error);
        }
      } 
        loginStatusCheck();
  }, [])

  return authResponse;
}