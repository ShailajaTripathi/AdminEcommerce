import React, { useCallback, useEffect, useState } from 'react'
import requestApi from '../../utils/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import TableListing from '../../components/TableListing/TableListing'
// import Pagination from '../../components/Pagination'
import {
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import { Dropdown, Form, InputGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Pagination from '../../components/Pagination'
import { ReactComponent as SearchIcon } from '../../assets/images/greysearch.svg'
import { ReactComponent as DeclineIcon } from '../../assets/images/decline.svg'
import { ReactComponent as ApproveIcon } from '../../assets/images/approve-icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/images/delete-icon-new.svg'
import { ReactComponent as EditIcon } from '../../assets/images/icon-table-edit.svg'
import { ReactComponent as IconsDots } from '../../assets/images/icons/icon-action-dots.svg'
import { ReactComponent as IconEdit } from '../../assets/images/icons/icon-edit-white.svg'
import { ReactComponent as IconDelete } from '../../assets/images/icons/icon-delete-white.svg'
import { ReactComponent as IconRejected } from '../../assets/images/icons/icon-rejected-status.svg'
import { ReactComponent as IconApproveRight } from '../../assets/images/icons/icon-right-aprrove.svg'
import { ReactComponent as IconDesapproveClose } from '../../assets/images/icons/icon-close-desaprrove.svg'
import ApproveDeclinePopup from '../../components/ApproveDeclinePopup/ApproveDeclinePopup'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { typeaddedit } from '../../config/routingConsts'
import TableSkeleton from '../../components/TableSkeleton/TableSkeleton'
const TypeManagement = () => {
    const navigate = useNavigate()

    const [DataLimit, setDataLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [sorting, setSorting] = useState([])
    const [isDeleteModal, setIsDeleteModal] = useState(false)

    const [ShowMaterialStatusPopup, setShowMaterialStatusPopup] =
        useState(false)
    const [statusUpdate, setStatusUpdate] = useState(null)
    const [buttonText, setButtonText] = useState('')

    const [deleteId, setDeleteId] = useState('')
    const queryClient = useQueryClient()

    const { register, handleSubmit } = useForm()

    const handleDeleteModal = (id) => {
        setIsDeleteModal(true)
        setDeleteId(id)
    }

    const handleChange = (eventkey) => {
        setDataLimit(eventkey)
    }

    const handleSearch = useCallback((e) => {
        setTimeout(() => {
            setSearchKeyword(e.target.value)
        }, 1000)
    }, [])

    const handleChangePage = useCallback(
        (currentPage) => {
            setCurrentPage(currentPage)
        },
        [currentPage]
    )
    const handleDelete = (typeId) => {
        mutationDelete.mutate(typeId)
    }

    async function deleteTypeId(typeId) {
        return await requestApi.post(`type/delete`, {
            typeId
        })
    }

    const mutationDelete = useMutation(deleteTypeId, {
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries('typelist')
            setIsDeleteModal(false)
        },
        onError: () => {}
    })

    const [openAction, setopenAction] = useState(null)
    const OpenAction = (id) => {
      setopenAction(openAction === id ? null : id);
    };

    function TypeList({ queryKey }) {
        return requestApi
            .post(
                `type/list`,
                {
                    limit: queryKey[2],
                    page: queryKey[1],
                    search: queryKey[3],
                    sortKey: '',
                    sortBy: queryKey[4] ? (queryKey[4]?.desc ? -1 : 1) : '',
                },
                { headers: true }
            )
            .then((res) => {
                return res.data
            })
    }

    const { data,isLoading } = useQuery({
        queryKey: [
            'typelist',
            currentPage,
            DataLimit,
            searchKeyword,
            sorting[0]
        ],
        queryFn: TypeList
    })

    useEffect(() => {
        if (currentPage && data?.data?.length == 0) {
            setCurrentPage(currentPage - 1)
        } else {
        }
    }, [currentPage, data?.data])

    //#region Table Columns
    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor((row) => row?.name, {
            id: 'name',
            header: () => 'Name',
            cell: (row) => {
                return (
                    <span>
                        {row?.row?.original?.name
                            ? row?.row?.original?.name
                            : '-'}
                    </span>
                )
            }
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
            switch (row?.row?.original?.status) {
                case 7:
                    return (
                        <>
                            {/* <div className="action-data">
                                <div
                                    className="action-icon"
                                    onClick={() => {
                                        handleApproveDecline(
                                            row?.row?.original?._id,
                                            setButtonText('Decline')
                                        )
                                    }}
                                >
                                    <DeclineIcon />
                                </div>
                                <div
                                    className="action-icon"
                                    onClick={() => {
                                        handleApproveDecline(
                                            row?.row?.original?._id,
                                            setButtonText('Approve')
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
                                                setButtonText('Approve')
                                            )
                                        }}
                                    ><IconApproveRight/></div>
                                    <div className='action-btn-icon delete'
                                        onClick={() => {
                                            handleApproveDecline(
                                                row?.row?.original?._id,
                                                setButtonText('Decline')
                                            )
                                        }}
                                    ><IconDesapproveClose/></div>
                                </div>
                            </div>
                        </>
                    )
                case 5:
                    return <>-</>
                default:
                    return (
                        <>
                            {/* <div className="action-data">
                                <div
                                    className="action-icon"
                                    onClick={() =>
                                        navigate(typeaddedit, {
                                            state: row?.row?.original?._id
                                        })
                                    }
                                >
                                    <EditIcon />
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
                                </div>
                            </div> */}
                            <div className={`table-action ${row?.row?.original?._id === openAction ? "active" : ""}`}>
                                <div className={`action-btn ${row?.row?.original?._id === openAction ? "active" : ""}`} onClick={() => OpenAction(row?.row?.original?._id)}><IconsDots/></div>
                                <div className='action-panel two-action'>
                                    <div className='action-btn-icon edit'
                                        onClick={() =>
                                            navigate(typeaddedit, {
                                                state: row?.row?.original?._id
                                            })
                                        }
                                    ><IconEdit/></div>
                                    {/* <div className='action-btn-icon view'><IconView/></div> */}
                                    <div className='action-btn-icon delete'
                                        onClick={() =>
                                            handleDeleteModal(
                                                row?.row?.original?._id
                                            )
                                        }
                                    ><IconDelete/></div>
                                </div>
                            </div>
                        </>
                    )
            }
        }
    })
    ]
    //#endregion

    const table = useReactTable({
        data: data?.data || [],
        columns: columns,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel()
    })

    //#region approve type status
    const handleApproveDecline = (id) => {
        setShowMaterialStatusPopup(true)
        setStatusUpdate(id)
    }

    function handlePermission(typeId) {
        mutationStatusUpdate.mutate(typeId)
        setShowMaterialStatusPopup(false)
    }

    async function updateStatusbyId(typeId) {
        if(buttonText=="Approve"){
            return await requestApi.post(`/type/approve-decline`, {
                typeId,
                status:1
            })
        }
        else{
            return await requestApi.post(`/type/approve-decline`, {
                typeId,
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
            queryClient.invalidateQueries('typelist')
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
    const onStatusChange = useCallback((typeId) => {
        mutationStatusActiveInactive.mutate(typeId)
    }, [])
    async function updateStatusbytypeId(typeId) {
        return await requestApi.post(`/type/active-inactive-status`, {
            typeId
        })
    }
    const mutationStatusActiveInactive = useMutation(updateStatusbytypeId, {
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
        <div className="type-management">
            <div className="admin-card">
                <div class="head">
                    <h2>Type Management</h2>
                    <div className="search-btn-group">
                        <form
                            action=""
                            {...register('typeSearch', {
                                onChange: (e) => {
                                    handleSearch(e)
                                }
                            })}
                            className="product-table-filter"
                        >
                            <input
                                type="search"
                                name="typeSearch"
                                placeholder="Search"
                            />
                        </form>
                        <button
                            onClick={() => navigate(typeaddedit)}
                            className="solid-red-btn"
                        >
                            Add New Type
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="searchstatus-box">
            <InputGroup className="mb-3 input-wrapper">
              <InputGroup.Text id="basic-addon1">
                <SearchIcon />
              </InputGroup.Text>

              <Form.Control
                placeholder="Search"
                type="search"
                aria-label="Username"
                aria-describedby="basic-addon1"
                className="icontrol"
                // value={searchKeyword}
                // onChange={(e) => setSearchKeyword(e.target.value)}
                {...register(
                  'typeSearch',
                  {
                    onChange: (e) => {
                      handleSearch(e)
                    }

                  }
                )}
              />
            </InputGroup>
            <button onClick={()=>navigate(typeaddedit)}>Add New Type</button>
        </div> */}

            {
                isLoading ? (
                    <TableSkeleton />
                ) :
                data?.data?.length > 0 ? (
                    <>
                        <TableListing table={table} className="m-0" />{' '}
                        {/* Dynamic Table Genaration */}
                        {/* pagination section */}
                        <div className="pagination-wrap">
                            <div className="showing-pages">
                                <span>
                                    Showing {(currentPage - 1) * DataLimit + 1} to{' '}
                                    {Math.min(
                                        currentPage * DataLimit,
                                        data.meta.totalCount
                                    )}{' '}
                                    of {data.meta.totalCount} Type
                                </span>
                            </div>
                            {data?.meta?.totalCount > 10 && (
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
                )
            }
            {/* End Pagination Section */}

            <DeleteModal
                // message={<>
                //   Are you sure you want to <br /> delete this type?
                // </>}
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
    )
}

export default TypeManagement
