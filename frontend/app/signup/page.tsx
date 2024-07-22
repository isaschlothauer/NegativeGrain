'use client'
import { useState, useEffect } from 'react';
import styles from './page.module.css'
import SignInBackGround from '../../public/images/_D753943-resize.jpg'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import axios from 'axios';

const AccountRegistration = dynamic(() => import ('../_components/AccountRegistration'))

export interface newUserRDataProps {
  username: string,
  firstname?: string,
  lastname?: string,
  email: string,
  password: string,
  cPassword: string
}

export default function SignUp () {
  const [ newUserData, setNewUserData ] = useState<newUserRDataProps>({
    username: 'test',
    firstname: 'firstnametest',
    lastname: 'lastnametest',
    email: '',
    password: 'asdfasdf',
    cPassword: 'asdfasf'
  })

  const submissionHandler = async () => {

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_REGISTER}`, 
        newUserData,
        {withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json', // Ensure the correct Content-Type header
          }
        }
      )
      
      console.log(response)

    }
    catch (error: any) {
      console.error(error);
    }
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
        <AccountRegistration 
          newUserData={newUserData}
          setNewUserData={setNewUserData}
          submissionHandler={submissionHandler}
        />
      </div>
  </div>
  )
}