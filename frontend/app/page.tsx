'use client'
import styles from "./page.module.css";
import { chathura } from "./layout";
import dynamic from 'next/dynamic'
import { useExpirationValidator } from './hooks/useExpirationValidator'
import { LoginStateSetter } from './_services/LoginStateSetter';
import { useRouter } from 'next/navigation'

const Landing = dynamic(() => import ('./_components/Landing'));

export default function Home() {  
  const authenticationState : any = useExpirationValidator();

  const router = useRouter();

  // Sets isUserLoggedIn context
  LoginStateSetter(authenticationState)

  return (
    <main className={`${styles.main} ${chathura.className}`}>
      <Landing />
    </main>
  );
}
