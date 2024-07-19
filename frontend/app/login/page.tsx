'use client'
import { ChangeEvent, ReactHTMLElement, useEffect, useState } from 'react';
import { chathura } from '@/app/layout'
import styles from './page.module.css'
import { inputListItems } from './inputList'
import Link from 'next/link'
import Image from 'next/image'
import LoginBackground from '../../public/images/D75_7907-resize.jpg'
import dynamic from 'next/dynamic';
const ClearButton = dynamic(() => import('../_components/ClearButton'))

interface loginDataProps {
  account: string,
  password: string
}

export default function Login () {
  const [ loginData, setLoginData ] = useState<loginDataProps>({
    account: '',
    password: '',
  })

  // Input handler
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const clearInputFIelds = (userLoginData : string) => {
    setLoginData((prevState) => ({
      ...prevState,
      [userLoginData]: ''
    }))
  }

  const submissionHandler = () => {
    console.log("Success!");
    console.log("Result: ", loginData)
  }


  return (
    <div className={styles.loginContainer}>
      <Image 
        src={LoginBackground}
        alt="Black and white image of a woman playing the guitar"
        width={0}
        height={0}
        style={{
          objectFit: 'cover',
        }}
        className={styles.backgroundImage}
      />
      <form className={styles.loginFormContainer} onSubmit={submissionHandler}>
        
        <ul className={styles.loginItemList}>
          {inputListItems.map((element) => {
            return (
              <li key={element.id} className={`${styles.listItem} ${chathura.className}`}>
                <div className={`${styles.inputItemList}`}>
                  <label htmlFor={element.data}>{element.loginFieldName}</label>
                  <input 
                    className={`${styles.inputFieldStyle}`}
                    placeholder={element.placeholder}
                    type={element.type}
                    name={element.data}
                    id={element.data}
                    value={loginData[element.data as keyof loginDataProps]}
                    onChange={inputHandler}
                    required={element.required}
                  />
                  <ClearButton setting={styles.clearButton} handleClear={() => clearInputFIelds(element.data)} />
                </div>
              </li>
            )
          })}
        </ul>
        <button
          className={styles.submitButton}
          type="submit"
        >
          Log in
        </button>
        <p className={styles.textNewAccount}>No account? Create one <Link href="/signup" className={styles.textNewAccountLink}>here</Link></p>
      </form>
    </div>
  )
}