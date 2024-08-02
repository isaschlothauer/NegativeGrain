'use client'
import { useContext, useEffect } from 'react';
import { UserDataContext } from './context/userContext';
import styles from "./page.module.css";
import { chathura } from "./layout";
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useExpirationValidator } from './hooks/useExpirationValidator'
import { autoSignOff } from './_services/AutoSignOff.service'
// import { UserLoginProps } from '../../backend/@types/express/index';

// import urlUpdate from './_services/UrlUpdate';

const Main = dynamic(() => import ('./_components/Main'));
const Landing = dynamic(() => import ('./_components/Landing'));

export default function Home() {
  const { isUserLoggedIn, setIsUserLoggedOn } = useContext(UserDataContext)
  
  const router = useRouter();
  const authenticationState : any = useExpirationValidator();

  const searchParams = useSearchParams()

  const UrlUpdate = (urlPath: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', urlPath)
    window.history.pushState(null, '', `?${params.toString()}`)
  }

  console.log("auth state: ", authenticationState)
  useEffect(() => {
    if (authenticationState && authenticationState.status === 200 && isUserLoggedIn == false) {
      setIsUserLoggedOn(true);
      console.log("authenticationState && authenticationState.status === 200 && isUserLoggedIn == false")
    } else if (authenticationState && authenticationState.status !== 200) {
      console.log("authenticationState && authenticationState.status !== 200")
      setIsUserLoggedOn(false);
    } else if (authenticationState == undefined) {
      console.log("main page useeffect test")
      autoSignOff();
      // setIsUserLoggedOn(false);
      // router.push("/?page=new");
      // console.log("test")
    }
    
    console.log(authenticationState)
  });

  useEffect(() => {
    if (isUserLoggedIn == true) {
      UrlUpdate("secure")
    } else {
      UrlUpdate("new")
    }
  })

  useEffect(() => {
    console.log("Before change", isUserLoggedIn)
  })

  const componentSelector = () => {
    if (isUserLoggedIn == undefined || isUserLoggedIn == null) {
      return <div>...Loading</div>;
    } else if (isUserLoggedIn) {

      return <Main />
    } else {
      return <Landing />;
    }
  }

  return (
    <main className={`${styles.main} ${chathura.className}`}>
      {componentSelector()}
    </main>
  );
}
