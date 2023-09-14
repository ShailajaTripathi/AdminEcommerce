import React from 'react'
import { faqmanagement, privacypolicy, termsandconditions } from '../../config/routingConsts'
import { NavLink } from 'react-router-dom'

const CMS = ({ children }) => {
    return (
        <div className="settings-body">
            <div className="sidebar-tab-main admin-tab-main">
                <div className="admin-card">
                    <div className='head'>
                        <h2>CMS Management</h2>
                    </div>
                    <ul className="sidebar-tab desktop">
                        <li>
                            <NavLink
                                to={faqmanagement}
                                className="tab-btn"
                                state="faq-management"
                            >
                            FAQs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={termsandconditions}
                                className="tab-btn"
                                state="terms-and-conditions"
                            >
                                Terms and Conditions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={privacypolicy}
                                className="tab-btn"
                                state="privacy-policy"
                            >
                                Privacy Policy
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

export default CMS
