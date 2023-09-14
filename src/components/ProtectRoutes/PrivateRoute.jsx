import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  // const [isLogin, setIslogin] = useState(JSON.parse(localStorage.getItem("isLogin")))
  
  return false ? <Outlet/> : <Navigate to="/" />
}

export default PrivateRoute

