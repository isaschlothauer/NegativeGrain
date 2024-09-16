'use client'
import { useState, useContext, useEffect, ReactNode } from 'react';
import styles from './index.module.css'
import { Menu } from '@mantine/core';
import { UserDataContext } from '../../context/userContext';
import Link from 'next/link'
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';
import { burgerMenuItems, burgerMenuItemsLoggedIn } from './burgerMenuItem';
import { unica_one } from '@/app/layout';
import { NavMenuProps } from '../Header/burgerMenuItem'
import Image from 'next/image'
import SearchIcon from '../../../public/icons/bx-search.svg'
import dynamic from 'next/dynamic';
import { IconUser } from '@tabler/icons-react';
import LoggedInDropDownMenuWide from '../LoggedInDropDownMenuWide'
import { autoSignOff } from '@/app/_services/AutoSignOff.service';
import { useRouter } from 'next/navigation';


const ClearButton = dynamic(() => import('../../_components/ClearButton'))

export default function Header () {
  const { isLoggedIn, userData } = useContext(UserDataContext);
  const { isUserLoggedIn, setIsUserLoggedIn } = isLoggedIn;
  const { user } = userData;
  const { username, email } = user;
  const router = useRouter();


  const [opened, { toggle }] = useDisclosure();
  const [ iconToggleMenu, setIconToggleMenu ] = useState<boolean>(false);
  const [ menuSelector, setMenuSelector ] = useState<NavMenuProps[]>(burgerMenuItems)
  const [ searchValue, setSearchValue ] = useState<string>("");
  const [ isSignOffTriggerOn, setIsSignOffTriggerOn ] = useState<boolean>(false);

  useEffect(() => {
    // Menu item loader
    if (!isUserLoggedIn)
      setMenuSelector(burgerMenuItems)
    else
      setMenuSelector(burgerMenuItemsLoggedIn)
  },[isUserLoggedIn, iconToggleMenu])

  // Header Title link behavior to work with Link and by turning off the 

  const dropDownMenuTrigger: () => void = () => {
    setIconToggleMenu(prevState => !prevState);
  }

  const signOutRerender: () => void = () => {
    setIsSignOffTriggerOn(true);
    autoSignOff();
  }

    // If not authorized, redirect to the landing page
    useEffect(() => {
      if (isSignOffTriggerOn == true) {
        router.push('/signoff');
        setIconToggleMenu(false);
      }
    })
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.headerMainSection}>
          <Link href="/" className={styles.headerTitle}>
            <h1 className={`${styles.headerText} ${unica_one.className}`}>
              Negative Grain             

            </h1>
          </Link>
          <div className={styles.headerMenu}>
            <Menu>
              <Menu.Target>
                <Burger size="sm" opened={opened} onClick={toggle} aria-label="Toggle navigation" />
              </Menu.Target>
            </Menu>
          </div>
        
          {/* Navigation bar */}
          <nav className={styles.navList}>
            <ul className={styles.loginLinkStyleContainer}>
              <li key={0} className={styles.NavListWithSearchClear}>
                <form className={styles.searchForm}>
                  <input 
                    className={`${styles.searchInput}`} 
                    placeholder="Search... " 
                    onChange={(e) => {setSearchValue(e.target.value)}} 
                    type='text'
                    value={searchValue}
                  />
                  <ClearButton setting={styles.clearButton} handleClear={() => setSearchValue('')} />
                  <button
                    type='submit'
                    className={styles.searchButton}
                  >
                    <Image 
                      src={SearchIcon}
                      width={20}
                      height={20}
                      alt='Search icon'
                      className={styles.searchButtonNavMenu}
                    />
                  </button>
                </form>
              </li>
              
              {isUserLoggedIn &&
              menuSelector
                .filter(element => element.id != 2)
                .map((element) => {
                if (element.id != 3) {
                  return (
                    <li key={element.id}>
                      <Link 
                        href={element.destination} 
                        className={`${styles.loginLInk}`}
                        style={{ textDecoration: 'none'}}
                      > 
                        {element.item}
                      </Link>
                    </li>
                  )
                }
              })}
              {isUserLoggedIn? 
                  <button className={styles.iconStyle}>
                    <IconUser onClick={dropDownMenuTrigger} /> 
                  </button>
                :
                <></>}
            </ul>
          </nav>
        </div>
      </div>

      {/* dropdown navigation items */}
      {iconToggleMenu && <LoggedInDropDownMenuWide setIconToggleMenu={setIconToggleMenu} />}

      {opened 
      && 
      <div className={styles.dropDownMenu}>
        <nav>
          <div className={styles.userInfo}>
            <p className={styles.userInfoUserName}>{user.username}</p>
            <p>{user.email}</p>
          </div>
          <ul className={styles.uList}>
            {/* Search menu */}
            <li key={0} className={`${styles.NavListWithSearchClear} ${styles.listWithSearchClear}`}>
              <input 
                className={`${styles.listItemSearch} `} 
                placeholder="Search... " 
                onChange={(e) => {setSearchValue(e.target.value)}} 
                type='text'
                value={searchValue}
                
              />
              <button 
                type='button'
                className={styles.clearButton}
                onClick={() => setSearchValue('')}
                >
                  Clear
              </button>
              <Image 
                src={SearchIcon}
                width={20}
                height={20}
                alt='Search icon'
                className={`${styles.searchButtonNavMenu} ${styles.searchButtonDropDown}`}
              />
            </li>
            {/* Rest of drop down menu */}
            {menuSelector.map((element) => {
              return (
                <li key={element.id} className={styles.listItem}>
                  <Link href={element.destination} 
                    style={{ textDecoration: 'none'}}
                    className={styles.dropDownMenuItem}
                    onClick={toggle}>
                    {element.item}
                  </Link>
                </li>
                )
              })
            }
          </ul>
          {isUserLoggedIn &&
          <button className={styles.signOutButton} onClick={signOutRerender}>Sign Out</button>}
        </nav>
      </div>}
    </header>
  )
}