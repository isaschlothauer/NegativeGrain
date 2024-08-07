'use client'

import { useEffect, useContext, ReactNode } from 'react'
import { useExpirationValidator } from '../hooks/useExpirationValidator'
import { useRouter } from 'next/navigation';

import { UserDataContext } from '../context/userContext';
import styles from './page.module.css'

export default function Contents () {
  const { isLoggedIn, userData } = useContext(UserDataContext);
  const { isUserLoggedIn, setIsUserLoggedIn } = isLoggedIn;
  const { user, setUser } = userData;

  const authenticationState : any = useExpirationValidator();
  const router = useRouter();

  // console.log("contents", authenticationState)
  useEffect(() => {
    console.log("contents page context test: ", isUserLoggedIn)
    if (isUserLoggedIn != true) {
      console.log("test ok");
    } else {
      console.log("isUserLoggedIn is true")
    }
    // if (authenticationState && authenticationState.response.status === 401) {
    //   setIsUserLoggedIn(false);
    // }
  }, [authenticationState])

  useEffect(() => {
    if (!isUserLoggedIn)
      router.push('/');
  }, [isUserLoggedIn])

  const mainContents = (): ReactNode => {
      return (
        isUserLoggedIn == undefined || isUserLoggedIn == false? (
        <>
          Loading...
        </>
        ) : (
        <div>Hello</div>
        )
      )  
    }

  return (
    <>
      <section className={styles.contentsContainer}>
        <div className={styles.contentMain}>
          {mainContents()}

        </div>
      </section>
    </>
  )
}