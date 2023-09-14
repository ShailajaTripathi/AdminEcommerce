import React, { useCallback, useRef, useState } from 'react'
import {
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import TableListing from '../../components/TableListing/TableListing'
import requestApi from '../../utils/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Pagination from '../../components/Pagination'
import { Dropdown, Form, InputGroup } from 'react-bootstrap'
import { ReactComponent as SearchIcon } from '../../assets/images/greysearch.svg'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import Swal from 'sweetalert2'
import ApproveDeclinePopup from '../../components/ApproveDeclinePopup/ApproveDeclinePopup'
import { categoryaddedit, subcategoryaddedit } from '../../config/routingConsts'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as DeclineIcon } from '../../assets/images/decline.svg'
import { ReactComponent as ApproveIcon } from '../../assets/images/approve-icon.svg'
import { ReactComponent as IconsDots } from '../../assets/images/icons/icon-action-dots.svg'
import { ReactComponent as IconEdit } from '../../assets/images/icons/icon-edit-white.svg'
import { ReactComponent as IconDelete } from '../../assets/images/icons/icon-delete-white.svg'
import { ReactComponent as IconRejected } from '../../assets/images/icons/icon-rejected-status.svg'
import { ReactComponent as IconApproveRight } from '../../assets/images/icons/icon-right-aprrove.svg'
import { ReactComponent as IconDesapproveClose } from '../../assets/images/icons/icon-close-desaprrove.svg'
import TableSkeleton from '../../components/TableSkeleton/TableSkeleton'


const CategoryManagement = () => {
    const queryClient = useQueryClient()
    const navigate= useNavigate() 
    const [DataLimit, setDataLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [userFilterText, setuserFilterText] = useState('')
    const [sorting, setSorting] = useState([])
    const [searchKeyword, setSearchKeyword] = useState('')
    const [isDeleteModal, setIsDeleteModal] = useState(false)

    const [ShowMaterialStatusPopup, setShowMaterialStatusPopup] =
        useState(false)
    const [statusUpdate, setStatusUpdate] = useState(null)
    const [buttonText, setButtonText] = useState('')

    const [mainCategory, setmainCategory] = useState('')

    const [deleteId, setDelteId] = useState('')
    const EditDataRef = useRef(null)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const handleSearch = useCallback((e) => {
        setCurrentPage(1)
        const getData = setTimeout(() => {
            setSearchKeyword(e.target.value)
        }, 1000)
        clearInterval()
    }, [])
    // const queryClient = useQueryClient()

    const handleChangePage = useCallback(
        (currentPage) => {
            setCurrentPage(currentPage)
        },
        [currentPage]
    )

    const handleChange3=(e)=>{
      setmainCategory(e.target.value)
    }

    const handleChange = (eventkey) => {
        setDataLimit(eventkey)
    }
    // const handleChange3 = (eventkey) => {
    //     setMaincates(eventkey)
    // }

    const [openAction, setopenAction] = useState(null)
    const OpenAction = (id) => {
      setopenAction(openAction === id ? null : id);
    };

    function UserList({ queryKey }) {
        return requestApi
            .post(
                `main-category/list`,
                {
                    // search: queryKey[3],
                    // limit: queryKey[2],
                    // page: queryKey[1],
                    // sortKey: queryKey[4]?.id ?? '',
                    // sortBy: queryKey[4] ? (queryKey[4]?.desc ? -1 : 1) : '',
                    // status: statusControl

                    search: queryKey[3],
                    limit: queryKey[2],
                    page: queryKey[1],
                    sortKey: '',
                    sortBy: queryKey[4] ? (queryKey[4]?.desc ? -1 : 1) : '',
                    mainCategory,
                },
                { headers: true }
            )
            .then((res) => {
                return res.data
            })
    }

    const { data, isLoading } = useQuery({
        queryKey: [
            'categorylist',
            currentPage,
            DataLimit,
            searchKeyword,
            sorting[0]
            // mainCategory
        ],
        queryFn: UserList
    })

    useEffect(() => {
        if (currentPage && data?.data?.length === 0) {
            setCurrentPage(currentPage - 1)
        } else {
        }
    }, [currentPage, data?.data])
 
    //#region Table Columns
    const columnHelper = createColumnHelper()
    const columns = [

        columnHelper.accessor((row) => row?.name, {
            id: 'name',
            header: () => 'Category'
        }),
        columnHelper.accessor((row) => row?.status, {
            id: 'status',
            header: () => 'Status',
            enableSorting: false,
            cell: (row) => {
                switch (row?.row?.original?.status) {
                    case 7:
                        return (
                            <span className="pending-data status-data">
                                Pending
                            </span>
                        )
                        case 5:
                            return (
                                // <span className="decline-data status-data">
                                //     Decline
                                // </span>
                                <span class="rejected-status status-data"><IconRejected/> Rejected</span>
                            )

                    default:
                        return (
                            <>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={
                                            row?.row?.original?.status == 1
                                                ? true
                                                : false
                                        }
                                        onChange={(e) =>
                                            onStatusChange(
                                                row?.row?.original?._id
                                            )
                                        }
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </>
                        )
                }
            }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: (row) => {


                    switch(row.row.original.status){
                        case 7:
                            return(
                                <>
                                  {/* <div className="action-data">
                                  <div className="action-icon"
                                 onClick={() => {
                                    handleApproveDecline(
                                        row?.row?.original?._id,
                                        setButtonText("Decline")
                                    )
                                }}>
                                    <DeclineIcon />
                                </div>
                                <div
                                    className="action-icon"
                                    onClick={() => {
                                        handleApproveDecline(
                                            row?.row?.original?._id,
                                            setButtonText("Approve")
                                        )
                                    }}
                                >
                                    <ApproveIcon />
                                </div>
                               
                                  </div> */}
                                <div className={`table-action ${row?.row?.original?._id === openAction ? "active" : ""}`}>
                                    <div className={`action-btn ${row?.row?.original?._id === openAction ? "active" : ""}`} onClick={() => OpenAction(row?.row?.original?._id)}><IconsDots/></div>
                                    <div className='action-panel two-action'>
                                        <div className='action-btn-icon edit'
                                            onClick={() => {
                                                handleApproveDecline(
                                                    row?.row?.original?._id,
                                                    setButtonText("Approve")
                                                )
                                            }}
                                        ><IconApproveRight/></div>
                                        <div className='action-btn-icon delete'
                                            onClick={() => {
                                                handleApproveDecline(
                                                    row?.row?.original?._id,
                                                    setButtonText("Decline")
                                                )
                                            }}
                                        ><IconDesapproveClose/></div>
                                    </div>
                                </div>
                            </>
                            )

                          case 5:
                            return(
                                <>
                                -
                                </>
                            ) 
                            
                            default : return(
                                
                            //     <div className="action-data">
                            //               <div
                            //             className="action-icon"
                            //             onClick={() =>
                            //                 navigate(categoryaddedit, {
                            //                     state: row?.row?.original?.categoryId
                            //                 })
                            //             }
                            //         >
                            //             <EditIcon />
                            //         </div>
                            // <div
                            //     className="action-icon"
                            //     onClick={() =>
                            //         handleDeleteModal(row?.row?.original?.categoryId)
                            //     }
                            // >
                            //     <DeleteIcon />
                            // </div>
                            // </div> 

                            <div className={`table-action ${row?.row?.original?._id === openAction ? "active" : ""}`}>
                                <div className={`action-btn ${row?.row?.original?._id === openAction ? "active" : ""}`} onClick={() => OpenAction(row?.row?.original?._id)}><IconsDots/></div>
                                <div className='action-panel two-action'>
                                    <div className='action-btn-icon edit'
                                        onClick={() =>
                                            {
                                               
                                                navigate(categoryaddedit, {
                                                    state:row?.row?.original?._id
                                                })
                                            }
                                        }
                                    ><IconEdit/></div>
                                    {/* <div className='action-btn-icon view'><IconView/></div> */}
                                    <div className='action-btn-icon delete'
                                    onClick={() =>
                                        handleDeleteModal(row?.row?.original?._id)
                                    }
                                    ><IconDelete/></div>
                                </div>
                            </div>
                            )
                    }
            }
        })
    ]
    //#endregion

    const table = useReactTable({
        data: data?.data,
        columns: columns,
        // onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel()
    })

    const handleDeleteModal = (id) => {
        setIsDeleteModal(true)
        setDelteId(id)
    }

    function handleDelete(mainCategoryId) {
        mutationDelete.mutate(mainCategoryId)
        setIsDeleteModal(false)
    }
    async function deletecategoryId(mainCategoryId) {
        return await requestApi.post(`main-category/delete`, {
            mainCategoryId
        })
    }

    const mutationDelete = useMutation(deletecategoryId, {
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries('categorylist')
            setIsDeleteModal(false)
            EditDataRef.current = null
        },
        onError: () => {
            EditDataRef.current = null
        }
    })

    //#region approve type status
    const handleApproveDecline = (id) => {
        setShowMaterialStatusPopup(true)
        setStatusUpdate(id)
    }

    function handlePermission(mainCategoryId) {
        mutationStatusUpdate.mutate(mainCategoryId)
        setShowMaterialStatusPopup(false)
    }

    async function updateStatusbyId(mainCategoryId) {
        if(buttonText=="Approve"){
            return await requestApi.post(`/main-category/approve-decline`, {
                mainCategoryId,
                status:1
            })
        }else{
            return await requestApi.post(`/main-category/approve-decline`, {
                mainCategoryId,
                status:5
            })
        }
    }

    const mutationStatusUpdate = useMutation(updateStatusbyId, {
        onSuccess: ({ data }) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '',
                text: data?.meta?.message
            })
            queryClient.invalidateQueries('categorylist')
            setShowMaterialStatusPopup(false)
        },
        onError: (error) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '',
                text: error?.message
            })
        }
    })

    //#endregion

    //#region  Active/InActive Status Update
    const onStatusChange = useCallback((mainCategoryId) => {
        mutationStatusActiveInactive.mutate(mainCategoryId)
    }, [])
    async function updateStatusbycategoryId(mainCategoryId) {
        return await requestApi.post(`/main-category/active-inactive-status`, {
            mainCategoryId
        })
    }
    const mutationStatusActiveInactive = useMutation(updateStatusbycategoryId, {
        onSuccess: ({ data }) => {
            // Swal.fire({
            //     position: 'center',
            //     icon: 'success',
            //     title: '',
            //     text: data?.meta?.message
            // })
            queryClient.invalidateQueries('colorlist')
            setShowMaterialStatusPopup(false)
        },
        onError: (error) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '',
                text: error?.message
            })
        }
    })
    //#endregion

    return (
        <div className="categories-management">
            <div className="admin-card">
                <div class="head">
                    <h2>Category Management</h2>
                    <div className="search-btn-group">
                        {/* dropdown for filter sub-category using main-category */}
                        {/* <div className='filterDropdown'>
                        <Dropdown
                                            flip="no"
                                            onSelect={handleChange}
                                        >
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
                        {/* end */}
                        <form
                            action=""
                            {...register('categorySearch', {
                                onChange: (e) => {
                                    handleSearch(e)
                                }
                            })}
                            className="product-table-filter"
                        >
                            <input
                                type="search"
                                name="categorySearch"
                                placeholder="Search"
                            />
                        </form>
                        <button
                            className="solid-red-btn"
                            onClick={() => navigate(categoryaddedit)}
                        >
                            Add New Category{' '}
                        </button>
                    </div>
                </div>
                {/* Loading */}
                {isLoading ? (
                    <TableSkeleton />
                ) : data?.data?.length > 0 ? (
                    <>
                        <TableListing table={table} className="m-0" />
                        <div className="pagination-wrap">
                            <div className="showing-pages">
                                <span>
                                    Showing {(currentPage - 1) * DataLimit + 1}{' '}
                                    to{' '}
                                    {Math.min(
                                        currentPage * DataLimit,
                                        data.meta.totalCount
                                    )}{' '}
                                    of {data.meta.totalCount}{' '}
                                    {data.meta.totalCount > 1
                                        ? ' categories'
                                        : ' category'}
                                </span>
                            </div>

                            {data?.meta?.totalCount > 10 && (
                                <>
                                    {/* <div className="itemperpage-box">
                                            <span>Items per page:</span>
                                            <Dropdown
                                                flip="no"
                                                onSelect={handleChange}
                                            >
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

                                    <Pagination
                                        total={Math.ceil(
                                            data.meta.totalCount / DataLimit
                                        )}
                                        current={currentPage}
                                        onChangePage={handleChangePage}
                                    />
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="no-record-found">No Record Found</div>
                )}
                <DeleteModal
                    message={<>Are you sure you want to Delete this record ?</>}
                    setIsDeleteModal={setIsDeleteModal}
                    isDeleteModal={isDeleteModal}
                    handleDelete={() => handleDelete(deleteId)}
                />
                <ApproveDeclinePopup
                    ShowMaterialStatusPopup={ShowMaterialStatusPopup}
                    setShowMaterialStatusPopup={setShowMaterialStatusPopup}
                    setStatusUpdate={statusUpdate}
                    title={`Are you sure you want to ${buttonText} ?`}
                    // handlestatus={handlestatus}
                    text={buttonText}
                    handlePermission={() => handlePermission(statusUpdate)}
                />
            </div>
        </div>
    )
}

export default CategoryManagement
