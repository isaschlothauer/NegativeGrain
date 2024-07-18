import { chathura } from '@/app/layout'
import styles from './index.module.css'
import { inputListItems } from './inputList'
import Link from 'next/link'

export default function Login () {
  return (
    <>
      <form className={styles.loginContainer}>
        
        <ul className={styles.loginItemList}>
          {inputListItems.map((inputField) => {
            return (
              <li key={inputField.id} className={`${styles.inputItemList} ${chathura.className}`}>
                <label>{inputField.loginFieldName}</label>
                <input 
                  className={`${styles.inputFieldStyle}`}
                  placeholder={inputField.placeholder}
                  type={inputField.type}
                />
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
        <p className={styles.textNewAccount}>No account? Create one <Link href="/SignUp" className={styles.textNewAccountLink}>here</Link></p>
      </form>
    </>
  )
}