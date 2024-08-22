'use client'
import { ChangeEvent, ReactHTMLElement, useEffect, useState } from 'react';
import { chathura } from '@/app/layout';
import styles from './page.module.css';
import { inputListItems } from './inputList';
import { useContext } from 'react';
import { UserDataContext } from '../context/userContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginBackground from '../../public/images/D75_7907-resize.jpg';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useExpirationValidator } from '../hooks/useExpirationValidator';
import { LoginStateSetter } from '../_services/LoginStateSetter';

const ClearButton = dynamic(() => import('../_components/ClearButton'))

interface loginDataProps {
  username: string,
  password: string
}

interface ErrorProps {
  messages: string;
}

export default function Login () {
  const [ loginData, setLoginData ] = useState<loginDataProps>({
    username: '',
    password: '',
  })
  const [ loginResponseMsg, setLoginResponseMsg ] = useState<ErrorProps[]>([])

  const router = useRouter();
  const authenticationState : any = useExpirationValidator();

  // Sets isUserLoggedIn context
  // console.log("login page", authenticationState)
  // LoginStateSetter(authenticationState)
  
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

  const submissionHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous backend error messages
    setLoginResponseMsg([])

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_LOGIN}`, 
        loginData,
        {withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json', 
          }
        }
      )

      // Clear input fields
      if (response.data.success === true) {
        setLoginData({
          username: '',
          password: ''
        })
      }

      // Clear response mesasge
      setLoginResponseMsg([])

      // Render success message
      setLoginResponseMsg(prevState => {
        return [...prevState, { messages: "Sign in successful" }];
      })

      // Message and redirect delay. 2 sec
      setTimeout(() => {
        setLoginResponseMsg([]); // Clear validation messages
        router.push('/contents')
      }, 2000)

    }
    catch (error) {
      console.error(error);
      setLoginResponseMsg(prevState => {
        return [...prevState, { messages: "Unable to authenticate username and/or password" }];
      })
    }
  }

  const responseTextRender = () => {
    return (
      <ul className={styles.errorMsgsUL}>
        {loginResponseMsg.map((element, index) => (
          <li key={index} className={styles.errorMsgList}>* {element.messages}</li>
        ))}
      </ul>
    )
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
        <p className={styles.loginComponentTitle}>Sign in</p>
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
                    value={loginData[element.data as keyof loginDataProps] || ''}
                    onChange={inputHandler}
                    required={element.required}
                  />
                  <ClearButton setting={styles.clearButton} handleClear={() => clearInputFIelds(element.data)} />
                </div>
              </li>
            )
          })}
        </ul>
        {responseTextRender()}
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