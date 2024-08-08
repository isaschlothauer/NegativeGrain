'use client'

import {useContext, ReactNode, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { UserDataContext } from '../context/userContext';
import styles from './page.module.css'

export default function Contents () {
  const { isLoggedIn, currentPath } = useContext(UserDataContext);
  const { isUserLoggedIn } = isLoggedIn;
  const { path, setPath } = currentPath;
  const pathname = usePathname();

  useEffect(() => {
    if (pathname != undefined || pathname !== path)
      setPath(pathname);

  }, [pathname, path, setPath])
 
  console.log(path)

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