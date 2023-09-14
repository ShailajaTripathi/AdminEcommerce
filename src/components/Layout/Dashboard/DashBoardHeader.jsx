import React, { useState, useRef } from 'react'
import { Dropdown } from 'react-bootstrap'
import UserProfile from '../../../assets/images/user-profile.png'
import { ReactComponent as IconStore } from '../../../assets/images/icons/icon-store.svg'
import { ReactComponent as IconCollapseToggle } from '../../../assets/images/icons/icon-collapse-toggle.svg'
import { useLocation,useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { home, login,editprofile } from '../../../config/routingConsts'
import { useAdminInfo } from '../../../context/AdminContextDetail'
import DeleteModal from '../../../components/DeleteModal'
import { useMutation } from '@tanstack/react-query'
import requestApi from '../../../utils/request'
import Swal from 'sweetalert2'

async function logoutUser() {
    return await requestApi.post(`/logout`)
}

const DashBoardHeader = ({ setChildValue, childValue }) => {

    const currentUserContext = useAdminInfo()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const sideMenu = t('common', { returnObjects: true })
    const { state } = useLocation()
    const handleToggle = () => {
        setChildValue(!childValue)
    }


    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const handleDeleteModal = () => {
        setIsDeleteModal(true)
    }
    const logoutMutation = useMutation(logoutUser, {
        onSuccess: (data) => {
            currentUserContext.setCurrentUser(null)
            localStorage.removeItem('admin')
            localStorage.removeItem('adminToken')
            setIsDeleteModal(false)
            navigate(home)
        },
        onError: (error) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '',
                text: error?.message
            })
        }
    })


    return (
        <div className="admin-header">
            <div className="header-left">
                {/* <div class={`collapse-toggle ${childValue === false ? 'active' : ''}`} onClick={handleToggle}><i></i></div> */}
                <div className="collapse-toggle-icon" onClick={handleToggle}>
                    <IconCollapseToggle />
                </div>
                {/* <h1>{state ?? 'Dashboard'}</h1> */}
            </div>
            <div className="header-right">
                <Dropdown>
                    <Dropdown.Toggle variant=" primary" id="dropdown-basic">


                    {currentUserContext?.currentUser ? (
                                        <div className="logo">
                                            <img
                                                src={
                                                    currentUserContext
                                                        ?.currentUser
                                                        ?.profilePic
                                                }
                                                alt=""
                                                width="35"
                                                height="35"
                                                style={{
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="logo">
                                            <img src={UserProfile} alt="user-profile" />
                                        </div>
                                    )}
                        {currentUserContext?.currentUser
                                                ?.firstName}  {currentUserContext?.currentUser
                                                    ?.lastName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>navigate(editprofile)}>
                            {sideMenu.ProfileSettings}
                        </Dropdown.Item>
                        <Dropdown.Item  onClick={() => handleDeleteModal()}>
                            {sideMenu.Logout}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>


            <DeleteModal
                                message={
                                    <>
                                        Are you sure you want to <br /> Logout ?
                                    </>
                                }
                                handleDelete={() => {
                                    logoutMutation.mutate()
                                }}
                                isLoading={logoutMutation.isLoading}
                                setIsDeleteModal={setIsDeleteModal}
                                isDeleteModal={isDeleteModal}
                                // isLogout
                            />

        </div>


    )
}

export default DashBoardHeader
