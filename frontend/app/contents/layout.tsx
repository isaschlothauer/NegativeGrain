'use client'

import { useState, useEffect, useContext } from 'react';
import { UserDataContext } from '../context/userContext';
import { useExpirationValidator } from '../hooks/useExpirationValidator'
import { useRouter } from 'next/navigation';
import { LoginStateSetter } from '../_services/LoginStateSetter';

export default function ContentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn, userData, currentPath } = useContext(UserDataContext);
  const { isUserLoggedIn, setIsUserLoggedIn } = isLoggedIn;
  const { path, setPath } = currentPath;
  // const { user, setUser } = userData;

  const authenticationState : any = useExpirationValidator();
  const router = useRouter();

  // console.log("layout", path)
  // console.log("path from layout", path);

  // useEffect(() => {
  //   if (path === undefined) {
  //     console.log(path)
  //     setPath(path);
  //   }
  // })

  // if (path !== undefined)
  //   LoginStateSetter(authenticationState, path);
  // useEffect(() => {
  //   if (isUserLoggedIn != true) {
  //     console.log("isUserLoggedIn is false")

  //   } else {
  //     console.log("isUserLoggedIn is true")
  //   }
  // }, [authenticationState])

  useEffect(() => {
    if (!isUserLoggedIn)
      router.push('/');
  }, [isUserLoggedIn])

  return (
    <>
      {children}
    </>
  )
}