'use client'
import { useState, useEffect } from 'react';
import styles from './page.module.css'
import SignInBackGround from '../../public/images/_D753943-resize.jpg'
import Image from 'next/image'
import NewAccount from '../_components/NewAccount'

export interface newUserRDataProps {
  userName: string,
  firstName?: string,
  lastName?: string,
  email: string,
  password: string,
  cPassword: string
}

export default function SignUp () {
  const [ newUserData, setNewUserData ] = useState<newUserRDataProps>({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cPassword: ''
  })

  const submissionHandler = () => {
    console.log("Success!");
    console.log("Result: ", newUserData)
  }

  return (
    <div className={styles.signUp}>
      <Image 
        src={SignInBackGround}
        alt="Black and white image of shadow and light over traditional Japanese portable lamp"
        width={0}
        height={0}
        style={{
          objectFit: 'cover',
        }}
        className={styles.backgroundImage}
      />

      <div className={styles.pageContainer}>
        <NewAccount 
          newUserData={newUserData}
          setNewUserData={setNewUserData}
          submissionHandler={submissionHandler}
        />
      </div>
  </div>
  )
}