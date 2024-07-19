import styles from './index.module.css'
import { useState, useContext } from 'react';
import { UserDataContext } from '../../context/userContext'

export default function ImageBrowser () {
  const { isUserLoggedIn, setIsUserLoggedOn } = useContext(UserDataContext)



  console.log(isUserLoggedIn);

  return (
    <> 
    
    this is the image browser
    </>
  )
}