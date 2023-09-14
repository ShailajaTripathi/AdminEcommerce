import React,{ useCallback, useEffect, useState } from 'react'
import ProductCatalogListing from '../ProductCatalogListing/ProductCatalogListing'
import {ReactComponent as IconFilter} from "../../assets/images/icons/icon-filter.svg"
import {ReactComponent as IconFilterClose} from "../../assets/images/icons/icon-filter-close.svg"
import FilterModal from '../../components/FilterModal/FilterModal'

import AcceptProduct from '../../components/TabsForProductCatalog/AcceptProduct'
import RejectProduct from '../../components/TabsForProductCatalog/RejectProduct'
import RequestProduct from '../../components/TabsForProductCatalog/RequestProduct'

import requestApi from '../../utils/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import TableListing from '../../components/TableListing/TableListing'
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import BuyerTabListing from '../BuyerTabListing/BuyerTabListing'
import VenderTabListing from '../VenderTabListing/VenderTabListing'
import { Dropdown } from 'react-bootstrap'

const QueryManagement = () => {

  const [DataLimit, setDataLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sorting, setSorting] = useState([])

  const [Active, setActive] = useState(0)
  
   const [ShowMaterialStatusPopup, setShowMaterialStatusPopup] =
   useState(false)
   const handleApproveDecline = () => {
      setShowMaterialStatusPopup(true)
    }

    const handleChangePage = useCallback(
      (currentPage) => {
        setCurrentPage(currentPage);
      },
      [currentPage]
    );

    //#region  Catalog Data Listing
    function catalogList({ queryKey }) {
      return requestApi.post(`catalog/list`, {
        limit: queryKey[2],
        page: queryKey[1],
        search: queryKey[3],
        sortKey: "",
        sortBy: queryKey[4] ? (queryKey[4]?.desc ? -1 : 1) : '',
      },
        { headers: true }
      ).then((res) => {
        return res.data
      })
    }
  
    const { data,isLoading } = useQuery({
      queryKey: [
        'catalogList',
        currentPage,
        DataLimit,
        searchKeyword,
        sorting[0],
      ],
      queryFn: catalogList
    })
    //#endregion


    

    const filteredCatalogByActive =data?.data?.filter((statusdata) => statusdata.status ===1) ;
    const filteredCatalogByRejected =data?.data?.filter((statusdata) => statusdata.status ===5);
    const filteredCatalogByPandding = data?.data?.filter((statusdata) => statusdata.status ===7);

    //#region  Tabs Section
    const [Tabdata,setTabData] = useState(
      [
        {
         Tab_Name: "Buyer",
         count:12,
         innerData :<li className='tab-body'><BuyerTabListing/></li>
       },
        {
          Tab_Name: "Vender",
          count:24, 
          innerData :<li className='tab-body'><VenderTabListing/></li>
        },
      ])
    //#endregion
  return (
    <div className='Product-catalog order-management'>
      <div className='admin-card'>
        <div class="head">
          <h2>Query Management</h2>
          <div className='search-btn-group'>
            <form action="" className='product-table-filter'>
              <input type="search" name="ProductCatalogSearch"  placeholder='Search Query'/>
            </form>
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
              >
                  All
              </Dropdown.Toggle>

              <Dropdown.Menu>
                  {/* {MainCategoryList?.data?.map((mCat) => {
                      return ( */}
                          <Dropdown.Item eventKey="All">All</Dropdown.Item>
                          <Dropdown.Item eventKey="Pending" className='pending'>Pending</Dropdown.Item>
                          <Dropdown.Item eventKey="InProgress" className='in-progress'>In - progress</Dropdown.Item>
                          <Dropdown.Item eventKey="Resolved" className='resolved'>Resolved</Dropdown.Item>
                      {/* )
                  })} */}
              </Dropdown.Menu>
          </Dropdown>
          </div>
        </div>
      </div>

      <div className='admin-tab-list'>
        <ul className='site-tab-list desktop'>
          {Tabdata.map ((TabdataList,i)=> {
            return (
            
              <>
                <li key={i}><button  className={ Active === i ? 'tab-btn active' : "tab-btn"  }  onClick={() => setActive(i)}>{TabdataList.Tab_Name} {TabdataList.count>=0 && <span >{TabdataList.count}</span> } </button></li>
              </>
            )
          })}
        </ul>
      </div>

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

export default QueryManagement