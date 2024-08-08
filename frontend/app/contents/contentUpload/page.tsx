'use client'

import { useEffect, useContext, useRef, useState } from 'react'
import { useExpirationValidator } from '../../hooks/useExpirationValidator'
import { useRouter } from 'next/navigation';
import { imageData } from './uploadInputItem'
import { UserDataContext } from '../../context/userContext';
import styles from './page.module.css'
import axios from 'axios';
import ClearButton from '@/app/_components/ClearButton';
import { ImageDataProps } from './uploadInputItem'

interface imageDataItemProps {
  imageDetailInputTitle: string,
  placeholder: string,
  data: string,
  type: string,
  required: boolean,
}

export default function ContentUpload () {
  // const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserDataContext);
  // const authenticationState : any = useExpirationValidator();
  // const [ imageData, setimageData ] = useState<imageDataItemProps>({
  //   imageDetailInputTitle: '',
  //   placeholder: '',
  //   data: '',
  //   type: '',
  //   required: false,
  // })
  const [ imageDetails, setImageDetails ] = useState<imageDataItemProps[]>(imageData)

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

    // const formData = new FormData();
    // formData.append("upload", inputRef.current.files[0]);

    // console.log(formData);
    // axios.post("http://localhost:5000/upload", formData);
  }

  // Clear input fields
  const clearInputFIelds = (data: string) => {
    setImageDetails((prevState) => ({
      ...prevState,
      [data]: ''
    }))
  }

  console.log(imageData)

  return (
    <>
      <section>
        <div className={styles.contentUploadContainer}>
          <div className={styles.uploadMain}>
            <p className={styles.uploadTitle}>Image Upload</p>
            <form encType="multipart/form-data" onSubmit={hSubmit} className={styles.uploadForm}>
              <input type="file" name="upload" ref={inputRef} className={styles.uploadInput}/>
              <ul className={styles.imageDetailList}>
                {imageDetails.map((element : any) => {
                  return (
                    element.id !== 6?
                  <li key={element.id}>
                    <div>
                    <label htmlFor={element.data}>{element.imageDetailInputTitle} {element.required && <span className={styles.requiredMark}>*</span>}</label>
                    <input 
                      className={`${styles.inputFieldStyle}`}
                      placeholder={element.placeholder}
                      type={element.type}
                      name={element.data}
                      id={element.data}
                      // value={newUserData[element.data as keyof newUserRDataProps]}
                      // onChange={handleInputChange}
                      required={element.required}
                    />
                    {/* <ClearButton setting={styles.clearButton} handleClear={() => clearInputFIelds(element.data)} /> */}
                    </div>
                  </li>
                  :
                  <li key={element.id}>
                    <label htmlFor={element.data}>{element.imageDetailInputTitle} {element.required && <span className={styles.requiredMark}>*</span>}</label>
                    <textarea 
                      className={`${styles.inputTextArea}`}
                      placeholder={element.placeholder}
                      name={element.data}
                      id={element.data}
                      />

                  </li>
                  )
                })}

              </ul>


              <button className={styles.uploadSubmitButton} type="submit">Upload</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}