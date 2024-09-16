'use client'
import { useState, ChangeEvent, useContext } from 'react';
import { UserDataContext } from '../context/userContext';
import styles from './page.module.css'
import SignInBackGround from '../../public/images/_D753943-resize.jpg'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { RegistrationListItems } from './registrationList'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import axios from 'axios';
import { useExpirationValidator } from '../hooks/useExpirationValidator'
import { LoginStateSetter } from '../_services/LoginStateSetter';

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
  messages: string;
}

export default function SignUp () {
  const [ newUserData, setNewUserData ] = useState<newUserRDataProps>({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cPassword: ''
  })

  // Error message array
  const [ validationResponse, setValidationResponse ] = useState<ErrorProps[]>([])
  const authenticationState : any = useExpirationValidator();
  const router = useRouter();

  // Sets isUserLoggedIn context
  LoginStateSetter(authenticationState)

  const submissionHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous backend error messages
    setValidationResponse([]);

    // String compare
    const passwordMatchVerification = (newUserData.password).localeCompare(newUserData.cPassword);

    if (passwordMatchVerification !== 0) {
      setValidationResponse(prevState => {
        return [...prevState, { messages: "Passwords do not match" }];
      })

      setTimeout(() => {
        setValidationResponse([])
      }, 3000);
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_REGISTER}`, 
        newUserData,
        {withCredentials: true,
          headers: {
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json', 
          }
        }
      )
      
      // Clear input fields
      if (response.data.success === true) {
        setNewUserData({
          username: '',
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          cPassword: ''
        })
      }

      // Clear error texts
      setValidationResponse([]);

      // Render success message
      setValidationResponse(prevState => {
        return [...prevState, { messages: "New account created" }];
      })

      // Message and redirect delay. 2 sec
      setTimeout(() => {
        setValidationResponse([]); // Clear validation messages
        // RE-ENABLE IT
        console.log("Enable account creation redirect")
        router.push('/')
      }, 2000)
    }
    catch (error: any) {
      const errorMsg = error.response;

      if (errorMsg.data.success == false && errorMsg.data.errors !='"cPassword" must be [ref:password]') {

        const errorList = (errorMsg.data.errors).filter((item: string) => item != `"cPassword" must be [ref:password]`)

        setValidationResponse(prevState => {
          // return [...prevState, { messages: errorList }];
          const errorMessages = errorList.map((error: string) => ({ messages: error }));
          return [...prevState, ...errorMessages];
        })
      } 
    }
  }

  // Handling parent state update 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;

    setNewUserData((prevState) => ({
      ...prevState,
      [name]: value.trim()
    }));
  }
  
  // Clear input fields
  const clearInputFIelds = (data: string) => {
      setNewUserData((prevState) => ({
        ...prevState,
        [data]: ''
      }))
    }

  const responseTextRender = () => {
    return (
      <ul className={styles.errorMsgsUL}>
        {validationResponse.map((element, index) => (
          <li key={index} className={styles.errorMsgList}>* {element.messages}</li>
        ))}
      </ul>
    )
  }

  // console.log(validationResponse)
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
            Register
          </button>
          <Link href="/" className={styles.textNewAccountLink}>Cancel</Link>
        </form>
      </div>
  </div>
  )
}