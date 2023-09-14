import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import Logo from '../../../assets/images/logo.svg'
import CollapseLogo from '../../../assets/images/collapse-logo.svg'

import { ReactComponent as IconSupport } from '../../../assets/images/icons/icon-support.svg'
import { ReactComponent as IconCMS } from '../../../assets/images/icons/icon-cms.svg'

//updated Icons
import { ReactComponent as IconDashboard } from '../../../assets/images/sidebarIcons/Dashboard.svg'
import { ReactComponent as IconOrderManagement } from '../../../assets/images/sidebarIcons/Ordermanagement.svg'
import  { ReactComponent as IconProductCatalog } from '../../../assets/images/sidebarIcons/Productcatalog.svg'
import  { ReactComponent as Iconmaterial } from '../../../assets/images/sidebarIcons/Materialmanagement.svg'
import  { ReactComponent as IconShipping } from '../../../assets/images/sidebarIcons/Shippingmanagement.svg'
import  { ReactComponent as IconSize } from '../../../assets/images/sidebarIcons/Sizemanagement.svg'
import  { ReactComponent as IconType } from '../../../assets/images/sidebarIcons/Typemanagement.svg'
import  { ReactComponent as IconVendor } from '../../../assets/images/sidebarIcons/Vendormanagement.svg'
import  { ReactComponent as IconPromotion } from '../../../assets/images/sidebarIcons/Promotionmanagement.svg'
import  { ReactComponent as IconColor } from '../../../assets/images/sidebarIcons/Colormanagement.svg'
import  { ReactComponent as IconCategory } from '../../../assets/images/sidebarIcons/Categorymanagement.svg'
import  { ReactComponent as IconSubCategory } from '../../../assets/images/sidebarIcons/subcategorymanagement.svg'
import  { ReactComponent as IconCustomer } from '../../../assets/images/sidebarIcons/Customermanagement.svg'
import { ReactComponent as IconPayment } from '../../../assets/images/sidebarIcons/icon-doller.svg'
import { ReactComponent as IconContactUs } from '../../../assets/images/sidebarIcons/icon-contact-us.svg'
import { ReactComponent as IconMenuClose } from '../../../assets/images/icons/icon-menu-close.svg'
import { ReactComponent as IconBuyerManagement } from '../../../assets/images/sidebarIcons/icon-buyer-management.svg'
import { useTranslation } from 'react-i18next'
import {
    categoricallisting,
    sizemanagement,
    cms,
    commissionmanagement,
    consumerpromocodemanagement,
    contactus,
    customermanagement,
    home,
    ordermanagement,
    paymentsmanagement,
    privacypolicy,
    productcatalog,
    promotionsmanagement,
    querymanagement,
    shippingmanagement,
    vendorlisting,
    vendormanagement,
    vendorpromotion,
    colormanagement,
    typemanagement,
    materialmanagement,
    subcategorymanagement,
    categorymanagement,
    designerManagement,
    buyermanagement
} from '../../../config/routingConsts'

const DashBoardSidebar = ({ childValue, setChildValue }) => {
    const [faqToggle, setFaqToggle] = useState(false)
    const [faqToggle2, setFaqToggle2] = useState(false)
    const [faqToggle3, setFaqToggle3] = useState(false)

    const location = useLocation()

    const { t } = useTranslation()
    const sideMenu = t('common', { returnObjects: true })
    const handleToggle = () => {
        setChildValue(true)
    }
    const refdata = useRef(null)

    useEffect(() => {
        refdata.current.addEventListener('click', (e) => {
            if (e.view.outerWidth <= 991 && e.target.tagName === 'A') {
                setChildValue(true)
            }
        })
    }, [])

    const CMSLinks = ['/privacy-policy', '/terms-and-conditions','/faq-management']

    return (
        <div
            className={`admin-sidebar ${childValue === false ? 'active' : ''}`}
        >
            <div className="head">
                <Link to={home} className="logo">
                    <img src={Logo} alt="logo" />
                    <img
                        src={CollapseLogo}
                        alt="collapse-logo"
                        className="collapse-logo"
                    />
                </Link>
                <div className="mobile-menu-close" onClick={handleToggle}>
                    <IconMenuClose />
                </div>
            </div>
            <ul className="sidebar-menu" ref={refdata}>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Dashboard"
                        to={home}
                        state="Dashboard"
                        className={
                            location.pathname == '/edit-profile' ||
                            location.pathname == '/change-password'
                                ? 'active'
                                : ''
                        }
                    >
                        <IconDashboard />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Order Management"
                        to={ordermanagement}
                        state="Order Management"
                    >
                        <IconOrderManagement />
                        Order Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Designer Management"
                        to={designerManagement}
                        state="Designer Management"
                        className={`${location.pathname.includes("/designer-view")  ?"active":""}`} 
                    >
                        <IconVendor />
                        Designer Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Buyer Management"
                        to={buyermanagement}
                        state="Buyer Management"
                        className={`${location.pathname.includes("/view-buyer-details")  ?"active":""}`}
                    >
                        <IconBuyerManagement />
                        Buyer Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        className={`${location.pathname.includes("/category-add-edit")  ?"active":""}`}
                        title="Category Management"
                        to={categorymanagement}
                        state="Category Management"
                    >
                        <IconCategory />
                         Category Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        className={`${location.pathname.includes("/sub-category-add-edit")  ?"active":""}`}
                        title="Sub Category Management"
                        to={subcategorymanagement}
                        state="Sub Category Management"
                    >
                        <IconSubCategory />
                        Sub Category Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Product catalog"
                        to={productcatalog}
                        state="Product catalog"
                        className={`${location.pathname.includes("/view-product-details")  ?"active":""} && ${location.pathname.includes("/view-variant-details")  ?"active":""}`}
                    >
                        <IconProductCatalog /> Product catalog
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Size Management"
                        to={sizemanagement}
                        state="Size Management"
                        className={`${location.pathname.includes("/size-add-edit") 
                        // || location.pathname.includes("/creatnewopening")
                         ?"active":""}`}
                    >
                        <IconSize /> Size Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Color Management"
                        to={colormanagement}
                        state="Color Management"
                        className={`${location.pathname.includes("/color-add-edit") 
                        // || location.pathname.includes("/creatnewopening")
                         ?"active":""}`}
                    >
                        <IconColor /> Color Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Type Management"
                        to={typemanagement}
                        state="Type Management"
                        className={`${location.pathname.includes("/type-add-edit") 
                        // || location.pathname.includes("/creatnewopening")
                        ?"active":""}`}
                    >
                        <IconType /> Type Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Material Management"
                        to={materialmanagement}
                        state="Material Management"
                        className={`${location.pathname.includes("/material-add-edit") 
                        // || location.pathname.includes("/creatnewopening")
                        ?"active":""}`}
                    >
                        <Iconmaterial /> Material Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Customer Management"
                        to={customermanagement}
                        state="Customer Management"
                    >
                        <IconCustomer />
                        Customer Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Promotion Management"
                        to={promotionsmanagement}
                        state="Promotion Management"
                    >
                        <IconPromotion  />Promotion Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Shipping Management"
                        to={shippingmanagement}
                        state="Shipping Management"
                    >
                        <IconShipping />
                        Shipping Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Payment Management"
                        to={paymentsmanagement}
                        state="Payment Management"
                    >
                        <IconPayment />
                        Payment Management
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="CMS Management"
                        to={privacypolicy}
                        className={
                            CMSLinks.includes(location.pathname) ? 'active' : '' 
                            || CMSLinks.includes(location.pathname) ? 'active' : '' 
                        }
                        state="CMS Management"
                    >
                        <IconCMS />
                        CMS Management
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Query Management"
                        to={querymanagement}
                        state="Query Management"
                        className={`${location.pathname.includes("/view-query-details") 
                        // || location.pathname.includes("/creatnewopening")
                        ?"active":""}`}
                    >
                        <IconSupport /> Query management
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Contact us"
                        to={contactus}
                        state="Contact us"
                    >
                        <IconContactUs />
                        Contact us
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default DashBoardSidebar
