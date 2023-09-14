import React from 'react'
import { Dropdown } from 'react-bootstrap'
import {ReactComponent as IconStarRed} from '../../assets/images/icons/icon-star-red.svg'
import {ReactComponent as IconpProduct} from '../../assets/images/icons/icon-product.svg'

const RatingsTab = () => {
  const RatingList= [
    {
      OrdeID: '#589764996432',
      RatingCount: '4.0',
      Date:'24 June 2023',
      Description: <>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</>,
    },
    {
      OrdeID: '#589764996432',
      RatingCount: '4.0',
      Date:'24 June 2023',
      Description: <>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</>,
    },
    {
      OrdeID: '#589764996432',
      RatingCount: '4.0',
      Date:'24 June 2023',
      Description: <>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</>,
    },
    {
      OrdeID: '#589764996432',
      RatingCount: '4.0',
      Date:'24 June 2023',
      Description: <>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</>,
    },
  ]
  return (
    <>
      <div className="orders-history-tab rating-tab">
        <div className="admin-card">
            <div className="heading">
              <h2>Ratings History</h2>
              <Dropdown
                  flip="no"
                  // onSelect={(e)=>onChange(JSON.parse(e))}
                  name="MainCategory"
                  drop="down-centered"
                  // {...register("MainCategory")}
              >
                  <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                  >
                    Highest Rating
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                      {/* {MainCategoryList?.data?.map((mCat) => {
                          return ( */}
                              <Dropdown.Item eventKey="Orderreceived">Highest Rating</Dropdown.Item>
                              <Dropdown.Item eventKey="Orderreceived">Lowest Rating</Dropdown.Item>
                          {/* )
                      })} */}
                  </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className='rating-list'>
              {RatingList?.map((List,i)=>{
                  return(
                    <>
                      <div className='rating-item'>
                        <div className="top">
                          <span className='icon'><IconpProduct/></span>
                          <p><span>Orde ID</span> <br /> {List.OrdeID}</p>
                        </div>
                        <div className="bottom">
                            <p><span className='rating-count'><IconStarRed/>{List.RatingCount}</span>{List.Date}</p>
                            <p>{List.Description}</p>
                        </div>
                    </div>
                    </>
                  )
              })}
            </div>
        </div>
      </div>
    </>
  )
}

export default RatingsTab