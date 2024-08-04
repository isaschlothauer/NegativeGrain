'use client'

import { useEffect, useContext, useRef } from 'react'
import { useExpirationValidator } from '../hooks/useExpirationValidator'
import { useRouter } from 'next/navigation';

import { UserDataContext } from '../context/userContext';
import styles from './page.module.css'
import axios from 'axios';

export default function ContentUpload () {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserDataContext);
  const authenticationState : any = useExpirationValidator();
  const router = useRouter();
  const inputRef: any = useRef(null);


  // useEffect(() => {
  //   if (authenticationState && authenticationState.response.status === 401) {
  //     setIsUserLoggedIn(false);
  //   }
  // }, [])

  // useEffect(() => {
  //   if (!isUserLoggedIn)
  //     router.push('/');
  // })

  function hSubmit(e: any) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("upload", inputRef.current.files[0]);

    console.log(formData);
    axios.post("http://localhost:5000/upload", formData);
  }


  return (
    <>
      <section>
        <div className={styles.contentUploadContainer}>
          <div className={styles.uploadMain}>
            <p className={styles.uploadTitle}>Image Upload</p>
            <form encType="multipart/form-data" onSubmit={hSubmit} className={styles.uploadForm}>
              <input type="file" name="upload" ref={inputRef} className={styles.uploadInput}/>
              <button className={styles.uploadSubmitButton} type="submit">Send</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}