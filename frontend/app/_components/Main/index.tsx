'use client'
import { useSearchParams } from 'next/navigation'

import { useEffect, useContext } from 'react'
import { UserDataContext } from '../../context/userContext';


export default function Main () {
  const { isUserLoggedIn, setIsUserLoggedOn } = useContext(UserDataContext)

  // const searchParams = useSearchParams()

  // const updateUrl = (urlPath: string) => {
  //   const params = new URLSearchParams(searchParams.toString())
  //   params.set('page', urlPath)
  //   window.history.pushState(null, '', `?${params.toString()}`)
  // }

  // useEffect(() => {
  //   updateUrl('secure')
  // })

  // useEffect(() => {
  //   const pageTitle = "main";
  //   UrlUpdate(pageTitle);

  // })

  console.log("from Main", isUserLoggedIn)
  return (
    <>
      <div>
        this is a test main component
      </div>
    </>
  )
}