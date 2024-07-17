'use client'
import { useState, useContext, useEffect } from 'react';
import styles from './index.module.css'
// import { chathura, unica_one } from '../../layout'

import { Menu } from '@mantine/core';

import { UserDataContext } from '../../context/userContext';
import Link from 'next/link'

import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';

import { burgerMenuItems, burgerMenuItemsLoggedIn } from './burgerMenuItem';
import { unica_one } from '@/app/layout';
import { chathura } from '@/app/layout';


// TODO
// * Search api routing
// * Log in
// * log off



export default function Header () {
  const { isUserLoggedIn } = useContext(UserDataContext)
  const [opened, { toggle }] = useDisclosure();
  
  const [ searchValue, setSearchValule ] = useState<string>("");

  return (
    <>
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
          
          <div className={styles.loginLinkStyleContainer}>
            <input 
              className={`${styles.searchInput}`} 
              placeholder="Search... " 
              onChange={(e) => {setSearchValule(e.target.value)}} 
            />
            {!isUserLoggedIn? 
            burgerMenuItems.map((element) => {
              return (
                <Link key={element.id}
                  href={element.destination} 
                  className={`${styles.loginLInk}`}
                > 
                  {element.item}
                </Link>
              )
            })
            : burgerMenuItemsLoggedIn.map((element) => {
              return (
                <Link key={element.id}
                  href={element.destination} 
                  className={`${styles.loginLInk}`}
                > 
                  {element.item}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* dropdown menu */}
      {opened 
      && 
      <div className={styles.dropDownMenu}>
        <ul className={styles.uList}>
          <li className={`${styles.listItemSearchContainer}`}>
            <input 
              className={`${styles.listItemSearch} `} 
              placeholder="Search... " 
              onChange={(e) => {setSearchValule(e.target.value)}} 
            />
          </li>
          {!isUserLoggedIn? 
            burgerMenuItems.map((element) => (
            <li key={element.id}>
              <button 
                onClick={toggle}
                className={`${styles.listStyles}`}
              >
                {element.item}
              </button>
            </li>
          ))
          :
          burgerMenuItemsLoggedIn.map((element) => (
            <li key={element.id}>
              <button 
                onClick={toggle}
                className={`${styles.listStyles}`}
              >
                {element.item}
              </button>
            </li>
          ))
          }
        </ul>
      </div>}
    </>
  )
}