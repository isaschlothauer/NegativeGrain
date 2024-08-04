import { useEffect, useContext } from 'react';
import { UserDataContext } from '../context/userContext';
import { useExpirationValidator } from '../hooks/useExpirationValidator'
import { useRouter } from 'next/navigation'

export function LoginStateSetter (authentication: any) {
  const authenticationState : any = useExpirationValidator();
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserDataContext);

  const router = useRouter();

    useEffect(() => {
    if (authenticationState && authenticationState.status == 200) {
      setIsUserLoggedIn(true);
    } else if (authenticationState && authenticationState.response.status == 401) {
      setIsUserLoggedIn(false);
    }
  });

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push('/contents');
    }
  });
}
