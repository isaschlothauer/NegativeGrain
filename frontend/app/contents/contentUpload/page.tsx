'use client'

import { useEffect, useContext, useRef, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation';
import { imageData } from './uploadInputItem'
import { UserDataContext } from '../../context/userContext';
import styles from './page.module.css';
import Image from 'next/image';

import axios from 'axios';
import ClearButton from '@/app/_components/ClearButton';

interface ImageDataProps {
  imageTitle: string,
  location: string,
  cameraBrand: string,
  cameraModel: string,
  lensBrand: string,
  lensModel: string,
  flength: string,
  aperture: string,
  filmStock: string,
  caption: string,
}

interface fileDataProps {
    fileName: File | null,
    imageData: string,
}

interface ErrorProps {
  messages: string;
}

// TODO
// Setup backend URL path
// Change database table

// Image file format
// const imageMimeType = /image\/(png|jpg|jpeg)/i;
const imageMimeType = ['image/jpg', 'image/png', 'image/jpeg'];

export default function ContentUpload () {
  const { isLoggedIn } = useContext(UserDataContext);
  const { isUserLoggedIn } = isLoggedIn;
  const [ fileData, setFileData] = useState<fileDataProps>({
    fileName: null,
    imageData: ''
  })
  const [ fileDataError, setFileDataError] = useState<string | null>()
  const [ imageDetails, setImageDetails ] = useState<ImageDataProps>({
    imageTitle: '',
    location: '',
    cameraBrand: '',
    cameraModel: '',
    lensBrand: '',
    lensModel: '',
    flength: '',
    aperture: '',
    filmStock: '',
    caption: ''
  })
  const [ pageRender, setPageRender ] = useState<boolean>(true);
  const [ storageOperationOk, setStorageOperationOk ] = useState<boolean>(false);
  const [ uploadErrorMsg, setUploadErrorMsg ] = useState<ErrorProps[]>([]);

  const router = useRouter();

  // const router = useRouter();
  const inputRef: any = useRef(null);

  // Preview image function
  function previewSubmit(e: any) {
    e.preventDefault();

    const file = e.currentTarget[0].files?.[0];

    // if (!file.type.match(imageMimeType)) {
    if (!imageMimeType.includes(file.type)) {
      setFileDataError("Invalid image type");
      setFileData((prevState) => ({
        ...prevState,
        fileName: null,
        imageData: ''
      }));

      // Clears file name 
      inputRef.current.value = '';

      setTimeout(() => {
        setFileDataError("")
      }, 2000)
      return;
    }

    setFileData((prevState) => ({
      ...prevState,
      fileName: file
    }))
  }

  useEffect(() => {
    if (fileData.fileName) {
      const fileReader = new FileReader();

      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result) {
          setFileData((prevState) => ({
            ...prevState,
            imageData: result.toString()
          }))
        }
      };

      fileReader.readAsDataURL(fileData.fileName);
    }
  }, [fileData.fileName, fileData]);

  // Submit function
  const uploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    // Append the file to the FormData object
    if (fileData.fileName) {
      try {
        formData.append('imageFile', fileData.fileName); // 'imageFile' is the key under which the file will be sent
      }
      catch (error: unknown) {
        console.error('FormData append operation failed');
      }
    } else {
      console.error('No fileData');
    }
      
    // Appending image details to formData
    Object.entries(imageDetails).forEach(([key, value]) => {
      formData.append(key, value);
    })

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_UPLOAD}`,
        formData,
        {
          withCredentials: true
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setStorageOperationOk(true);

          setTimeout(() => {
            router.push('/contents');
          }, 1300)
        }
      })
    }
    catch (err: any) {
      console.error("upload error: ", err)

      if (err.response.status === 401) {
        setPageRender(false);

        setTimeout(() => {
          router.push('/');
        }, 2000)
      }
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> )  => {
    const { name, value } = e.target

    setImageDetails((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  // Clear input fields
  const clearInputFIelds = (data: string) => {
    setImageDetails((prevState) => ({
      ...prevState,
      [data]: ''
    }))
  }

  // Clear all fields
  const clearAll: () => void = () => {
    Object.entries(imageDetails).map((element) => (
      setImageDetails((prevState) => ({
        ...prevState,
        [element[0]]: ''
      }))
    ))

    // CLear fileData state
    if (fileData.fileName) {
      setFileData((prevState) => ({
        ...prevState,
        fileName: null
      }))
    } else {
      setFileData((prevState) => ({
        ...prevState,
        imageData: ''
      }))
    }
  }

  const responseTextRender = () => {
    return (
      <ul className={styles.errorMsgsUL}>
        {uploadErrorMsg.map((element, index) => (
          <li key={index} className={styles.errorMsgList}>* {element.messages}</li>
        ))}
      </ul>
    )
  }

  return (
    <>
    {isUserLoggedIn?
      <section>
        {!storageOperationOk? 
        <div className={styles.contentUploadContainer}>
          <div className={styles.uploadMain}>
            <p className={styles.uploadTitle}>Image Upload</p>
            {!fileData.fileName?

            // Preview image form
              <form
                encType="multipart/form-data"
                onSubmit={previewSubmit}
                className={styles.uploadForm}
              >
                <input
                  type="file"
                  name="upload"
                  ref={inputRef}
                  className={styles.uploadInput}
                  accept='.png, .jpg, .jpeg'
                  required
                />
                <button className={styles.uploadSubmitButton} type="submit">Preview</button>
              </form>
            :
              fileData.imageData && (
                pageRender?
              <form encType="multipart/form-data"
                onSubmit={uploadSubmit}
                className={styles.uploadForm}
              >
                <div className={styles.previewContainer}>
                  <div className={styles.imagePosition}>
                    <Image
                      src={fileData.imageData}
                      width={700}
                      height={700}
                      alt={`${fileData?.fileName} preview`}
                      sizes="100vw"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
              
              {}
              <ul className={styles.imageDetailList}>

              {/* Image data input fields */}
              {imageData.map((element: any) => {
                return (
                  element.id !== 8?
                  <li key={element.id}>
                    <div className={`${styles.inputItemList}`}>
                      <label htmlFor={element.data}>{element.imageDetailInputTitle}</label>
                      <div className={styles.inputFieldClearIcon}>
                        <input
                          className={`${styles.inputFieldStyle}`}
                          placeholder={element.placeholder}
                          type={element.type}
                          name={element.data}
                          id={element.data}
                          value={imageDetails[element.data as keyof ImageDataProps]}
                          onChange={handleInputChange}
                          required={element.required}
                        />
                        <ClearButton
                          setting={styles.clearButton}
                          handleClear={() => clearInputFIelds(element.data)}
                        />
                      </div>
                    </div>
                  </li>
                  :
                  <li key={element.id} className={styles.textAreaStyle}>
                    <label htmlFor={element.data}>{element.imageDetailInputTitle}</label>
                    <textarea
                      className={`${styles.inputTextArea}`}
                      placeholder={element.placeholder}
                      name={element.data}
                      id={element.data}
                      value={imageDetails[element.data as keyof ImageDataProps]}
                      onChange={handleInputChange}
                      required={element.required}
                    />
                  </li>
                )
              })}
              </ul>
              {responseTextRender()}
              <div className={styles.submitCancelButtonContainer}>
                <button
                  className={styles.uploadSubmitButton}
                  type="button"
                  onClick={clearAll}
                >
                    Cancel
                </button>
                <button
                  className={styles.uploadSubmitButton}
                  type="submit">
                    Upload
                </button>
              </div>
              </form>
              : 
              <div className={styles.redirectMsg}>User session expired. Redirecting...</div>
            )
          }

          {/* Error message */}
          {fileDataError && <div className={styles.errorMsg}>{fileDataError}</div>}

          </div>
        </div>
        
        : 
          <div className={styles.uploadSuccessMsg}>Upload successful</div>
        }
        
      </section>
    :
      <div>Loading</div>}
    </>

  )
}
