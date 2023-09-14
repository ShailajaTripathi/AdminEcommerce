import React, { useEffect, useState } from 'react'
import { Navigate, Outlet ,Redirect} from 'react-router-dom'

const AuthRoutes = ({children}) => {

    return true ? <Navigate to="/"/> : <Outlet/>
}

export default AuthRoutes