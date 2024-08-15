'use client'

import { useEffect, useContext, useRef, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation';
import { imageData } from './uploadInputItem'
import { UserDataContext } from '../../context/userContext';
import styles from './page.module.css';
import Image from 'next/image';

import axios from 'axios';
import ClearButton from '@/app/_components/ClearButton';

interface imageDataItemProps {
  imageDetailInputTitle: string,
  placeholder: string,
  data: string,
  type: string,
  required: boolean,
}

interface ImageDataProps {
  imageTitle: string,
  brand: string,
  camera: string,
  lense: string,
  flength: string,
  aperture: string,
  filmStock: string,
  description: string,
}

interface ImageFileProps { 
    fileName: File | null,
    fileDataURL: string,
}

// TODO
// Setup backend URL path
// Change database table

// Image file format
const imageMimeType = /image\/(png|jpg|jpeg)/i;

export default function ContentUpload () {
  const { isLoggedIn } = useContext(UserDataContext);
  const { isUserLoggedIn } = isLoggedIn;
  const [ imageFile, setImageFile] = useState<ImageFileProps>({
    fileName: null,
    fileDataURL: ''
  })
  const [ imageFileError, setImageFileError] = useState<string | null>()
  const [fileDataURL, setFileDataURL] = useState('');
  const [ imageDetails, setImageDetails ] = useState<ImageDataProps>({
    imageTitle: '',
    brand: '',
    camera: '',
    lense: '',
    flength: '',
    aperture: '',
    filmStock: '',
    description: ''
  })

  const router = useRouter();
  const inputRef: any = useRef(null);

  function previewSubmit(e: any) {
    e.preventDefault();

    const file = e.currentTarget[0].files?.[0];

    if (!file.type.match(imageMimeType)) {
      setImageFileError("Invalid image type");

      setTimeout(() => {
        setImageFileError("")
      }, 2000)
      return;
    }

    setImageFile((prevState) => ({
      ...prevState,
      fileName: file
    }))
  }

  useEffect(() => {
    if (imageFile.fileName) {
      const fileReader = new FileReader();

      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result) {
          setImageFile((prevState) => ({
            ...prevState,
            fileDataURL: result.toString()
          }))
        }
      };

      fileReader.readAsDataURL(imageFile.fileName);
    }
  }, [imageFile.fileName]);

  const uploadSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Merging image data
    const image = {...imageFile, ...imageDetails}

    // TO DO: CREATE AXIOS QUERY
    // axios

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

    // CLear ImageFile state
    if (imageFile.fileName) {
      setImageFile((prevState) => ({
      ...prevState,
      fileName: null
    })) 
    } else {
      setImageFile((prevState) => ({
        ...prevState,
        fileDataURL: ''
      })) 
    }
  }

  return (
    <>
    {isUserLoggedIn? 
        <section>
        <div className={styles.contentUploadContainer}>
          <div className={styles.uploadMain}>
            <p className={styles.uploadTitle}>Image Upload</p>
            {!imageFile.fileName? 
              <form encType="multipart/form-data" onSubmit={previewSubmit} className={styles.uploadForm}>
              <input 
                type="file" 
                name="upload" 
                ref={inputRef} 
                className={styles.uploadInput}
                accept='.png, .jpg, .jpeg'  
              />
              <button className={styles.uploadSubmitButton} type="submit">Preview</button>
            </form>
            :
            imageFile.fileDataURL && (
              <form encType="multipart/form-data" 
                onSubmit={uploadSubmit} 
                className={styles.uploadForm}
              >
                <div className={styles.previewContainer}>
                  <div className={styles.imagePosition}>
                    <Image
                      src={imageFile.fileDataURL}
                      width={700}  
                      height={700} 
                      alt={`${imageFile?.fileName} preview`}
                      sizes="100vw"
                      style={{ maxWidth: '100%', height: 'auto' }} 
                    />
                  </div>
                </div>
                              
              <ul className={styles.imageDetailList}>
              
              {imageData.map((element: any) => {
                return (
                  element.id !== 7? 
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
                  // MISSING VALUE
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
            )
          }

          {/* Error message */}
          {imageFileError && <div className={styles.errorMsg}>{imageFileError}</div>}
          
          </div>
        </div>
      </section>
    : 
      <div>Loading</div>}
    </>

  )
}
