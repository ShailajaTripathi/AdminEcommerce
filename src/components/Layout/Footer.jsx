import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import facebook from "../../assets/images/icons/icon-fb.svg"
import Instagram from "../../assets/images/icons/icon-insta.svg"
import Twitter from "../../assets/images/icons/icon-twitter.svg"
import Pinterest from "../../assets/images/icons/icon-pinterest.svg"
import { signup } from '../../config/routingConsts';

const Footer = ({onClickEvent}) => {
  const {t} = useTranslation()
  return (
    <footer className='site-footer'>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <h2>{`${t('common.PerniasPopUpShop')}`}</h2>
            <p>{`${t('footer.description')}`}</p>
            <NavLink to={signup} className='solid-red-btn'>{`${t('common.StartSelling')}`}</NavLink>
          </div>
          <div className="footer-right">
              <div className="link-group">
                <h3>{`${t('footer.SellonPerniasPopUpShop')}`}</h3>
                <ul className='site-menu'>
                  <li><Link onClick={() => onClickEvent(0)} className='menu-link'>{`${t('common.SellOnline')}`}</Link></li>
                  <li><Link onClick={() => onClickEvent(5)} className='menu-link'>{`${t('common.Howitworks')}`}</Link></li>
                  <li><Link onClick={() => onClickEvent(2)} className='menu-link'>{`${t('common.Pricing&Commission')}`}</Link></li>
                  <li><Link onClick={() => onClickEvent(3)} className='menu-link'>{`${t('common.Shipping&Returns')}`}</Link></li>
                  <li><Link onClick={() => onClickEvent(7)} className='menu-link'>{`${t('common.GrowBusiness')}`}</Link></li>
                </ul>
              </div>
              <div className="link-group">
                <h3>Follow Us</h3>
                <ul className='social-media'>
                  <li><NavLink to="/" target='_blanck'><img src={facebook} alt="facebook" /></NavLink></li>
                  <li><NavLink to="/" target='_blanck'><img src={Instagram} alt="instagram" /></NavLink></li>
                  <li><NavLink to="/" target='_blanck'><img src={Twitter} alt="twitter" /></NavLink></li>
                  <li><NavLink to="/" target='_blanck'><img src={Pinterest} alt="pinterest" /></NavLink></li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer