import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import {createColumnHelper,getCoreRowModel, useReactTable} from '@tanstack/react-table'
import { ReactComponent as IconDeleteProduct } from '../../assets/images/icons/icon-delete.svg'
import TableListing from '../../components/TableListing/TableListing'
import { ReactComponent as IconsDots } from '../../assets/images/icons/icon-action-dots.svg'
import { ReactComponent as IconEdit } from '../../assets/images/icons/icon-edit-white.svg'
import { ReactComponent as IconView } from '../../assets/images/icons/icon-view-white.svg'
import { ReactComponent as IconDelete } from '../../assets/images/icons/icon-delete-white.svg'
import { ReactComponent as IconRejected } from '../../assets/images/icons/icon-rejected-status.svg'
import { ReactComponent as IconRejectedLabel} from '../../assets/images/icons/icon-rejected-red.svg'
import requestApi from '../../utils/request';
import TableSkeleton from '../../components/TableSkeleton/TableSkeleton';
import { useForm } from 'react-hook-form';
import PaginationItem from '../../components/Pagination/Pagination';
import { productcatalog, viewvariantdetails } from '../../config/routingConsts';


//#region  API Call for view Vendor Data
const  vendorViewDetail= async(catalogId) => {
    return await requestApi.post(`/catalog/view`,{catalogId},{ headers: true }).then((res)=>{
        return res.data
    })  
}
//#endregion

const ViewProductDetails = () => {
    const [DataLimit, setDataLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchKeyword, setSearchKeyword] = useState('');
    const {catalogId,productId} = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    
    const { data, isLoading } = useQuery({
        queryKey: [
            'vendor-view',
            currentPage,
            DataLimit,
            searchKeyword,
        ],
        queryFn: () => vendorViewDetail(catalogId),
        enabled: !!catalogId,
        onSuccess: (data) => {
            // reset({
            //     size:data?.data?.name
            // }) 
         },
         onError:(error)=>{
             console.log(error.message)       
         }
         
    })
    console.log("data",data)

    const handleSearch = useCallback((e) => {
        setCurrentPage(1)
        const getData = setTimeout(() => {
            setSearchKeyword(e.target.value);
        }, 1000)
        clearInterval()
    }, [])

    const handleChangePage = useCallback(
        (currentPage) => {
          setCurrentPage(currentPage);
        },
        [currentPage]
    );
    const handleChange = (eventkey) => {
        setDataLimit(eventkey);
      }

    useEffect(() => {
        if (currentPage && data?.data?.addVariant?.length == 0) {
          setCurrentPage(currentPage - 1)
        } else {
        }
    }, [currentPage, data?.data?.addVariant])


    const [openAction, setopenAction] = useState(null)
    const OpenAction = (id) => {
    setopenAction(openAction === id ? null : id);
    };
    

    const columnHelper = createColumnHelper()
    const columns = 
    [
        columnHelper.accessor(row => row.VariantPhotos, {
        id: 'VariantPhotos',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Variant Photos',
        // footer: info => info.column.id,
        cell: (row) => {
                return (
                    <>
                        <div className='product-thumbnail'>
                            <img src = {row?.row?.original?.productImages[0].image ? row?.row?.original?.productImages[0].image : '-'} alt="product-image"/>
                        </div>
                    </>
                )
            },
        }),
        columnHelper.accessor(row => row.colorId, {
        id: 'colorId',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Color',
        // footer: info => info.column.id,
        cell: (row) => {
            return(
            <>
                <span>
                    {row?.row?.original?.colorId}
                    {/* Blue <span className='label-badge'>New Color</span> */}
                </span>
            </>
            )
        }
        }),
        columnHelper.accessor(row => row.Size, {
        id: 'Size',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Size',
        // footer: info => info.column.id,
        cell: (row) => {
            return(
            <>
                <span className='multi-size'>
                    {row?.row?.original?.variantList?.map((list,i)=>{
                        return(
                            <React.Fragment key={i}>
                                <span>{list?.size}</span>{list?.size?.length>0 && (<span>,</span>)} 
                            </React.Fragment>
                        )
                    })}
                </span>
            </>
            )
        }
        }),
        columnHelper.accessor(row => row.TotalAvailableQty, {
        id: 'TotalAvailableQty',
        // cell: info => <i>{info.getValue()}</i>,
        header: () => 'Total Available Qty',
        // footer: info => info.column.id,
        cell: (row) => {
            return(
            <>
                <span>
                        {row?.row?.original?.variantList?.reduce((total, list) => total + (list.availableQty || 0), 0)}
                    </span>
            </>
            )
        }
        }),
        columnHelper.accessor(row => row.PriceRange, {
            id: 'PriceRange',
            // cell: info => <i>{info.getValue()}</i>,
            header: () => 'Price Range',
            // footer: info => info.column.id,
        }),
        columnHelper.accessor(row => row.Status, {
            id: 'Status',
            // cell: info => <i>{info.getValue()}</i>,
            header: () => 'Status',
            // footer: info => info.column.id,
            cell: (row) => {
                return(
                <>
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
                <div className={`table-action ${row?.row?.original?.variantId === openAction ? "active" : ""}`}>
                <div className={`action-btn ${row?.row?.original?.variantId === openAction ? "active" : ""}`} onClick={() => OpenAction(row?.row?.original?.variantId)}><IconsDots/></div>
                <div className='action-panel two-action'>
                    {/* <div className='action-btn-icon edit'
                        // onClick={() =>
                        //     navigate(coloraddedit, {
                        //         state: row?.row?.original?._id
                        //     })
                        // }
                    ><IconEdit/></div> */}
                    <div className='action-btn-icon view'
                         onClick={() =>
                            navigate(`${productcatalog}/${catalogId}/${row?.row?.original?.variantId}`)
                        }
                    ><IconView/></div>
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
        data:data?.data?.addVariant || [],
        columns:columns,
        // createColumnHelper : getCreateColumnHelper(),
        // onSortingChange: setSorting,
        // getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
    }) 

    console.log("data",data)
  return (
    <>
    <div className='view-product-details'>
        <ul className='site-breadcrumb'>
            <li><Link to={productcatalog}>Product Catalog</Link></li>
            <li>View Product Details</li>
        </ul>
        <div className="admin-card">
            <div className="head">
                <h2>View Product Details</h2>
                <div className='delete-btn'>
                    <IconDeleteProduct/>
                </div>
            </div>
        </div>
        {data?.data?.status===5 ? 
            <>
            <div className='rejected-label'>
                <IconRejectedLabel/>
                <div>
                    <h6>Rejected</h6>
                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                    <Link >Please contact supplier support.</Link>
                </div>
            </div>
            </>
        : 
            <></>
        }
        
        <div className="admin-card product-details-card">
            <div className="card-head">
                <h6>{data?.data?.productName ? data?.data?.productName : '-'}</h6>
            </div>
           <div className='product-list-group'>
                <ul className='product-details-list'>
                    <li>
                        <span>Product ID</span>
                        {data?.data?.id ? data?.data?.id : '-'}
                    </li>
                    <li>
                        <span>Vendor Name</span>
                        {data?.data?.sellerName ? data?.data?.sellerName : '-'}
                    </li>
                    <li>
                        <span>Category</span>
                        {data?.data?.mainCategoryName ? data?.data?.mainCategoryName : '-'}
                    </li>
                    <li>
                        <span>Sub Category</span>
                        {data?.data?.categoryName ? data?.data?.categoryName : '-'}
                    </li>
                    <li>
                        <span>Type</span>
                        {data?.data?.type ? data?.data?.type : '-'}
                    </li>
                </ul>
                <ul className='product-details-list'>
                    <li>
                        <span>Country of origin</span>
                        {data?.data?.countryName ? data?.data?.countryName : '-'}
                    </li>
                    <li>
                        <span>GST%</span>
                        {data?.data?.gst ? data?.data?.gst : '-'}
                    </li>
                    <li>
                        <span>Material</span>
                        {data?.data?.materialName ? data?.data?.materialName : '-'}
                    </li>
                    <li>
                        <span>Weight(gms)</span>
                        {data?.data?.productWeight ? data?.data?.productWeight : '-'}
                    </li>
                    <li>
                        <span>Estimated Time</span>
                        {/* {data?.data?.createdDate ? data?.data?.createdDate : */}
                         -
                         {/* } */}
                    </li>
                </ul>
                <ul className='product-details-list'>
                    <li>
                        <span>Description</span>
                        {data?.data?.description ? data?.data?.description : '-'}
                    </li>
                </ul>
           </div>
        </div>
        <div className="admin-card">
            <div className="head">
                <h2>Product Variants</h2>
                <div className="search-btn-group">
                    <form className="product-table-filter"
                        {...register(
                            'productVariants'
                            ,
            
                            {
                            onChange: (e) => {
                                handleSearch(e)
                            }
            
                            }
                        )}
                    >
                        <input
                            type="search"
                            name="productVariants"
                            placeholder="Search Variant"
                        />
                    </form>
                </div>
            </div>
            {isLoading ? (
                <TableSkeleton/>
            ):
            data?.data?.addVariant?.length > 0 ? <>
            <TableListing table={table} className='m-0'  
            // getfilter={(e) => {setfilter(e)}} 
                                    />
            {/* pagination section */}
            <div className="pagination-wrap">
                <div className="showing-pages">
                    <span>
                        Showing {(currentPage - 1) * DataLimit + 1} to{' '}
                        {Math.min(
                            currentPage * DataLimit,
                            data?.data?.addVariant?.length
                        )}{' '}
                        of {data?.data?.addVariant?.length} Product Variants
                    </span>
                </div>
                { data?.data?.addVariant?.length > 10 && (
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

                        <PaginationItem
                            total={Math.ceil(data.addVariant.length/DataLimit)}
                            current={currentPage}
                            onChangePage={handleChangePage}
                        />
                    </>
                )}
            </div>
            </>:
            <div className='no-record-found'>
                No Record Found
            </div>
            }
        </div>
    </div>
    </>
  )
}

export default ViewProductDetails