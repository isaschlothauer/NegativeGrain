import styles from './index.module.css'
import { chathura } from '@/app/layout'
import Login from '../LogIn';
import landingBackground from '../../../public/images/_D753897_resize.jpg'
import Image from 'next/image'

export default function SignedOffLandingPage () {
  return (
    <div className={styles.signUp}>
      <Image 
        src={landingBackground}
        alt="Black and white image of shadow and light over traditional Japanese portable lamp"
        width={0}
        height={0}
        style={{
          objectFit: 'cover',
        }}
        className={styles.backgroundImage}
      />
      <div className={styles.pageContainer}>
        <div className={styles.mainSection}>

          <p className={styles.landingText}>
            Discover photographers and photographic work through Negative Grain. This is a platform for photographers and photography lovers, providing a distraction free photo sharing and viewing experience. 
          </p>
        </div>

        <div>

          
        </div>
      
        {/* <NewAccount 
          newUserData={newUserData}
          setNewUserData={setNewUserData}
          submissionHandler={submissionHandler}
        /> */}
      </div>
  </div>
  )
  // return (
  //   <div className={styles.landing}>
  //     <Image 
  //       src={landingBackground}
  //       alt="Black and white image of shadow and light over traditional Japanese portable lamp"
  //       width={0}
  //       height={0}
  //       style={{
  //         objectFit: 'cover',
  //       }}
  //       className={styles.backgroundImage}
  //     />

  //     <div className={styles.mainPageContainer}>
  //       <div className={`${styles.mainLandingPage}`}>
  //         <p className={styles.landingText}>
  //           Discover photographers and photographic work through Negative Grain. This is a platform for photographers and photography lovers, providing a distraction free photo sharing and viewing experience. 
  //         </p>
  //         <div className={styles.userDataInputComponents}>
  //           <Login />
  //         </div>
  //       </div>
  //     </div>
  // </div>
  // )
}