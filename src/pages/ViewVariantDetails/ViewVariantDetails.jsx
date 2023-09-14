import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import {Link, useParams} from 'react-router-dom'
import {createColumnHelper,getCoreRowModel, useReactTable} from '@tanstack/react-table'
import { ReactComponent as IconDeleteProduct } from '../../assets/images/icons/icon-delete.svg'
import TableListing from '../../components/TableListing/TableListing'
import { ReactComponent as IconsDots } from '../../assets/images/icons/icon-action-dots.svg'
import { ReactComponent as IconEdit } from '../../assets/images/icons/icon-edit-white.svg'
import { ReactComponent as IconView } from '../../assets/images/icons/icon-view-white.svg'
import { ReactComponent as IconDelete } from '../../assets/images/icons/icon-delete-white.svg'
import { ReactComponent as IconRejected } from '../../assets/images/icons/icon-rejected-status.svg'
import { ReactComponent as IconRejectedLabel} from '../../assets/images/icons/icon-rejected-red.svg'
import requestApi from '../../utils/request'
import { productcatalog, viewproductdetails } from '../../config/routingConsts';

//#region  API Call for view Vendor Data
// const  variantViewDetail= async(catalogId) => {
//     return await requestApi.post(`/catalog/view`,{catalogId},{ headers: true }).then((res)=>{
//         return res.data
//     })  
// }
//#endregion

const ViewVariantDetails = () => {
    // const {variantId} = useParams()

    const defaultData = [
        {
            Size : "M",
            AvailableQty : "528",
            Price : "1199",
            Action : "",
        },
        {
            Size : "M",
            AvailableQty : "528",
            Price : "1199",
            Action : "",
        },
        {
            Size : "M",
            AvailableQty : "528",
            Price : "1199",
            Action : "",
        },
        {
            Size : "M",
            AvailableQty : "528",
            Price : "1199",
            Action : "",
        },
        {
            Size : "M",
            AvailableQty : "528",
            Price : "1199",
            Action : "",
        },
    ]

    // const { data, isLoading } = useQuery({
    //     queryKey: [
    //         'product-variants-view',
    //         // currentPage,
    //         // DataLimit,
    //         // searchKeyword,
    //     ],
    //     queryFn: () => variantViewDetail(variantId),
    //     enabled: !!variantId,
    //     onSuccess: (data) => {
    //         // reset({
    //         //     size:data?.data?.name
    //         // }) 
    //      },
    //      onError:(error)=>{
    //          console.log(error.message)       
    //      }
         
    // })

    // console.log("data",data)

    const [openAction, setopenAction] = useState(null)
    const OpenAction = (id) => {
    setopenAction(openAction === id ? null : id);
    };
    

    const columnHelper = createColumnHelper()
    const columns = 
    [

        columnHelper.accessor(row => row.Size, {
        id: 'Size',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Size',
        // footer: info => info.column.id,
        cell: (row) => {
            return(
            <>
                <span>3XL <span className='label-badge'>New 3XL</span></span>
            </>
            )
        }
        }),
        columnHelper.accessor(row => row.AvailableQty, {
        id: 'AvailableQty',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Available Qty',
        // footer: info => info.column.id,
        }),
        columnHelper.accessor(row => row.Price, {
            id: 'Price',
            // cell: info => <i>{info.getValue()}</i>,
            header: () => 'Price',
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
                <div className={`table-action ${row?.VariantPhotos === openAction ? "active" : ""}`}>
                <div className={`action-btn ${row?.VariantPhotos === openAction ? "active" : ""}`} onClick={() => OpenAction(row?.VariantPhotos)}><IconsDots/></div>
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
        <div className='view-product-details'>
            <ul className='site-breadcrumb'>
                <li><Link to={productcatalog}>Product Catalog</Link></li>
                <li><Link to={''}>View Product Details</Link></li>
                <li>View Variant Details</li>
            </ul>
            <div className="admin-card">
                <div className="head">
                    <h2>Red Variants</h2>
                    <div className="search-btn-group">
                        <form className="product-table-filter">
                            <input
                                type="search"
                                name="colorSearch"
                                placeholder="Search Variant"
                            />
                        </form>
                    </div>
                </div>
                <div className='product-image-list'>
                    <img src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70" alt="image" />
                    <img src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70" alt="image" />
                    <img src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70" alt="image" />
                    <img src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70" alt="image" />
                </div>
                <TableListing table={table} className="m-0" />
            </div>
        </div>
    </>
  )
}

export default ViewVariantDetails