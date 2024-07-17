import { chathura } from '@/app/layout'
import styles from './index.module.css'
import { RegistrationListItems } from './registrationList'
import Link from 'next/link'
import { newUserRDataProps } from '../../SignUp/page'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface NewAccountProps {
  newUserData: newUserRDataProps;
  setNewUserData: Dispatch<SetStateAction<newUserRDataProps>>;
  submissionHandler: () => void
}

// TODO
// Backend routing

export default function NewAccount ({ newUserData, setNewUserData, submissionHandler }: NewAccountProps) {

  
  // Handling parent state update 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;

    setNewUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }
  
  return (
    <>
      <form className={styles.loginContainer} onSubmit={submissionHandler}>
        <p>Account registration</p>
        <ul className={styles.regItemList}>
        <p><span className={styles.requiredMark}>*</span> Required data</p>

          {RegistrationListItems.map((element) => {
            return (
              <li key={element.id} className={`${styles.inputItemList} ${chathura.className}`}>
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