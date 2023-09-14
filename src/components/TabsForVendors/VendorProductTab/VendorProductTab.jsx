import React, { useState } from 'react'
import TableSkeleton from '../../TableSkeleton/TableSkeleton'
import { ReactComponent as DeclineIcon } from '../../../assets/images/decline.svg'
import { ReactComponent as ApproveIcon } from '../../../assets/images/approve-icon.svg'
import { ReactComponent as IconView } from '../../../assets/images/icons/icon-view-white.svg'
import { ReactComponent as IconsDots } from '../../../assets/images/icons/icon-action-dots.svg'
import { ReactComponent as IconDelete } from '../../../assets/images/icons/icon-delete-white.svg'
import { ReactComponent as IconApproveRight } from '../../../assets/images/icons/icon-right-aprrove.svg'
import { ReactComponent as IconDesapproveClose } from '../../../assets/images/icons/icon-close-desaprrove.svg'
import TableListing from '../../TableListing/TableListing'
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

const VendorProductTab = ({tableContent,loader}) => {


  const [openAction, setopenAction] = useState(null)
  const OpenAction = (id) => {
      setopenAction(openAction === id ? null : id)
  }
  
  const columnHelper = createColumnHelper()

  const columns = [
      // columnHelper.display({
      //     id: 'profilePic',
      //     header: 'Image',
      //     cell: (row) => {
      //         return (
      //             <div className='product-thumbnail'>
      //                 <img
      //                     src={row?.row?.original?.profilePic}
      //                     alt="vendor_Img"
      //                 />
      //             </div>
      //         )
      //     }
      // }),
      columnHelper.accessor((row) => row?.productName, {
          id: 'productName',
          header: () => 'Name',
          cell: (row) => {
              return (
                  <span>
                      {row?.row?.original?.productName
                          ? row?.row?.original?.productName
                          : '-'}
                  </span>
              )
          }
      }),
      columnHelper.accessor((row) => row?.mainCategoryName, {
        id: 'mainCategoryName',
        header: () => 'Main Category',
        cell: (row) => {
            return (
                <span>
                    {row?.row?.original?.mainCategoryName
                        ? row?.row?.original?.mainCategoryName
                        : '-'}
                </span>
            )
        }
    }),
    columnHelper.accessor((row) => row?.categoryName, {
      id: 'categoryName',
      header: () => 'Category',
      cell: (row) => {
          return (
              <span>
                  {row?.row?.original?.categoryName
                      ? row?.row?.original?.categoryName
                      : '-'}
              </span>
          )
      }
  }),
      columnHelper.accessor((row) => row?.productWeight, {
          id: 'productWeight',
          header: () => 'Weight (gms)',
          cell: (row) => {
              return (
                  <span>
                      {row?.row?.original?.productWeight
                          ? row?.row?.original?.productWeight
                          : '-'}
                  </span>
              )
          }
      }),
      columnHelper.accessor((row) => row?.gst, {
          id: '   gst',
          header: () => 'GST No.',
          cell: (row) => {
              return (
                  <span>
                      {row?.row?.original?.gst
                          ? row?.row?.original?.gst
                          : '-'}
                  </span>
              )
          }
      }),
    //   columnHelper.accessor((row) => row?.status, {
    //       id: 'status',
    //       header: () => 'Status',
    //       cell: (row) => {
    //           switch (row?.row?.original?.status) {
    //               case 7:
    //                   return (
    //                       <span className="pending-data status-data">
    //                           Pending
    //                       </span>
    //                   )
    //               case 1:
    //                   return (
    //                       <span
    //                           className="active-data status-data"
    //                           // onClick={(e) => onStatusChange(e)}
    //                       >
    //                           Active
    //                       </span>
    //                   )
    //               case 2:
    //                   return (
    //                       <span
    //                           className="inactive-data status-data"
    //                           // onClick={(e) => onStatusChange(e)}
    //                       >
    //                           InActive
    //                       </span>
    //                   )
    //           }
    //       }
    //   }),
      columnHelper.display({
          id: 'action',
          header: 'Action',
          cell: (row) => {
              return (
                  <>
                      <div className="action-data">
                          {row?.row?.original?.status == 7 ? (
                              <>
                                  {/* <div
                                      className="action-icon"
                                      // onClick={() =>
                                      //     handleApproveDecline(row?.row?.original?.id)
                                      // }
                                  >
                                      <DeclineIcon />
                                  </div>
                                  <div
                                      className="action-icon"
                                      // onClick={() => {handleApproveDecline(row?.row?.original?.id)
                                      // }}
                                  >
                                      <ApproveIcon />
                                  </div> */}

                                  
                                <div className={`table-action ${row?.row?.original?._id === openAction ? "active" : ""}`}>
                                    <div className={`action-btn ${row?.row?.original?._id === openAction ? "active" : ""}`} onClick={() => OpenAction(row?.row?.original?._id)}><IconsDots/></div>
                                    <div className='action-panel two-action'>
                                        <div className='action-btn-icon edit'
                                            // onClick={() =>
                                            //     navigate(coloraddedit, {
                                            //         state: row?.row?.original?._id
                                            //     })
                                            // }
                                        ><IconApproveRight/></div>
                                        <div className='action-btn-icon delete'
                                            // onClick={() =>
                                            //     handleDeleteModal(
                                            //         row?.row?.original?._id
                                            //     )
                                            // }
                                        ><IconDesapproveClose/></div>
                                    </div>
                                </div>
                              </>
                          ) : (
                              <>
                                  {/* <div onClick={()=>{
                                        navigate(vendorview, {
                                            state: row?.row?.original?._id
                                        })}}>
                              View
                            </div>
                                <div
                                    className="action-icon"
                                    onClick={() =>
                                        navigate(materialaddedit, {
                                            state: row?.row?.original?._id
                                        })
                                    }
                                >
                                    <EditIcon/>
                                </div>

                                <div
                                    className="action-icon"
                                    onClick={() =>
                                        handleDeleteModal(
                                            row?.row?.original?._id
                                        )
                                    }
                                >
                                    <DeleteIcon />
                                </div> */}

                                  <div
                                      className={`table-action ${
                                          row?.row?.original?.id ===
                                          openAction
                                              ? 'active'
                                              : ''
                                      }`}
                                  >
                                      <div
                                          className={`action-btn ${
                                              row?.row?.original?.id ===
                                              openAction
                                                  ? 'active'
                                                  : ''
                                          }`}
                                          onClick={() =>
                                              OpenAction(
                                                  row?.row?.original?.id
                                              )
                                          }
                                      >
                                          <IconsDots />
                                      </div>
                                      <div className="action-panel two-action">
                                          {/* <div
                                              className="action-btn-icon edit"
                                              onClick={() =>
                                                  navigate(materialaddedit, {
                                                      state: row?.row
                                                          ?.original?._id
                                                  })
                                              }
                                          >
                                              <IconEdit />
                                          </div> */}
                                          <div
                                              className="action-btn-icon view"
                                              // onClick={() => {
                                              //      navigate(`${vendorview}/${row?.row?.original?.id}`)
                                              // }}
                                          >
                                              <IconView />
                                          </div>
                                          <div
                                              className="action-btn-icon delete"
                                              // onClick={() =>
                                              //     handleDeleteModal(
                                              //         row?.row?.original?.id
                                              //     )
                                              // }
                                          >
                                              <IconDelete />
                                          </div>
                                      </div>
                                  </div>
                              </>
                          )}
                      </div>
                  </>
              )
          }
      })
  ]

  const table = useReactTable({
    data: tableContent || [],
    columns: columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel()
})

  return (
    <>
    <div className='admin-card'>
        <div className="head">
            <h2>Products List</h2>
        </div>
        {loader ?
            <div><TableSkeleton /></div> 
            :  
            tableContent.length >0
            ?<TableListing table={table} className="m-0" />
            :<div className='no-record-found'>No Products Available</div> 
        }  
    </div>
    </>
  )
}

export default React.memo(VendorProductTab)