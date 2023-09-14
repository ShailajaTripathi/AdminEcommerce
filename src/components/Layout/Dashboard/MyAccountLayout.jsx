import React from 'react'
import { changepassword, editprofile } from '../../../config/routingConsts'
import {NavLink} from 'react-router-dom'
const MyAccountLayout = ({children}) => {
  return (
    <div className="settings-body">
        <div className="sidebar-tab-main admin-tab-main">
            <div className='admin-card'>
                <div className='head'>
                    <h2>Profile Settings</h2>
                </div>
                <ul className="sidebar-tab desktop">
                    <li>
                        <NavLink
                            to={editprofile}
                            className="tab-btn"
                            state="Edit-Profile"
                        >
                            Edit Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={changepassword}
                            className="tab-btn"
                            state="changepassword"
                        >
                        Change Password
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='tab-body'>
                <div className='admin-card'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyAccountLayout



