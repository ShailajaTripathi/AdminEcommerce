import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { ReactComponent as IconDeleteProduct } from '../../assets/images/icons/icon-delete.svg'
import OrdersHistoryTab from '../OrdersHistoryTab/OrdersHistoryTab'
import RatingsTab from '../RatingsTab/RatingsTab'
import ViewDeliveryAddressTab from '../ViewDeliveryAddressTab/ViewDeliveryAddressTab'

const ViewBuyerDetails = () => {
    const [Active, setActive] = useState(0)
    const [Tabdata,setTabData] = useState(
     [
  
       {
        Tab_Name: "Orders History",
        innerData :<li className='tab-body'><OrdersHistoryTab/></li>
      },
       {
         Tab_Name: "Ratings",
         innerData :<li className='tab-body'><RatingsTab/></li>
       },
       {
        Tab_Name: "View Delivery Address",
        innerData :<li className='tab-body'><ViewDeliveryAddressTab/></li>
      },
     ])
  return (
    <div className='view-product-details view-buyer-details'>
        <ul className='site-breadcrumb'>
            <li><Link>Buyer Management</Link></li>
            <li>View Buyer Details</li>
        </ul>
        <div className="admin-card">
            <div className="head">
                <h2>View Buyer Details</h2>
                <div className='delete-btn'>
                    <IconDeleteProduct/>
                </div>
            </div>
        </div>
        <div className="admin-card product-details-card buyer-profile-detail">
            <div className='image-wrapper'>
                <img src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70" alt="image" />
                <p>Buyer Name</p>
                <h6>Jone Cooper</h6>
            </div>
            <ul className='product-details-list'>
                <li><span>Buyer ID</span>5896587</li>
                <li><span>Email Address</span>Westand Cloth Store</li>
                <li><span>Phone Number</span>7854219632</li>
                <li><span>Total Order</span>9856</li>
            </ul>
        </div>
        <div className='buyer-tab-list'>
            <ul className='site-tab-list desktop'>
                {Tabdata.map ((TabdataList,i)=> {
                return (
                
                    <>
                    <li key={i}><button  className={ Active === i ? 'tab-btn active' : "tab-btn"  }  onClick={() => setActive(i)}>{TabdataList.Tab_Name} {TabdataList.count && <span >{TabdataList.count}</span> } </button></li>
                    </>
                )
                })}
            </ul>
            <ul className='site-tab-list mobile'>
            {Tabdata.map ((TabdataList,i)=> {
            return (
                
                <>
                <li key={i}><button className={ Active === i ? 'tab-btn active' : "tab-btn"  }  onClick={() =>{
                    if (Active===i) {
                    setActive(null)
                    }else{
                    setActive(i)
                    }
                    // setActive(i)
                    }}>{TabdataList.Tab_Name} {TabdataList.count && <span >{TabdataList.count}</span> } </button></li>
                { Active === i && TabdataList.innerData}
                </>
            )
            })}
            </ul>
        </div>
    </div>
  )
}

export default ViewBuyerDetails