'use client'

import { useEffect, useContext } from 'react'
import { useExpirationValidator } from '../hooks/useExpirationValidator'
import { useRouter } from 'next/navigation';

import { UserDataContext } from '../context/userContext';
import styles from './page.module.css'

export default function Contents () {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserDataContext);
  const authenticationState : any = useExpirationValidator();
  const router = useRouter();

  useEffect(() => {
    if (authenticationState && authenticationState.response.status === 401) {
      setIsUserLoggedIn(false);
    }
  }, [])

  useEffect(() => {
    if (!isUserLoggedIn)
      router.push('/');
  })

  return (
    <>
      <section className={styles.contentsContainer}>
        <div className={styles.contentMain}>
          this is a test main component

        </div>
      </section>
    </>
  )
}