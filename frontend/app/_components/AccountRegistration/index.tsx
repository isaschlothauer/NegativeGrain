import { chathura } from '@/app/layout'
import styles from './index.module.css'
import { RegistrationListItems } from './registrationList'
import Link from 'next/link'
import { newUserRDataProps } from '../../signup/page'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import dynamic from 'next/dynamic';
const ClearButton = dynamic(() => import('../ClearButton'))

interface NewAccountProps {
  newUserData: newUserRDataProps;
  setNewUserData: Dispatch<SetStateAction<newUserRDataProps>>;
  submissionHandler: () => void
}

interface InputFieldDataProps {
  data: string;
  placeholder: string;
  registrationInputFieldItem: string;
  required: boolean;
  type: string
}

// TODO
// Backend routing

export default function AccountRegistration ({ newUserData, setNewUserData, submissionHandler }: NewAccountProps) {

  // Handling parent state update 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;

    setNewUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  // Clear input fields
  // const clearInputFIelds = (listData: InputFieldDataProps) => {
const clearInputFIelds = (data: string) => {

    // const { data } = listData;

    setNewUserData((prevState) => ({
      ...prevState,
      [data]: ''
    }))
  }
  
  return (
    <>
      <form className={styles.loginContainer} onSubmit={submissionHandler}>
        <p className={styles.accountRegstrationTitle}>Account registration</p>
        <p><span className={styles.requiredMark}>*</span> Required data</p>

        <ul className={styles.regItemList}>
          {RegistrationListItems.map((element) => {
            return (
              <li key={element.id} className={`${chathura.className}`}>
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
        <button
          className={styles.submitButton}
          type="submit"
        >
          Register
        </button>
        <Link href="/" className={styles.textNewAccountLink}>Cancel</Link>
      </form>
    </>
  )
}