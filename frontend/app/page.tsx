'use client'
import { useContext, useEffect } from 'react';
import { UserDataContext } from './context/userContext';
import styles from "./page.module.css";
import { chathura } from "./layout";
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useExpirationValidator } from './hooks/useExpirationValidator'
import { UserLoginProps } from '../../backend/@types/express/index';

const Main = dynamic(() => import ('./_components/Main'));
const Landing = dynamic(() => import ('./_components/Landing'));

export default function Home() {
  const { isUserLoggedIn, setIsUserLoggedOn } = useContext(UserDataContext)
  
  const router = useRouter();
  const authenticationState : any = useExpirationValidator();

  useEffect(() => {
    if (authenticationState && authenticationState.status === 200 && isUserLoggedIn == false) {
      setIsUserLoggedOn(true);
    } 
  });

  // useEffect(() => {
  //   console.log("home", isUserLoggedIn)

  // })

  const componentSelector = () => {
    if (isUserLoggedIn == undefined || isUserLoggedIn == null)
      return <div>...Loading</div>;
    else if (isUserLoggedIn)
      return <Main />
    else 
      return <Landing />;
  }

  return (
    <main className={`${styles.main} ${chathura.className}`}>
      {componentSelector()}
      {/* <Landing /> */}
    </main>
  );
}
