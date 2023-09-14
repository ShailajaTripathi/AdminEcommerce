import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import {
    home,
    login,
    forgotpassword,
    resetpassword,
    ordermanagement,
    productcatalog,
    customermanagement,
    promotionsmanagement,
    shippingmanagement,
    paymentsmanagement,
    contactus,
    cms,
    privacypolicy,
    termsandconditions,
    vendorlisting,
    categoricallisting,
    vendorpromotion,
    consumerpromocodemanagement,
    commissionmanagement,
    querymanagement,
    sizemanagement,
    colormanagement,
    typemanagement,
    materialmanagement,
    editprofile,
    changepassword,
    coloraddedit,
    materialaddedit,
    typeaddedit,
    sizeaddedit,
    vendorview,
    subcategorymanagement,
    subcategoryaddedit,
    categorymanagement,
    categoryaddedit,
    designerManagement,
    designerview,
    viewproductdetails,
    viewvariantdetails,
    buyermanagement,
    viewbuyerdetails,
    viewquerydetails,
    faqmanagement
} from './routingConsts'

import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import SignUpLayout from '../components/Layout/SignUpLayout'
import Dashboard from '../pages/Dashboard/Dashboard'
import OrderManagement from '../pages/OrderManagement'
import ProductCatalog from '../pages/ProductCatalog'
import CustomerManagement from '../pages/CustomerManagement'
import ShippingManagement from '../pages/ShippingManagement'
import Contactus from '../pages/Contactus'
import DashboardLayout from '../components/Layout/Dashboard/DashboardLayout'
import PromotionsManagement from '../pages/PromotionsManagement'
import PaymentsManagement from '../pages/PaymentsManagement'
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy'
import TermsAndConditions from '../pages/TermsAndConditions/TermsAndConditions'
import VendorListing from '../pages/VendorListing'
import CategoricalListing from '../pages/CategoricalListing'
import SubCategoryManagement from '../pages/SubCategoryManagement'
import VendorPromotion from '../pages/VendorPromotion/VendorPromotion'
import ConsumerPromocodeManagement from '../pages/ConsumerPromocodeManagement'
import QueryManagement from '../pages/QueryManagement'
import SizeManagement from '../pages/SizeManagement'
import { useAdminInfo } from '../context/AdminContextDetail'
import { AxiosInterceptor } from '../utils/request'
import ProtectedRoutes from './ProtectedRoutes'
import CommissionManagement from '../pages/CommissionManagement'
import ColorManagement from '../pages/ColorManagement'
import TypeManagement from '../pages/TypeManagement'
import MaterialManagement from '../pages/MaterialManagement'
import EditProfile from '../pages/EditProfile'
import ChangePassword from '../pages/ChangePassword'
import ColorAddEdit from '../pages/ColorAddEdit'
import MaterialAddEdit from '../pages/MaterialAddEdit'
import TypeAddEdit from '../pages/TypeAddEdit'
import SizeAddEdit from '../pages/SizeAddEdit'
import SubCategoryAddEdit from '../pages/SubCategoryAddEdit'
import CategoryManagement from '../pages/CategoryManagement'
import CateogryAddEdit from '../pages/CateogryAddEdit'
import DesignerManagement from '../pages/DesignerManagement'
import DesignerView from '../pages/DesignerView'
import ViewProductDetails from '../pages/ViewProductDetails/ViewProductDetails'
import ViewVariantDetails from '../pages/ViewVariantDetails/ViewVariantDetails'
import BuyerManagement from '../pages/BuyerManagement/BuyerManagement'
import ViewBuyerDetails from '../pages/ViewBuyerDetails/ViewBuyerDetails'
import ViewQueryDetails from '../pages/ViewQueryDetails/ViewQueryDetails'
import FAQManagement from '../pages/FAQManagement/FAQManagement'

const Routing = () => {
    // useEffect(()=>{
    //         if(process.env.REACT_APP_ENV){
    //             console.disable()
    //         }
    // },[])

    const { currentUser } = useAdminInfo()
    return (
        <>
            <AxiosInterceptor>
                <Routes>
                    {!currentUser ? (
                        <Route path={home} element={<SignUpLayout />}>
                            <Route index element={<Login />} />
                            <Route
                                path={forgotpassword}
                                element={<ForgotPassword />}
                            />
                            <Route
                               path={`${resetpassword}/:token`}
                                element={<ResetPassword />}
                            />
                        </Route>
                    ) : (
                        <>
                            <Route path={home} element={<DashboardLayout />}>
                                <Route index element={<Dashboard />} />

                                <Route
                                    path={categorymanagement}
                                    element={<CategoryManagement />}
                                />

                                <Route
                                    path={categoryaddedit}
                                    element={<CateogryAddEdit />}
                                />
                                <Route
                                    path={`${categoryaddedit}/:categoryId`}
                                    element={<CateogryAddEdit />}
                                />

                                <Route
                                    path={coloraddedit}
                                    element={<ColorAddEdit />}
                                />
                                <Route
                                    path={`${coloraddedit}/:colorId`}
                                    element={<ColorAddEdit />}
                                />

                                <Route
                                    path={materialaddedit}
                                    element={<MaterialAddEdit />}
                                />
                                <Route
                                    path={`${materialaddedit}/:materialId`}
                                    element={<MaterialAddEdit />}
                                />

                                <Route
                                    path={typeaddedit}
                                    element={<TypeAddEdit />}
                                />
                                <Route
                                    path={`${typeaddedit}/:typeId`}
                                    element={<TypeAddEdit />}
                                />

                                <Route
                                    path={sizeaddedit}
                                    element={<SizeAddEdit />}
                                />
                                <Route
                                    path={`${sizeaddedit}/:sizeId`}
                                    element={<SizeAddEdit />}
                                />

                                <Route
                                    path={subcategoryaddedit}
                                    element={<SubCategoryAddEdit />}
                                />
                                <Route
                                    path={`${subcategoryaddedit}/:subcategoryId`}
                                    element={<SubCategoryAddEdit />}
                                />
                                <Route
                                    path={buyermanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <BuyerManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={viewbuyerdetails}
                                    element={
                                        <ProtectedRoutes>
                                            <ViewBuyerDetails />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={ordermanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <OrderManagement />
                                        </ProtectedRoutes>
                                    }
                                />

                                <Route
                                    path={editprofile}
                                    element={
                                        <ProtectedRoutes>
                                            <EditProfile />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={changepassword}
                                    element={
                                        <ProtectedRoutes>
                                            <ChangePassword />
                                        </ProtectedRoutes>
                                    }
                                />

                                <Route
                                    path={productcatalog}
                                    element={
                                        <ProtectedRoutes>
                                            <ProductCatalog />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={viewproductdetails}
                                    element={
                                        <ProtectedRoutes>
                                            <ViewProductDetails />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={`${productcatalog}/:catalogId`}
                                    element={
                                        <ProtectedRoutes>
                                            <ViewProductDetails />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={`${productcatalog}/:catalogId/:productId`}
                                    element={
                                        <ProtectedRoutes>
                                            <ViewVariantDetails />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={sizemanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <SizeManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={colormanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <ColorManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={typemanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <TypeManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={materialmanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <MaterialManagement />
                                        </ProtectedRoutes>
                                    }
                                />

                                <Route
                                    path={designerManagement}
                                    element={
                                        <ProtectedRoutes>
                                            <DesignerManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={designerview}
                                    element={
                                        <ProtectedRoutes>
                                            <DesignerView />
                                        </ProtectedRoutes>
                                    }
                                />

                                <Route
                                    path={`${designerview}/:sellerId`}
                                    element={
                                        <ProtectedRoutes>
                                            <DesignerView />
                                        </ProtectedRoutes>
                                    }
                                />

                                <Route
                                    path={customermanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <CustomerManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={promotionsmanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <PromotionsManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={shippingmanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <ShippingManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={paymentsmanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <PaymentsManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={contactus}
                                    element={
                                        <ProtectedRoutes>
                                            <Contactus />
                                        </ProtectedRoutes>
                                    }
                                />

                                <Route
                                    path={faqmanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <FAQManagement />
                                        </ProtectedRoutes>
                                    }
                                />

                                <Route
                                    path={privacypolicy}
                                    element={
                                        <ProtectedRoutes>
                                            <PrivacyPolicy />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={termsandconditions}
                                    element={
                                        <ProtectedRoutes>
                                            <TermsAndConditions />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={vendorlisting}
                                    element={
                                        <ProtectedRoutes>
                                            <VendorListing />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={categoricallisting}
                                    element={
                                        <ProtectedRoutes>
                                            <CategoricalListing />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={subcategorymanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <SubCategoryManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={vendorpromotion}
                                    element={
                                        <ProtectedRoutes>
                                            <VendorPromotion />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={consumerpromocodemanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <ConsumerPromocodeManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={commissionmanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <CommissionManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={querymanagement}
                                    element={
                                        <ProtectedRoutes>
                                            <QueryManagement />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path={viewquerydetails}
                                    element={
                                        <ProtectedRoutes>
                                            <ViewQueryDetails />
                                        </ProtectedRoutes>
                                    }
                                />
                            </Route>
                        </>
                    )}

                    {/* <Route path={home}
          element={false ? <DashboardLayout /> : <SignUpLayout />}>
          <Route index path="/" element={false ? <Dashboard/> : <Login />} />
          <Route path={forgotpassword} element={<ForgotPassword />} />
          <Route path={resetpassword} element={<ResetPassword />} />
          <Route path={ordermanagement} element={<ProtectedRoutes><OrderManagement /></ProtectedRoutes>} />
          <Route path={productcatalog} element={<ProtectedRoutes><ProductCatalog /></ProtectedRoutes>}/>
          <Route path={vendormanagement} element={<ProtectedRoutes><VenderManagement/></ProtectedRoutes>}/>
          <Route path={customermanagement} element={<ProtectedRoutes><CustomerManagement/></ProtectedRoutes>}/>
          <Route path={promotionsmanagement} element={<ProtectedRoutes><PromotionsManagement/></ProtectedRoutes>}/>
          <Route path={shippingmanagement} element={<ShippingManagement/>}/>
          <Route path={paymentsmanagement} element={<PaymentsManagement/>} />
          <Route path={contactus} element={<Contactus/>} />
          <Route path={privacypolicy} element={<PrivacyPolicy />}/>
          <Route path={termsandconditions} element={<TermsAndConditions/>}/>
          <Route path={vendorlisting} element={<VendorListing/>}/>
          <Route path={categoricallisting} element={<CategoricalListing/>}/>
          <Route path={categoriesmanagement} element={<CategoriesManagement />}/>
          <Route path={vendorpromotion} element={<VendorPromotion />}/>
          <Route path={consumerpromocodemanagement} element={<ConsumerPromocodeManagement />}/>
           <Route path={commissionmanagement} element={<CommissionManagement />} /> 
            <Route path={querymanagement} element={<QueryManagement />} />
        </Route> */}
                </Routes>
            </AxiosInterceptor>
        </>
    )
}

export default Routing
