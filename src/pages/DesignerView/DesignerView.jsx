import React, { useRef, useState } from 'react'
import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/images/delete-icon-new.svg'
import { ReactComponent as BackIcon } from '../../assets/images/icons/left-arrow-icon.svg'
import ProfileImage from '../../assets/images/business-banner.webp'
import { useNavigate, useParams } from 'react-router-dom'
import { designerManagement } from '../../config/routingConsts'
import requestApi from '../../utils/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import VendorProductTab from '../../components/TabsForVendors/VendorProductTab'
import VendorOrderTab from '../../components/TabsForVendors/VendorOrderTab'
import DeleteModal from '../../components/DeleteModal/DeleteModal'

//#region  API Call for view Vendor Data
const  vendorViewDetail= async(sellerId) => {
        return await requestApi.post(`vendor/view`,{sellerId},{ headers: true }).then((res)=>{
                        return res.data
            })  
}
//#endregion

const DesignerView = () => {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("products");
    const {sellerId} =useParams()
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [deleteId, setDelteId] = useState('')
    const queryClient = useQueryClient()
    const EditDataRef = useRef(null)

    const { data, isLoading } = useQuery({
        queryKey: ['vendor-view'],
        queryFn: () => vendorViewDetail(sellerId),
        enabled: !!sellerId,
        onSuccess: (data) => {
        //     reset({
        //         size:data?.data?.name
        //     }) 
         },
         onError:(error)=>{
             console.log(error.message)       
         }
         
    })
    
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };


     //#region  Delete Designer(Seller) by ID 
     
    const handleDeleteModal = (id) => {
        setIsDeleteModal(true)
        setDelteId(id)
    }

     function handleDelete(sellerId) {
        mutationDelete.mutate(sellerId)
        setIsDeleteModal(false)
        navigate(designerManagement)
    }

    async function deleteSellerById(sellerId) {
        return await requestApi.post(`vendor/delete`, {
            sellerId
        })
    }

    const mutationDelete = useMutation(deleteSellerById, {
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries('designerList')
            setIsDeleteModal(false)
            EditDataRef.current = null
        },
        onError: () => {
            EditDataRef.current = null
        }
    })

  return (
      <>
          <div className="admin-card vendor-details">
              <div className="back-edit-wrap">
                  <div
                      className="back-btn"
                      onClick={() => navigate(designerManagement)}
                  >
                      <BackIcon />
                      <span>Back</span>
                  </div>
                  <div className="edit-details"
                  onClick={() =>
                    handleDeleteModal(
                        sellerId
                    )
                }
                  >
                      <DeleteIcon /> <span>Delete</span>
                  </div>
              </div>

              <div className="profile-image">
                  <img src={data?.data?.profilePic} alt="Vendor-Image" />
              </div>
              <div className="vendor-info">
                  <div className="vendor-box">
                      <p>Vendor ID</p>
                      <p className="bold">#{data?.data?.sellerId}</p>
                  </div>
                  <div className="vendor-box">
                      <p>Vendor name</p>
                      <p className="bold">
                          {data?.data?.fullName ? data?.data?.fullName : '-'}
                      </p>
                  </div>
                  <div className="vendor-box">
                      <p>Email address</p>
                      <p className="bold">
                          {data?.data?.email ? data?.data?.email : '-'}
                      </p>
                  </div>
                  <div className="vendor-box">
                      <p>Total products</p>
                      <p className="bold">
                          {data?.data?.productData > 0
                              ? data?.data?.productData?.length
                              : '0'}
                      </p>
                  </div>
                  <div className="vendor-box">
                      <p>Total orders</p>
                      <p className="bold">
                          {data?.data?.orderData > 0
                              ? data?.data?.orderData?.length
                              : '0'}
                      </p>
                  </div>
                  {/* <div className="vendor-box">
                      <p>Auction</p>
                      <p className="bold">164</p>
                  </div> */}
                  <div className="vendor-box">
                      <p>Service fees</p>
                      <p className="bold">10%</p>
                  </div>
              </div>
          </div>
          <div className="tabbing-wrapper">
              <div className="admin-card tab-menu" id="nav-tab">
                  <ul>
                      <li className="tab-link">
                          <a
                              className={
                                  activeTab === 'products' ? 'active' : ''
                              }
                              onClick={() => handleTabClick('products')}
                          >
                              Products
                          </a>
                      </li>
                      <li className="tab-link">
                          <a
                              className={activeTab === 'orders' ? 'active' : ''}
                              onClick={() => handleTabClick('orders')}
                          >
                              Orders
                          </a>
                      </li>
                  </ul>
              </div>
              <div className="tab-content p-0" id="nav-tabContent">
                  <div
                      id="products"
                      className={`tab-pane ${
                          activeTab === 'products' ? 'active' : ''
                      }`}
                  >
                      <VendorProductTab
                          tableContent={data?.data?.productData}
                          loader={isLoading}
                      />
                  </div>
                  <div
                      id="orders"
                      className={`tab-pane ${
                          activeTab === 'orders' ? 'active' : ''
                      }`}
                  >
                      <VendorOrderTab />
                  </div>
              </div>
          </div>

          {/* <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">.2..</div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">.1..</div>
  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">..3.</div>
</div> */}

          <DeleteModal
              message={
                  <>
                      Are you sure you want to <br /> Delete this record ?
                  </>
              }
              setIsDeleteModal={setIsDeleteModal}
              isDeleteModal={isDeleteModal}
              handleDelete={() => handleDelete(deleteId)}
          />
      </>
  )
}

export default DesignerView