import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const SignUpLayout = () => {
  return (
    <>
        <Header hideSubMenu/>
        <main className='login-wrapper'>
         {/* {isloading && <Loader /> }  */}
          <Outlet />
        </main>
    </>
  )
}

export default SignUpLayout