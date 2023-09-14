import React from 'react'
import {Link} from 'react-router-dom'
import { ReactComponent as IconDeleteProduct } from '../../assets/images/icons/icon-delete.svg'
import { Dropdown } from 'react-bootstrap'

const ViewQueryDetails = () => {
  return (
    <>
        <div className='view-product-details view-buyer-details view-query-details'>
            <ul className='site-breadcrumb'>
                <li><Link >Queries Management</Link></li>
                <li>View Query Details</li>
            </ul>
            <div className="admin-card">
                <div className="head">
                    <h2>View Query Details</h2>
                    <div className="search-btn-group w-auto flex-nowrap">
                        <Dropdown
                            flip="no"
                            // onSelect={(e)=>onChange(JSON.parse(e))}
                            name="MainCategory"
                            drop="down-centered"
                            // {...register("MainCategory")}
                            className='table-status-dropdown'
                        >
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                                className='pending-toggle'
                            >
                                Pending
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {/* {MainCategoryList?.data?.map((mCat) => {
                                    return ( */}
                                        <Dropdown.Item eventKey="Pending" className='pending'>Pending</Dropdown.Item>
                                        <Dropdown.Item eventKey="InProgress" className='in-progress'>In - progress</Dropdown.Item>
                                        <Dropdown.Item eventKey="Resolved" className='resolved'>Resolved</Dropdown.Item>
                                    {/* )
                                })} */}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className='delete-btn'>
                            <IconDeleteProduct/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='admin-card product-details-card'>
                <div className="buyer-profile-detail">
                    <div className='image-wrapper'>
                        <img src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70" alt="image" />
                        <p>Buyer Name</p>
                        <h6>Jone Cooper</h6>
                    </div>
                    <ul className='product-details-list'>
                        <li><span>Buyer ID</span>5896587</li>
                        <li><span>Email Address</span>Westand Cloth Store</li>
                        <li><span>Phone Number</span>7854219632</li>
                    </ul>
                </div>
                <div className='product-details-list description-list'>
                    <ul className='description'>
                        <li>
                            <span>Description</span>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default ViewQueryDetails