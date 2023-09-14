import React from 'react'
import {Row,Col, Dropdown} from 'react-bootstrap'
import {ReactComponent as IconFilter} from '../../assets/images/icons/icon-filter-red.svg'
import {ReactComponent as IconPhone} from '../../assets/images/icons/icon-phone.svg'
import {ReactComponent as IconMail} from '../../assets/images/icons/icon-mail-gray.svg'

const OrdersHistoryTab = () => {
  const OrderHistoryList =[
    {
      OrdersID:'#589764996432',
      Duration:'Mon, 25 Jan, 2022, 10:30 AM',
      Status: <span className='green-text'>Delivered</span>,
      TotalPayment:"1199",
    },
    {
      OrdersID:'#589764996432',
      Duration:'Mon, 25 Jan, 2022, 10:30 AM',
      Status: <span className='yellow-text'>Pending</span>,
      TotalPayment:"1199",
    },
    {
      OrdersID:'#589764996432',
      Duration:'Mon, 25 Jan, 2022, 10:30 AM',
      Status: <span className='red-text'>Cancel</span>,
      TotalPayment:"1199",
    },
    {
      OrdersID:'#589764996432',
      Duration:'Mon, 25 Jan, 2022, 10:30 AM',
      Status: <span className='green-text'>Delivered</span>,
      TotalPayment:"1199",
    },
    {
      OrdersID:'#589764996432',
      Duration:'Mon, 25 Jan, 2022, 10:30 AM',
      Status: <span className='yellow-text'>Pending</span>,
      TotalPayment:"1199",
    },
    {
      OrdersID:'#589764996432',
      Duration:'Mon, 25 Jan, 2022, 10:30 AM',
      Status: <span className='red-text'>Cancel</span>,
      TotalPayment:"1199",
    },
    {
      OrdersID:'#589764996432',
      Duration:'Mon, 25 Jan, 2022, 10:30 AM',
      Status: <span className='green-text'>Delivered</span>,
      TotalPayment:"1199",
    },
    {
      OrdersID:'#589764996432',
      Duration:'Mon, 25 Jan, 2022, 10:30 AM',
      Status: <span className='yellow-text'>Pending</span>,
      TotalPayment:"1199",
    },
    {
      OrdersID:'#589764996432',
      Duration:'Mon, 25 Jan, 2022, 10:30 AM',
      Status: <span className='red-text'>Cancel</span>,
      TotalPayment:"1199",
    }
  ]

  const OrderSummaryList =[
    {
      image:'https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70',
      Title:'Basanti - Kapde Aur Koffee',
      color:'Red',
      size:'XL',
      Payment:'1299',
      Qty:'2',
      SubPayment:'2598',
    },
    {
      image:'https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70',
      Title:'Basanti - Kapde Aur Koffee',
      color:'Red',
      size:'XL',
      Payment:'1299',
      Qty:'2',
      SubPayment:'2598',
    },
    {
      image:'https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70',
      Title:'Basanti - Kapde Aur Koffee',
      color:'Red',
      size:'XL',
      Payment:'1299',
      Qty:'2',
      SubPayment:'2598',
    },
    {
      image:'https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70',
      Title:'Basanti - Kapde Aur Koffee',
      color:'Red',
      size:'XL',
      Payment:'1299',
      Qty:'2',
      SubPayment:'2598',
    },
    {
      image:'https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70',
      Title:'Basanti - Kapde Aur Koffee',
      color:'Red',
      size:'XL',
      Payment:'1299',
      Qty:'2',
      SubPayment:'2598',
    },
    {
      image:'https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70',
      Title:'Basanti - Kapde Aur Koffee',
      color:'Red',
      size:'XL',
      Payment:'1299',
      Qty:'2',
      SubPayment:'2598',
    }
  ]
  return (
    <>
      <div className='orders-history-tab'>
        <Row>
          <Col xxl="5" xl="6" lg="12" className='order-history-col'>
            <div className='admin-card equal-height'>
                <div className="heading">
                  <h2>Order History</h2>
                  <div className='filter-btn'>
                    <IconFilter/>
                    Filter
                  </div>
                </div>
                <div className='order-history-list'>
                  {OrderHistoryList?.map((List,i)=>{
                    return(
                      <>
                        <div className='order-history-item'>
                          <div className='flex-box'>
                            <p><span>Orders ID:</span> {List.OrdersID}</p> 
                            <p><span>{List.Duration}</span></p>
                          </div>
                          <div className='flex-box'>
                            <p><span>Status:</span> {List.Status}</p> 
                            <p><span>Total Payment:</span> {List.TotalPayment}</p>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
            </div>
          </Col>
          <Col xxl="7" xl="6" lg="12">
              <div className='admin-card order-details-card  equal-height'>
                  <div className='heading'>
                    <h2>Order Details</h2>
                  </div>
                  <div className='order-history-list'>
                    <div className='card-col'>
                      <h2>Order Details</h2>
                      <div className='order-history-item'>
                        <p><span>Order ID:</span> <span className='red-text'>#589764996432</span></p>
                        <p><span>Order date & time:</span> Mon, 25 July, 2023, 10:30 AM</p>
                        <p><span>Delivery date & time:</span> Mon, 02 Aug, 2023, 03:00 PM</p>
                        <p className='dropdown-main'>
                          <span>
                            Delivery status:
                          </span>
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
                                  Order received
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {/* {MainCategoryList?.data?.map((mCat) => {
                                        return ( */}
                                            <Dropdown.Item eventKey="Orderreceived">Order received </Dropdown.Item>
                                            <Dropdown.Item eventKey="Orderreceived">Order received</Dropdown.Item>
                                        {/* )
                                    })} */}
                                </Dropdown.Menu>
                            </Dropdown>
                        </p>
                        <p><span>Payment Method:</span> Credit card</p>
                      </div>
                    </div>
                    <div className="card-col">
                        <h2>Delivery Details</h2>
                        <div className='order-history-item'>
                          <p><b>Jone Cooper</b></p>
                          <p><span>3274 Doe Meadow Drive, Annapolis Junction, <br /> MD 20701</span></p>
                          <p><a href="tel:8305566651"><IconPhone/><span>(830) 556-6651</span></a></p>
                          <p><a href="mailto:ivaryan@gmail.com"><IconMail/><span>ivaryan@gmail.com</span></a></p>
                        </div>
                    </div>
                  </div>
                  <div className='heading pt-0'>
                    <h2>Order summary</h2>
                    <h2>Qty. 4</h2>
                  </div>
                  <div className='order-summary-min'>
                    <div className='order-summary-list card-col'>
                      {OrderSummaryList?.map((List,i)=>{
                        return(
                          <>
                            <div className="order-summary-item">
                              <img src={List.image} alt="image" />
                              <div>
                                  <p><b>{List.Title}</b></p>
                                  <div className='flex-list'><p><span>Color:</span>{List.color}</p> <p><span>Size: </span>{List.size}</p></div>
                                  <div className='flex-list'><p><b>{List.Payment}</b></p> <p className='red-text'>Qty: {List.Qty}</p> <p><b>{List.SubPayment}</b></p></div>
                              </div>
                            </div>
                          </>
                        )
                      })}
                    </div>
                    <div className='amount-card order-history-list py-0 px-2 card-col m-0'>
                        <div className='order-history-item'>
                          <p><span>Subtotal</span> $592.47</p>
                          <p><span>Service fees <br /> <small>(VAT Incl.)</small></span> $592.47</p>
                          <p><span>Shipping fees</span> $3.99</p>
                          <p className='total-amount'><span>Total amount</span> $598.96</p>
                        </div>
                    </div>
                  </div>
              </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default OrdersHistoryTab