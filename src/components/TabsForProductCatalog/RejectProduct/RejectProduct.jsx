import React, { useCallback, useEffect, useState } from 'react'
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import TableListing from '../../TableListing/TableListing'
import TableSkeleton from '../../TableSkeleton/TableSkeleton'
import { ReactComponent as IconRejected } from '../../../assets/images/icons/icon-rejected-status.svg'
import { ReactComponent as IconView } from '../../../assets/images/icons/icon-view-white.svg'
import { ReactComponent as IconDelete } from '../../../assets/images/icons/icon-delete-white.svg'
import { ReactComponent as IconsDots } from '../../../assets/images/icons/icon-action-dots.svg'
import PaginationItem from '../../Pagination/Pagination'
import { viewproductdetails } from '../../../config/routingConsts'
import { useNavigate  } from 'react-router-dom'

const RejectProduct = ({id,content,loading,totalcount}) => {
 
  const navigate = useNavigate()
  const [openAction, setopenAction] = useState(null)
  const [DataLimit, setDataLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const handleChangePage = useCallback(
    (currentPage) => {
      setCurrentPage(currentPage);
    },
    [currentPage]
  );

  const OpenAction = (id) => {
    setopenAction(openAction === id ? null : id);
  };

  //#region Size Table- Columns
  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor(row => row?.productName,
      {
        id: "productName",
        header: () => "Product Name",
        cell: (row) => {
          return( 
                  <span>{row?.row?.original?.productName  ? row?.row?.original?.productName :"-" }</span>
          )
        }
      }),
      columnHelper.accessor(row => row?.sellerName,
        {
          id: "sellerName",
          header: () => "Vendor Name",
          cell: (row) => {
            return( 
                    <span>{row?.row?.original?.sellerName  ? row?.row?.original?.sellerName :"-" }</span>
            )
          }
        }),
      columnHelper.accessor(row => row?.mainCategoryName,
        {
          id: "mainCategoryName",
          header: () => "Category",
          cell: (row) => {
            return( 
                    <span>{row?.row?.original?.mainCategoryName  ? row?.row?.original?.mainCategoryName :"-" }</span>
            )
          }
        }),
      columnHelper.accessor(row => row?.categoryName,
        {
          id: "categoryName",
          header: () => "Sub-Category",
          cell: (row) => {
            return( 
                    <span>{row?.row?.original?.categoryName  ? row?.row?.original?.categoryName :"-" }</span>
            )
          }
        }),
      columnHelper.accessor(row => row?.type,
        {
          id: "type",
          header: () => "Type",
          cell: (row) => {
            return( 
                    <span>{row?.row?.original?.type  ? row?.row?.original?.type :"-" }</span>
            )
          }
        }),
      // columnHelper.accessor(row => row?.materialName,
      //   {
      //     id: "materialName",
      //     header: () => "Product Material",
      //     cell: (row) => {
      //       return( 
      //               <span>{row?.row?.original?.materialName  ? row?.row?.original?.materialName :"-" }</span>
      //       )
      //     }
      //   }),
  
      columnHelper.accessor((row) => row?.status, {
        id: 'status',
        header: () => 'Status',
        enableSorting: false,
        cell: (row) => {

          return(
            <>
              <span class="rejected-status status-data"><IconRejected/>Rejected</span>
            </>
          )
          // switch (row?.row?.original?.status) {
          //     case 7:
          //         return (
          //             <span className="pending-data status-data">
          //                 Pending
          //             </span>
          //         )
          //         case 5:
          //           return (
          //               <span class="rejected-status status-data">
          //                 {/* <IconRejected/> */}
          //                   Rejected</span>
          //           )

          //     default:
          //         return (
          //             <>
          //                 {/* <label className="switch">
          //                     <input
          //                         type="checkbox"
          //                         checked={
          //                             row?.row?.original?.status == 1
          //                                 ? true
          //                                 : false
          //                         }
          //                         onChange={(e) =>
          //                             onStatusChange(
          //                                 row?.row?.original?._id
          //                             )
          //                         }
          //                     />
          //                     <span className="slider round"></span>
          //                 </label> */}
          //             </>
          //         )
          // }
        }
    }),

    columnHelper.display({
      id: 'actions',
      header: () => 'Actions',
      cell: (row) => {

        return(
          <div className={`table-action ${row?.row?.original?.id === openAction ? "active" : ""}`}>
                              <div className={`action-btn ${row?.row?.original?.id === openAction ? "active" : ""}`} onClick={() => OpenAction(row?.row?.original?.id)}><IconsDots/></div>
                               <div className='action-panel two-action'>
                                  <div className='action-btn-icon edit'
                                    // onClick={() =>
                                    //   navigate(sizeaddedit, {
                                    //   state: row?.row?.original?._id
                                    //   })
                                    // }
                                    onClick={() =>
                                      navigate(`${viewproductdetails}/${row?.row?.original?.id}`)
                                    }
                               ><IconView/></div>
                             <div className='action-btn-icon delete'
                                //  onClick={() =>
                                //     handleDeleteModal(
                                //          row?.row?.original?._id
                                //     )
                                //   }
                                ><IconDelete/></div>
                        </div>
                      </div>



        )
          // switch (row?.row?.original?.status) {
          //     case 7:
          //         return (
          //             <>
                    
          //                 <div className={`table-action ${row?.row?.original?._id === openAction ? "active" : ""}`}>
          //                     <div className={`action-btn ${row?.row?.original?._id === openAction ? "active" : ""}`} onClick={() => OpenAction(row?.row?.original?._id)}><IconsDots/></div>
          //                     <div className='action-panel two-action'>
          //                         <div className='action-btn-icon edit'
          //                             onClick={() => {
          //                               handleApproveDecline(
          //                                 row?.row?.original?._id,
          //                                 setButtonText('Approve')
          //                               )
          //                             }}
          //                         ><IconApproveRight/></div>
          //                         <div className='action-btn-icon delete'
          //                             onClick={() => {
          //                                 handleApproveDecline(
          //                                   row?.row?.original?._id,
          //                                   setButtonText('Decline')
          //                                 )
          //                             }}
          //                         ><IconDesapproveClose/></div>
          //                     </div>
          //                 </div>
          //             </>
          //         )
          //     case 5:
          //         return   <span>{pendding}</span>
          //     default:
          //         return (
          //             <>
                         
          //                 <div className={`table-action ${row?.row?.original?._id === openAction ? "active" : ""}`}>
          //                     <div className={`action-btn ${row?.row?.original?._id === openAction ? "active" : ""}`} onClick={() => OpenAction(row?.row?.original?._id)}><IconsDots/></div>
          //                     <div className='action-panel two-action'>
          //                         <div className='action-btn-icon edit'
          //                           onClick={() =>
          //                               navigate(sizeaddedit, {
          //                                   state: row?.row?.original?._id
          //                               })
          //                           }
          //                         ><IconEdit/></div>
          //                         <div className='action-btn-icon delete'
          //                           onClick={() =>
          //                             handleDeleteModal(
          //                                 row?.row?.original?._id
          //                             )
          //                           }
          //                         ><IconDelete/></div>
          //                     </div>
          //                 </div>
          //             </>
          //         )
          // }
      }
  })
  ]
  //#endregion

  const table = useReactTable({
    data: content || [],
    columns: columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel()
  })

  useEffect(() => {
    if (currentPage && content?.length === 0) {
      setCurrentPage(currentPage - 1)
    } else {
    }
  }, [currentPage, content])

  return (
       <> {
      loading ? (
        <TableSkeleton />
    ):
      content.length > 0 ? 
      <>
      <TableListing table={table} className='m-0'  /> 

      <div className="pagination-wrap">
                            <div className="showing-pages">
                                <span>
                                    Showing {(currentPage - 1) * DataLimit + 1} to{' '}
                                    {Math.min(
                                        currentPage * DataLimit,
                                        totalcount
                                    )}{' '}
                                    of {totalcount}  {totalcount>1? "Products":"Product"}
                                </span>
                            </div>
                         {totalcount > 10 && (
                                <>
                                    {/* <div className="itemperpage-box">
                                        <span>Items per page:</span>
      
                                        <Dropdown onSelect={handleChange}>
                                            <Dropdown.Toggle
                                                variant="success"
                                                id="dropdown-basic"
                                            >
                                                {DataLimit}
                                            </Dropdown.Toggle>
      
                                            <Dropdown.Menu>
                                                <Dropdown.Item eventKey="10">
                                                    10
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="20">
                                                    20
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="30">
                                                    30
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div> */}
      
                                    <PaginationItem    /* Pagination Component */
                                        total={Math.ceil(totalcount/DataLimit)}
                                        current={currentPage}
                                        onChangePage={handleChangePage}
                                    />
                                </>
                            )}
                        </div>  

      </>
      :
      <div className='no-record-found'>Data Not Found</div>
    }
    </>
  )
}

export default RejectProduct




