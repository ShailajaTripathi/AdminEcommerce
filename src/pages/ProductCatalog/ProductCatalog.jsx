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

const ProductCatalog = () => {

  const [DataLimit, setDataLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sorting, setSorting] = useState([])

  const [Active, setActive] = useState(1)
  
   const [ShowCatalogFilterPopup, setShowCatalogFilterPopup] =
   useState(false)
   const handleApproveDecline = () => {
      setShowCatalogFilterPopup(true)
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
        status:queryKey[5]
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
        Active
      ],
      queryFn: catalogList
    })
    //#endregion

    
    //#region  Tabs Section
    const Tabdata = [
      {
        Tab_Name: "Accepted Product",
        status:1,
        count:data?.meta?.acceptedCount,
        innerData :<li className='tab-body'><AcceptProduct id= "AcceptProduct Listing" content={data?.data} loading={isLoading} totalcount={data?.meta?.acceptedCount} /></li>
      },
       {
         Tab_Name: "Request Product",
         status:7,
         count:data?.meta?.pendingCount, 
         innerData :<li className='tab-body'><RequestProduct id= "RequestProduct Listing" content={data?.data} loading={isLoading} totalcount={data?.meta?.pendingCount} /></li>
       },
       {
        Tab_Name: "Rejected Product",
        status:5,
        count:data?.meta?.rejectedCount,
        innerData :<li className='tab-body'><RejectProduct id= "RejectedProduct Listing" content={data?.data} loading={isLoading} totalcount={data?.meta?.rejectedCount} /></li>
      },
    ]
    // const [Tabdata,setTabData] = useState(
    //   [
    //     {
    //      Tab_Name: "Accepted Product",
    //      count:data?.meta?.acceptedCount,
    //      innerData :<li className='tab-body'><AcceptProduct id= "AcceptProduct Listing" content={filteredCatalogByActive} loading={isLoading} totalcount={data?.meta?.acceptedCount} /></li>
    //    },
    //     {
    //       Tab_Name: "Request Product",
    //       count:data?.meta?.pendingCount, 
    //       innerData :<li className='tab-body'><RequestProduct id= "RequestProduct Listing" content={filteredCatalogByPandding} loading={isLoading} totalcount={data?.meta?.pendingCount} /></li>
    //     },
    //     {
    //      Tab_Name: "Rejected Product",
    //      count:data?.meta?.rejectedCount,
    //      innerData :<li className='tab-body'><RejectProduct id= "RejectedProduct Listing" content={filteredCatalogByRejected} loading={isLoading} totalcount={data?.meta?.rejectedCount} /></li>
    //    },
    //   ])
    //#endregion
  return (
    <>
      <div className="Product-catalog">
        <div className='admin-card'>
          <div class="head">
            <h2>Product Catalog</h2>
            <div className='search-btn-group'>
              <div className='catalog-filter' onClick={handleApproveDecline}>
                  <IconFilter/>
                  Filter
                  <span className='dots'></span>
              </div>
              <form action="" className='product-table-filter'>
                <input type="search" name="ProductCatalogSearch"  placeholder='Search Product'/>
              </form>
            </div>
          </div>
        </div>
        <div className='filter-list'>
          <ul>
            <li>Westand Cloth Store <span className='close'><IconFilterClose/></span></li>
            <li>Men <span className='close'><IconFilterClose/></span></li>
            <li>Lehenga <span className='close'><IconFilterClose/></span></li>
            <li>Marriage Fashion <span className='close'><IconFilterClose/></span></li>
          </ul>
          <button type='button' className='solid-black-btn clear-btn'>Clear All</button>
        </div>
        <div className='admin-tab-list'>
          <ul className='site-tab-list desktop'>
            {Tabdata.map ((TabdataList,i)=> {
              return (
              
                <>
                  <li key={i}><button  className={ Active === TabdataList?.status ? 'tab-btn active' : "tab-btn"  }  onClick={() => setActive(TabdataList?.status)}>{TabdataList.Tab_Name} {TabdataList.count>=0 && <span >{TabdataList.count}</span> } </button></li>
                </>
              )
            })}
          </ul>
        </div>

        <ul className='site-tab-list mobile'>
        {Tabdata.map ((TabdataList,i)=> {
          return (
            
            <>
              <li key={i}><button className={ Active === TabdataList?.status ? 'tab-btn active' : "tab-btn"  }  onClick={() =>{
                if (Active===TabdataList?.status) {
                  setActive(null)
                }else{
                  setActive(TabdataList?.status)
                }
                // setActive(i)
                }}>{TabdataList.Tab_Name} {TabdataList.count && <span >{TabdataList.count}</span> } </button></li>
              { Active ===TabdataList?.status && TabdataList.innerData}
            </>
          )
        })}
        </ul>
      </div>
      <FilterModal
          ShowCatalogFilterPopup={ShowCatalogFilterPopup}
          setShowCatalogFilterPopup={setShowCatalogFilterPopup}
      />
    </>
  )
}

export default ProductCatalog