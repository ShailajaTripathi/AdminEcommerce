import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LOGO from "../../assets/images/logo.svg"
import { home,login,signup } from '../../config/routingConsts';

const Header = () => {
  const {t} = useTranslation()
  const {pathname} =  useLocation()
  const common = t('common', { returnObjects: true })

  const ToggleOn = () =>{
    document.body.classList.toggle('mobile-open')
  }

  return (
    <header className={"site-header login-header" }>
      <div className="header-top">
        <div className="container">
          <div className="header-inner">
            <Link className="logo" to = {home}><img src={LOGO} alt="logo"/></Link>
                {/* <div className="btn-group">
                <NavLink to={login} className='border-white-btn'>Login</NavLink>
                <NavLink to={signup} className='solid-red-btn'>Start Super Admin</NavLink>
                <div className="mobile-toggle" onClick={ToggleOn}><i></i></div>
                </div> */}
        </div>
      </div>
      </div>
      
    </header>
  )
}

export default Header