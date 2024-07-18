'use client'
import { useContext, useState } from 'react';
import { UserDataContext } from './context/userContext';
import styles from "./page.module.css";
import { chathura } from "./layout";
import dynamic from 'next/dynamic'

const Main = dynamic(() => import ('./_components/Main'));
const SignedOffLandingPage = dynamic(() => import ('./_components/SignedOffLandingPage'));


export default function Home() {
  const { isUserLoggedIn } = useContext(UserDataContext)

  console.log(isUserLoggedIn)


  
  const componentSelector = () => {
    if (isUserLoggedIn == undefined || isUserLoggedIn == null)
      return <div>...Loading</div>;
    else if (isUserLoggedIn)
      return <Main />
    else 
      return <SignedOffLandingPage />;
  }

  return (
    <main className={`${styles.main} ${chathura.className}`}>
      {componentSelector()}
    </main>
  );
}
