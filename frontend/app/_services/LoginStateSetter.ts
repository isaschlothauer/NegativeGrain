import { useEffect, useContext } from 'react';
import { UserDataContext } from '../context/userContext';
import { useExpirationValidator } from '../hooks/useExpirationValidator'
import { useRouter } from 'next/navigation'
import path from 'path';

export function LoginStateSetter (authentication: any, urlPath: string | undefined) {
  const authenticationState = useExpirationValidator();
  const { isLoggedIn, userData } = useContext(UserDataContext);
  const { isUserLoggedIn, setIsUserLoggedIn } = isLoggedIn;
  const { user, setUser } = userData;

  const router = useRouter();

  useEffect(() => {
    if (authentication && authentication.status === 200) {
      setIsUserLoggedIn(true);
      setUser(authentication.data.userData);
    } else if 
    (authentication && authentication.response.status === 401) {
      setIsUserLoggedIn(undefined);
      setUser({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        created_at: "",
        exp: null,
        iat: null,
      });
    }
  },[authentication]);

  useEffect(() => {
    if (isUserLoggedIn) {
      // console.log("path", path);
      router.push('/contents');
    }
  });

  return null;
}
