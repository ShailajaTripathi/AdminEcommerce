import React, { useState } from 'react'
import {createColumnHelper,getCoreRowModel, useReactTable} from '@tanstack/react-table'
import TableListing from '../../components/TableListing/TableListing'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as IconsDots } from '../../assets/images/icons/icon-action-dots.svg'
import { ReactComponent as IconEdit } from '../../assets/images/icons/icon-edit-white.svg'
import { ReactComponent as IconView } from '../../assets/images/icons/icon-view-white.svg'
import { ReactComponent as IconDelete } from '../../assets/images/icons/icon-delete-white.svg'
import { ReactComponent as IconRejected } from '../../assets/images/icons/icon-rejected-status.svg'
const ProductCatalogListing = () => {

  const navigate = useNavigate()
  const defaultData = [
    // {
    //   productdetails: "Basanti - Kapde aur Kofee",
    //   image : "https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70",
    //   skuid: '#12588',
    //   returndate: "18 July 2022",
    //   btnTag : "Customer Return",
    //   delivered: "22 July 2022",
    //   returnshippingfee: '₹ 0',
    //   returnreason: 'defective product',
    // },
    // {
    //   productdetails: "Basanti - Kapde aur Kofee",
    //   image : "https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70",
    //   skuid: '#12588',
    //   returndate: "18 July 2022",
    //   btnTag : "Courier Return",
    //   delivered: "22 July 2022",
    //   returnshippingfee: '₹ 0',
    //   returnreason: 'defective product',
    // },
    // {
    //   productdetails: "Basanti - Kapde aur Kofee",
    //   image : "https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70",
    //   skuid: '#12588',
    //   returndate: "18 July 2022",
    //   btnTag : "Courier Return",
    //   delivered: "22 July 2022",
    //   returnshippingfee: '₹ 0',
    //   returnreason: 'defective product',
    // },
    {
      ProductID : "5875458",
      ProductName : "Basanti - Kapde Aur Koffee",
      VenderName : "Westand Cloth Store",
      Category : "Female",
      SubCategory : "Lehenga",
      Type : "Marriage Fashion",
      ProductMaterial : "Cotton",
      Status:"",
      Action : "",
    },
    {
      ProductID : "5875458",
      ProductName : "Basanti - Kapde Aur Koffee",
      VenderName : "Westand Cloth Store",
      Category : "Female",
      SubCategory : "Lehenga",
      Type : "Marriage Fashion",
      ProductMaterial : "Cotton",
      Status:"",
      Action : "",
    },
    {
      ProductID : "5875458",
      ProductName : "Basanti - Kapde Aur Koffee",
      VenderName : "Westand Cloth Store",
      Category : "Female",
      SubCategory : "Lehenga",
      Type : "Marriage Fashion",
      ProductMaterial : "Cotton",
      Status:"",
      Action : "",
    }

  ]
  const [openAction, setopenAction] = useState(false)
  const handleOpenAction = () => {
    setopenAction(!openAction);
  };
  

  const columnHelper = createColumnHelper()
  const columns = 
  [
    // columnHelper.display({
    //   id: 'productdetails',
    //   cell: (row) => {
    //       return (
    //           <>
    //               <div className='product-thumbnail'>
    //               <img className=""   src = {row?.row?.original?.image} alt="product-image"/>
    //                 {row?.row?.original?.productdetails} 
    //               </div>
    //           </>
    //       )
    //   },
    //   header: () => 'Product Details',
    //   // footer: info => info.column.id,
    // }),
    // columnHelper.accessor(row => row.skuid, {
    //     id: 'skuid',
    //     // cell: info => <i>{info.getValue()}</i>,
    //     header: () => 'SKU ID',
    //     // footer: info => info.column.id,
    //   }),
    //   columnHelper.display({
    //     id: 'returndate',
    //     header: () => 'Return Created Date',
    //     cell: (row)=>{
    //         return (
    //             <>
    //                 {row?.row?.original?.returndate}
    //                 <div ><span className={row?.row?.original?.btnTag === "Customer Return" ? "customer" : "courier"}>{row?.row?.original?.btnTag}</span></div>
    //             </>
    //         )
    //     },
    //   }),
    //   columnHelper.accessor(row => row.delivered, {
    //     id: 'delivered',
    //     // cell: info => <i>{info.getValue()}</i>,
    //     header: () => 'Delivered On',
    //     // footer: info => info.column.id,
    //   }),
    //   columnHelper.accessor(row => row.returnshippingfee, {
    //     id: 'returnshippingfee',
    //     // cell: info => <i>{info.getValue()}</i>,
    //     header: () => 'Return Shipping Fee',
    //     // footer: info => info.column.id,
    //   }),
    //   columnHelper.accessor(row => row.returnreason, {
    //     id: 'returnreason',
    //     // cell: info => <i>{info.getValue()}</i>,
    //     header: () => 'Return Reason',
    //     // footer: info => info.column.id,
    //   }),


      columnHelper.accessor(row => row.ProductID, {
        id: 'ProductID',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Product ID',
        // footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.ProductName, {
        id: 'ProductName',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Product Name',
        // footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.VenderName, {
        id: 'VenderName',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Vender Name',
        // footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.Category, {
        id: 'Category',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Category',
        // footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.SubCategory, {
        id: 'SubCategory',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Sub-Category',
        // footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.Type, {
        id: 'Type',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Type',
        // footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.ProductMaterial, {
        id: 'ProductMaterial',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Product Material',
        // footer: info => info.column.id,
      }),
      columnHelper.display({
        id: 'Status',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Status',
        // footer: info => info.column.id,
        cell: (row) => {
          return(
            <>
              <span class="pending-data status-data">Pending</span>
              <span class="new-variant status-data">New Variant</span>
              <span class="rejected-status status-data"><IconRejected/> Rejected</span>
            </>
          )
        }
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
      <div className='order-management'>
        <TableListing table = {table} className="m-0"/>
      </div>
    </>
  )
}

export default ProductCatalogListing