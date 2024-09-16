'use client';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function SignOFf () {
  const router = useRouter();

  setTimeout(() => {
    router.push('/login');
  }, 3000)

  return (
    <>
      <div className={styles.signOffContainer}>
        <p className={styles.signOffMsg}>Login credential could not be verified. Please log in again. Redirecting... </p>
      </div> 
    </>
  )
}