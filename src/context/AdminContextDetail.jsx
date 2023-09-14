import React,{useState} from 'react'

export const AdminContext = React.createContext()
const admin = JSON.parse(localStorage.getItem('admin'))

export const AdminProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(admin ?? null)

    return (
        <AdminContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminInfo = () => React.useContext(AdminContext)
