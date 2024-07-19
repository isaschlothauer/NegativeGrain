'use client'
import { useContext, useState } from 'react';
import { UserDataContext } from './context/userContext';
import styles from "./page.module.css";
import { chathura } from "./layout";
import dynamic from 'next/dynamic'

const Main = dynamic(() => import ('./_components/Main'));
const Landing = dynamic(() => import ('./_components/Landing'));

export default function Home() {
  const { isUserLoggedIn } = useContext(UserDataContext)
  
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
    </main>
  );
}
