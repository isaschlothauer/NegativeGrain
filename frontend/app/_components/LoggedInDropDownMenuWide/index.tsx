'use client'
import { useState, useEffect, Dispatch, SetStateAction, useContext } from 'react';
import styles from './index.module.css'
import { dropdownMenuListItems } from './dropDownMenuList'
import Link from 'next/link'
import { autoSignOff } from '@/app/_services/AutoSignOff.service';
import { useRouter } from 'next/navigation';
import { UserDataContext } from '@/app/context/userContext';


interface LoggedInDropDownMenuWideProps {
  setIconToggleMenu: Dispatch<SetStateAction<boolean>>;
}

export default function LoggedInDropDownMenuWide ({ setIconToggleMenu }: LoggedInDropDownMenuWideProps) {
  const { isLoggedIn } = useContext(UserDataContext);
  const { isUserLoggedIn, setIsUserLoggedIn } = isLoggedIn;
  const [ isSignOffTriggerOn, setIsSignOffTriggerOn ] = useState<boolean>(false);
  const router = useRouter();

  const signOutRerender: () => void = () => {
    setIsSignOffTriggerOn(true);
    autoSignOff();
  }


  // If not authorized, redirect to the landing page
  useEffect(() => {
    if (isSignOffTriggerOn == true) {
      router.push('/');
      setIconToggleMenu(false);
    }
  })

  return (
    <section className={styles.dropDownContainer}>
      <ul>
        {dropdownMenuListItems.map((element) => {
          return (
            <li key={element.id} className={styles.listItem}>
              <Link 
                href={element.destination} 
                style={{ textDecoration: 'none'}}
                className={styles.listStyle}
              >
                {element.item}
              </Link>
            </li>
          )
        })}
        {/* Sign out */}
        <li key={4} className={styles.listItem}>
          <button className={styles.signOutButton} onClick={signOutRerender}>
            Sign out
          </button>
        </li>
      </ul>
      
    </section>
  )
}

