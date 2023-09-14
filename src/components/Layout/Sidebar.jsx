import React, { useEffect, useState } from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import {ReactComponent as IconGST} from '../../assets/images/icons/icon-gst-details.svg'
import {ReactComponent as IconPickupAddress} from '../../assets/images/icons/icon-pickup-address.svg'
import {ReactComponent as IconBankDetails} from '../../assets/images/icons/icon-bank-details.svg'
import {ReactComponent as IconSupplierDetails} from '../../assets/images/icons/icon-supplier-details.svg'
import { bankdetails, customermanagement, gstdetails, pickupaddress, productcatalog, supplierdetails, vendormanagement } from "../../config/routingConsts";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SELLER_GETSTEPS } from "../../Redux-Toolkit/Actions/sagaActions";

const Sidebar = () => {
  const { t } = useTranslation()
  const homePage = t('home', { returnObjects: true })
  const {state,pathname} = useLocation()
  const dispatch = useDispatch()
  const {authToken,isloading,steps} = useSelector((action) => action.authSlice)

  return sellerData.includes(state)? (
    <>
    <h1>khfgldfkl</h1>
    {/* <section className="selling-sidebar">
          <h2>    {homePage.Sidebar.title}</h2>
          <ul className="step-list">

            <li>
              <NavLink to={ordermanagement}>
              <span><IconGST/></span>
              </NavLink>
            </li>
          
            <li>
              <NavLink to={productcatalog}>
              <span><IconPickupAddress/></span>
              </NavLink>
            </li>
            
            <li>
              <NavLink>
              <span><IconBankDetails/></span>
              {vendormanagement}
              </NavLink>
            </li>
           
            <li>
              <NavLink>
              <span><IconSupplierDetails/></span>
              {customermanagement}
              </NavLink>
            </li>
          </ul>
      </section> */}
      <Outlet /> 
    </>
  ):<Navigate to="/"/>
};

export default Sidebar;
