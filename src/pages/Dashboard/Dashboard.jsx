import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ReactComponent as Image1 } from  '../../assets/images/amount-card-bg1.svg'

const Dashboard = () => {

  const data = [
    {
      image: <Image1/>,
      title: "title",
      number: "20"
    },
    {
      image: <Image1 />,
      title: "title",
      number: "20"
    },
    {
      image: <Image1 />,
      title: "title",
      number: "20"
    },
    {
      image: <Image1 />,
      title: "title",
      number: "20"
    },
    {
      image: <Image1 />,
      title: "title",
      number: "20"
    },
    {
      image: <Image1 />,
      title: "title",
      number: "20"
    }
  ]
  return (
    <>
      <div className="dashboard-body">
        <Row>
          {data.map((dc,i)=>{
            return(
              <Col lg="4" md="4" sm="6" className='dash-amount-col mb-24'>
              <div className="dash-amount-card">
                <span> {dc.image} </span>
                <div className="details">
                  <p>{dc.title}</p>
                  <h2>{dc.number}</h2>
                </div>
              </div>
            </Col>
            )
          })}
        
        </Row>
      </div>
    </>
  )
}

export default Dashboard