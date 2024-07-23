'use client'
import { useState, useEffect, ChangeEvent } from 'react';
import styles from './page.module.css'
import SignInBackGround from '../../public/images/_D753943-resize.jpg'
import Link from 'next/link'
import { RegistrationListItems } from '../_components/AccountRegistration/registrationList'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import axios from 'axios';
const ClearButton = dynamic(() => import('../_components/ClearButton'))

export interface newUserRDataProps {
  username: string,
  firstname?: string,
  lastname?: string,
  email: string,
  password: string,
  cPassword: string
}

interface ErrorProps {
  message: string;
}

export default function SignUp () {
  const [ newUserData, setNewUserData ] = useState<newUserRDataProps>({
    username: 'test',
    firstname: 'firstnametest',
    lastname: 'lastnametest',
    email: '',
    password: 'asdfasdf',
    cPassword: 'asdfasdf'
  })

  // Error message array
  const [ validationFailureMsg, setValidationFailureMsg ] = useState<ErrorProps[]>([])

  const submissionHandler = async () => {

    // Clear previous backend error messages
    setValidationFailureMsg([]);


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
      // console.error(error.response.data.errors);
      const errorMsg: [] = error.response.data.errors;

      // setValidationFailureMsg(errorMsg);

      // errorMsg
      console.log(errorMsg)
      
    }
  }

    // Handling parent state update 
    const handleInputChange = (e: ChangeEvent<HTMLInputElement> ) => {
      const { name, value } = e.target;
  
      setNewUserData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  
  // Clear input fields
  const clearInputFIelds = (data: string) => {
      setNewUserData((prevState) => ({
        ...prevState,
        [data]: ''
      }))
    }
    

  // console.log(validationFailureMsg)

  const errorTextsHandler = () => {
    return (
      <ul className={styles.errorMsgsUL}>
        {validationFailureMsg.map((element, index) => (
          <li key={index} className={styles.errorMsgList}>* {element.message}</li>
        ))}
      </ul>
    )
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

        <form className={styles.loginContainer} onSubmit={submissionHandler}>
          <p className={styles.accountRegstrationTitle}>Account registration</p>
          <p><span className={styles.requiredMark}>*</span> Required data</p>

          <ul className={styles.regItemList}>
            {RegistrationListItems.map((element) => {
              return (
                <li key={element.id}>
                  <div className={`${styles.inputItemList}`}>
                    <label htmlFor={element.data}>{element.registrationInputFieldItem} {element.required && <span className={styles.requiredMark}>*</span>}</label>
                    <input 
                      className={`${styles.inputFieldStyle}`}
                      placeholder={element.placeholder}
                      type={element.type}
                      name={element.data}
                      id={element.data}
                      value={newUserData[element.data as keyof newUserRDataProps]}
                      onChange={handleInputChange}
                    />
                    <ClearButton setting={styles.clearButton} handleClear={() => clearInputFIelds(element.data)} />
                  </div>
                </li>
              )
            })}
          </ul>
          {errorTextsHandler()}
          <button
            className={styles.submitButton}
            type="submit"
          >
            Register
          </button>
          <Link href="/" className={styles.textNewAccountLink}>Cancel</Link>
        </form>
      </div>
  </div>
  )
}