import React from 'react'
import {createColumnHelper,getCoreRowModel, useReactTable} from '@tanstack/react-table'
import TableListing from '../../components/TableListing/TableListing'
const ConsumerPromocodeManagement = () => {

  const defaultData = [
    {
      productdetails: "Basanti - Kapde aur Kofee",
      image : "https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70",
      skuid: '#12588',
      returndate: "18 July 2022",
      btnTag : "Customer Return",
      delivered: "22 July 2022",
      returnshippingfee: '₹ 0',
      returnreason: 'defective product',
    },
    {
      productdetails: "Basanti - Kapde aur Kofee",
      image : "https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70",
      skuid: '#12588',
      returndate: "18 July 2022",
      btnTag : "Courier Return",
      delivered: "22 July 2022",
      returnshippingfee: '₹ 0',
      returnreason: 'defective product',
    },
    {
      productdetails: "Basanti - Kapde aur Kofee",
      image : "https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70",
      skuid: '#12588',
      returndate: "18 July 2022",
      btnTag : "Courier Return",
      delivered: "22 July 2022",
      returnshippingfee: '₹ 0',
      returnreason: 'defective product',
    },
  ]


  const columnHelper = createColumnHelper()
  const columns = 
  [
    columnHelper.display({
      id: 'productdetails',
      cell: (row) => {
          return (
              <>
                  <div className='product-thumbnail'>
                  <img className=""   src = {row?.row?.original?.image} alt="product-image"/>
                    {row?.row?.original?.productdetails} 
                  </div>
              </>
          )
      },
      header: () => 'Product Details',
      // footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.skuid, {
        id: 'skuid',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'SKU ID',
        // footer: info => info.column.id,
      }),
      columnHelper.display({
        id: 'returndate',
        header: () => 'Return Created Date',
        cell: (row)=>{
            return (
                <>
                    {row?.row?.original?.returndate}
                    <div><span className={row?.row?.original?.btnTag === "Customer Return" ? "customer" : "courier"}>{row?.row?.original?.btnTag}</span></div>
                </>
            )
        },
      }),
      columnHelper.accessor(row => row.delivered, {
        id: 'delivered',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Delivered On',
        // footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.returnshippingfee, {
        id: 'returnshippingfee',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Return Shipping Fee',
        // footer: info => info.column.id,
      }),
      columnHelper.accessor(row => row.returnreason, {
        id: 'returnreason',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Return Reason',
        // footer: info => info.column.id,
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
        <div className='admin-card'>
          <div class="head">
            <h2>Consumer Promocode List</h2>
          </div>
        </div>
        <TableListing table = {table} className="m-0"/>
      </div>
    </>
  )
}

export default ConsumerPromocodeManagement