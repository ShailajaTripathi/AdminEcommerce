import React, { useState } from 'react'
import {createColumnHelper,getCoreRowModel, useReactTable} from '@tanstack/react-table'
import TableListing from '../../components/TableListing/TableListing'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as IconsDots } from '../../assets/images/icons/icon-action-dots.svg'
import { ReactComponent as IconEdit } from '../../assets/images/icons/icon-edit-white.svg'
import { ReactComponent as IconView } from '../../assets/images/icons/icon-view-white.svg'
import { ReactComponent as IconDelete } from '../../assets/images/icons/icon-delete-white.svg'
import { ReactComponent as IconRejected } from '../../assets/images/icons/icon-rejected-status.svg'

const BuyerManagement = () => {
  
  const navigate = useNavigate()
  const defaultData = [
    {
      image:'https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70',
      BuyerID : "5875458",
      UserName : "Jane Cooper",
      EmailAddress : "janecooper@gmail.com",
      MobileNumber : "+91-5896321478",
      TotalOrder : "9856",
      Action : "",
    },
    {
      image:'https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70',
      BuyerID : "5875458",
      UserName : "Jane Cooper",
      EmailAddress : "janecooper@gmail.com",
      MobileNumber : "+91-5896321478",
      TotalOrder : "9856",
      Action : "",
    },
    {
      image:'https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70',
      BuyerID : "5875458",
      UserName : "Jane Cooper",
      EmailAddress : "janecooper@gmail.com",
      MobileNumber : "+91-5896321478",
      TotalOrder : "9856",
      Action : "",
    },
    {
      image:'https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70',
      BuyerID : "5875458",
      UserName : "Jane Cooper",
      EmailAddress : "janecooper@gmail.com",
      MobileNumber : "+91-5896321478",
      TotalOrder : "9856",
      Action : "",
    },
  ]
  const [openAction, setopenAction] = useState(false)
  const handleOpenAction = () => {
    setopenAction(!openAction);
  };
  

  const columnHelper = createColumnHelper()
  const columns = 
  [
      columnHelper.accessor(row => row.image, {
        id: 'image',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Image',
        // footer: info => info.column.id,
        cell: (row) => {
          return(
            <>
              <div className='product-thumbnail'><img src = {row?.row?.original?.image} alt="image" /></div>
            </>
          )
        }
      }),
      columnHelper.accessor(row => row.BuyerID, {
        id: 'BuyerID',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Buyer ID',
        // footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.UserName, {
        id: 'UserName',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'User Name',
        // footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.EmailAddress, {
        id: 'EmailAddress',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Email address',
        // footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.MobileNumber , {
        id: 'MobileNumber ',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Mobile Number ',
        // footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.TotalOrder , {
        id: 'TotalOrder ',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Total Order ',
        // footer: info => info.column.id,
      }),
      columnHelper.display({
        id: 'Action',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Action',
        // footer: info => info.column.id,
        cell: (row) => {
          return(
            <>
              <div className={`table-action ${ openAction ? "active" : ""}`}>
                <div className={`action-btn ${ openAction ? "active" : ""}`} 
                onClick={ handleOpenAction}
                ><IconsDots/></div>
                <div className='action-panel two-action'>
                    {/* <div className='action-btn-icon edit'
                        // onClick={() =>
                        //     navigate(coloraddedit, {
                        //         state: row?.row?.original?._id
                        //     })
                        // }
                    ><IconEdit/></div> */}
                    <div className='action-btn-icon view'><IconView/></div>
                    <div className='action-btn-icon delete'
                        // onClick={() =>
                        //     handleDeleteModal(
                        //         row?.row?.original?._id
                        //     )
                        // }
                    ><IconDelete/></div>
                </div>
              </div>
            </>
          )
        }
        
      }),
]
    

  const table = useReactTable({
      data:defaultData,
      columns:columns,
      // createColumnHelper : getCreateColumnHelper(),
      // onSortingChange: setSorting,
      // getSortedRowModel: getSortedRowModel(),
      getCoreRowModel: getCoreRowModel(),
  }) 


  return (
    <>
      <div className='buyer-management'>
        <div className="admin-card">
          <div class="head">
              <h2>Buyer Management</h2>
              <div className="search-btn-group">
                  <form
                      action=""
                      className="product-table-filter"
                  >
                      <input
                          type="search"
                          name="colorSearch"
                          placeholder="Search"
                      />
                  </form>
              </div>
          </div>
        </div>
        <TableListing table = {table} className="m-0"/>
      </div>
    </>
  )
}

export default BuyerManagement