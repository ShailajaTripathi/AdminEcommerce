import React from 'react'
import { useAdminInfo } from '../context/AdminContextDetail'
import { Navigate } from 'react-router-dom'
import { home } from './routingConsts'

const ProtectedRoutes = ({ children }) => {
    const currentUserContext = useAdminInfo()

    if (currentUserContext?.currentUser !== null) return children
    else if (currentUserContext?.currentUser == null)
        return <Navigate to={home} />
    else return null
}

export default ProtectedRoutes
