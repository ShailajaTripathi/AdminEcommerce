import React,{useState} from 'react'
import VendorPromotion from '../VendorPromotion'
import ConsumerPromocodeManagement from '../ConsumerPromocodeManagement'
const PromotionsManagement = () => {

  const [Active, setActive] = useState(0)
  const [Tabdata,setTabData] = useState(
   [
     {
       Tab_Name: "Vendor Promotion",
       count:"2",
       innerData : <li className='tab-body'><VendorPromotion id= "VendorPromotion"/></li>
     },
     {
       Tab_Name: "Consumer Promocode",
       count:"2",
       innerData :<li className='tab-body'><ConsumerPromocodeManagement id= "ConsumerPromocodeManagement"/></li>
     },
   ])
 

  return (
    <div className="order-management-body">
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
  )
}

export default PromotionsManagement