'use client'
import { useState, useContext, useEffect } from 'react';
import styles from './index.module.css'

import { Menu } from '@mantine/core';

import { UserDataContext } from '../../context/userContext';
import Link from 'next/link'

import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';

import { burgerMenuItems, burgerMenuItemsLoggedIn } from './burgerMenuItem';
import { unica_one } from '@/app/layout';

import { NavMenuProps } from '../Header/burgerMenuItem'
// TODO
// * Search api routing
// * Log in
// * log off

export default function Header () {
  const { isUserLoggedIn } = useContext(UserDataContext)
  const [opened, { toggle }] = useDisclosure();
  const [ menuSelector, setMenuSelector ] = useState<NavMenuProps[]>(burgerMenuItems)
  const [ searchValue, setSearchValule ] = useState<string>("");

  useEffect(() => {

    // Menu item loader
    if (!isUserLoggedIn)
      setMenuSelector(burgerMenuItems)
    else
      setMenuSelector(burgerMenuItemsLoggedIn)
  })

  useEffect(() => {
    console.log(searchValue);
  })

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
        
          {/* Navigation bar */}
          <nav className={styles.navList}>
            <ul className={styles.loginLinkStyleContainer}>
              <li key={0}>
                <input 
                  className={`${styles.searchInput}`} 
                  placeholder="Search... " 
                  onChange={(e) => {setSearchValule(e.target.value)}} 
                />
              </li>
              
              {menuSelector.map((element) => {
                return (
                  <li key={element.id}>
                    <Link key={element.id}
                      href={element.destination} 
                      className={`${styles.loginLInk}`}
                      style={{ textDecoration: 'none'}}
                    > 
                      {element.item}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* dropdown navigation items */}
      {opened 
      && 
      <div className={styles.dropDownMenu}>
        <nav>
          <ul className={styles.uList}>
            {/* Search menu */}
            <li key={0}>
              <input 
                className={`${styles.listItemSearch} `} 
                placeholder="Search... " 
                onChange={(e) => {setSearchValule(e.target.value)}} 
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
        </nav>
      </div>}
    </>
  )
}