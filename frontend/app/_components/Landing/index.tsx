import { useEffect, useContext } from 'react'
import { UserDataContext } from '../../context/userContext';
import styles from './index.module.css'
import landingBackground from '../../../public/images/_D753897_resize.jpg'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Landing () {
  const router = useRouter();

  return (
    <div className={styles.signUp}>
      <Image 
        src={landingBackground}
        alt="Black and white image of shadow and light over traditional Japanese portable lamp"
        width={0}
        height={0}
        style={{
          objectFit: 'cover',
        }}
        className={styles.backgroundImage}
      />
      <div className={styles.pageContainer}>
        <div className={styles.mainSection}>

          <p className={styles.landingText}>
            Discover photographers and photographic works. Negative Grain aims to become a platform for photographers and photography lovers. It works much the same way as in physical photo exhibition where a photographer shows, viewers view the works. Photographers and viewers can still contact each other. No open comments or "like". Users can still mark the works they like, and this creates an quick access to the works and photographer.  
          </p>
        </div>

        <Link 
            href="/login"
            className={styles.linkStyle}
          >
            Get Started
        </Link>
        
        <div className={styles.linkContainer}>
          <Link 
            href="/signup"
            className={styles.linkStyle}
          >
            New account
          </Link>
        </div>
      </div>
  </div>
  )
}