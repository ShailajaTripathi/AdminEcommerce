import React, { useState } from 'react'
import {createColumnHelper,getCoreRowModel, useReactTable} from '@tanstack/react-table'
import TableListing from '../../components/TableListing/TableListing'
import { ReactComponent as IconsDots } from '../../assets/images/icons/icon-action-dots.svg'
import { ReactComponent as IconView } from '../../assets/images/icons/icon-view-white.svg'
import { ReactComponent as IconDelete } from '../../assets/images/icons/icon-delete-white.svg'

const ViewDeliveryAddressTab = () => {

  const defaultData = [
    {
      HouseStreetName : "Shah Sultan Complex",
      LandmarkAreaName : "Os;hamrdblr-52, Cunningham Road",
      City : "Bangalore",
      State : "Karnataka",
      Country : "India",
      ZipCode : "560052",
    },
    {
      HouseStreetName : "Shah Sultan Complex",
      LandmarkAreaName : "Os;hamrdblr-52, Cunningham Road",
      City : "Bangalore",
      State : "Karnataka",
      Country : "India",
      ZipCode : "560052",
    },
    {
      HouseStreetName : "Shah Sultan Complex",
      LandmarkAreaName : "Os;hamrdblr-52, Cunningham Road",
      City : "Bangalore",
      State : "Karnataka",
      Country : "India",
      ZipCode : "560052",
    },
    {
      HouseStreetName : "Shah Sultan Complex",
      LandmarkAreaName : "Os;hamrdblr-52, Cunningham Road",
      City : "Bangalore",
      State : "Karnataka",
      Country : "India",
      ZipCode : "560052",
    },
  ]
  const [openAction, setopenAction] = useState(false)
  const handleOpenAction = () => {
    setopenAction(!openAction);
  };
  

  const columnHelper = createColumnHelper()
  const columns = 
  [
    columnHelper.accessor(row => row.HouseStreetName, {
      id: 'HouseStreetName',
      // cell: info => <i>{info.getValue()}</i>,
      header: () => 'House no/Street Name',
      // footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.LandmarkAreaName, {
      id: 'LandmarkAreaName',
      // cell: info => <i>{info.getValue()}</i>,
      header: () => 'Landmark/Area Name',
      // footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.City, {
      id: 'City',
      // cell: info => <i>{info.getValue()}</i>,
      header: () => 'City',
      // footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.State , {
      id: 'State ',
      // cell: info => <i>{info.getValue()}</i>,
      header: () => 'State',
      // footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.Country , {
      id: 'Country ',
      // cell: info => <i>{info.getValue()}</i>,
      header: () => 'Country',
      // footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.ZipCode , {
      id: 'ZipCode ',
      // cell: info => <i>{info.getValue()}</i>,
      header: () => 'Zip Code',
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
      <div className='orders-history-tab rating-tab view-delivery-address-tab'>
        <div className="admin-card">
          <div className="heading">
            <h2>View Delivery Address</h2>
          </div>
          <TableListing table = {table}/>
        </div>
      </div>
    </>
  )
}

export default ViewDeliveryAddressTab