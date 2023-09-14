import React, { useCallback, useEffect, useRef, useState } from 'react'
import requestApi from '../../utils/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import TableListing from '../../components/TableListing/TableListing'
import Pagination from '../../components/Pagination'
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import { Dropdown, Form, InputGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { ReactComponent as SearchIcon } from '../../assets/images/greysearch.svg'
import { ReactComponent as DeclineIcon } from "../../assets/images/decline.svg"
import { ReactComponent as ApproveIcon } from "../../assets/images/approve-icon.svg"
import { ReactComponent as DeleteIcon } from "../../assets/images/delete-icon-new.svg"
import { ReactComponent as EditIcon } from "../../assets/images/icon-table-edit.svg"
import { ReactComponent as IconsDots } from '../../assets/images/icons/icon-action-dots.svg'
import { ReactComponent as IconEdit } from '../../assets/images/icons/icon-edit-white.svg'
import { ReactComponent as IconDelete } from '../../assets/images/icons/icon-delete-white.svg'
import { ReactComponent as IconRejected } from '../../assets/images/icons/icon-rejected-status.svg'
import { ReactComponent as IconApproveRight } from '../../assets/images/icons/icon-right-aprrove.svg'
import { ReactComponent as IconDesapproveClose } from '../../assets/images/icons/icon-close-desaprrove.svg'
import ApproveDeclinePopup from '../../components/ApproveDeclinePopup/ApproveDeclinePopup'
import Swal from 'sweetalert2'
import { materialaddedit } from '../../config/routingConsts'
import { useNavigate } from 'react-router-dom'
import TableSkeleton from '../../components/TableSkeleton/TableSkeleton'

const MaterialManagement = () => {


    const navigate= useNavigate()

  const [DataLimit, setDataLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sorting, setSorting] = useState([])
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteId, setDelteId] = useState("")
  const [ShowMaterialStatusPopup,setShowMaterialStatusPopup]= useState(false)
  const queryClient = useQueryClient()
  const EditDataRef = useRef(null);
  const[statusUpdate,setStatusUpdate] =useState(null)
  const [buttonText, setButtonText]=useState("")

  const { register, handleSubmit } = useForm()

  const handleDeleteModal = (id) => {
    setIsDeleteModal(true);
    setDelteId(id)
  }

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


  function handleDelete(materialId) {
    mutationDelete.mutate(materialId)
    setIsDeleteModal(false);
  }

  async function deleteMaterialId(materialId) {
    return await requestApi.post(`material/delete`, {
      materialId
    })
  }

  const mutationDelete = useMutation(deleteMaterialId, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries('materiallist')
      setIsDeleteModal(false)
      EditDataRef.current = null
    },
    onError: () => {
      EditDataRef.current = null
    }
  })

  const [openAction, setopenAction] = useState(null)
  const OpenAction = (id) => {
    setopenAction(openAction === id ? null : id);
  };

  function MaterialList({ queryKey }) {
    return requestApi.post(`material/list`, {
      limit: queryKey[2],
      page: queryKey[1],
      search: queryKey[3],
      sortKey: "",
      sortBy: queryKey[4] ? (queryKey[4]?.desc ? -1 : 1) : '',
    },
      { headers: true }
    ).then((res) => {
      return res.data
    })
  }

  const { data,isLoading } = useQuery({
    queryKey: [
      'materiallist',
      currentPage,
      DataLimit,
      searchKeyword,
       sorting[0],
    ],
    queryFn: MaterialList
  })

  useEffect(() => {
    if (currentPage && data?.data?.length == 0) {
      setCurrentPage(currentPage - 1)
    } else {
    }
  }, [currentPage, data?.data])

//#region  Table Colunms
  const columnHelper = createColumnHelper()

  const columns = [
      columnHelper.accessor((row) => row?.name, {
          id: 'name',
          header: () => 'Name',
          cell: (row) => {
            return( 
                    <span>{row?.row?.original?.name  ? row?.row?.original?.name :"-" }</span>
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
                                        navigate(materialaddedit, {
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
                                            navigate(materialaddedit, {
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

 //#region  Approve material Process
const handleApproveDecline = (id) => {
    setShowMaterialStatusPopup(true)
    setStatusUpdate(id)
}

 function handlePermission(materialId) {
    mutationStatusUpdate.mutate(materialId)
    setShowMaterialStatusPopup(false)
  }

  async function updateStatusbyId(materialId) {

    if(buttonText=="Approve"){
        return await requestApi.post(`/material/approve-decline`, {
            materialId,
            status:1
        })
    }else{
        return await requestApi.post(`/material/approve-decline`, {
            materialId,
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
        queryClient.invalidateQueries('materiallist')
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
    const onStatusChange = useCallback((materialId) => {
        mutationStatusActiveInactive.mutate(materialId)
    }, [])
    async function updateStatusbymaterialId(materialId) {
        return await requestApi.post(`/material/active-inactive-status`, {
            materialId
        })
    }

    const mutationStatusActiveInactive = useMutation(updateStatusbymaterialId, {
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
      <>
          <div className='material-management'>
                <div className='admin-card'>
                    <div class="head">
                        <h2>Material Management</h2>
                        <div className='search-btn-group'>
                        <form action=""
                            {...register('materialSearch', {
                                onChange: (e) => {
                                    handleSearch(e)
                                }
                            })}
                            className='product-table-filter'>
                            <input type="search" name="materialSearch"  placeholder='Search'/>
                        </form>
                        <button onClick={()=>navigate(materialaddedit)}  className='solid-red-btn'>Add New Material</button>
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
                              {...register('materialSearch', {
                                  onChange: (e) => {
                                      handleSearch(e)
                                  }
                              })}
                          />
                      </InputGroup>
                      <button onClick={()=>navigate(materialaddedit)}>Add New Material</button>
                  </div> */}

                  { isLoading ? (
                      <TableSkeleton />
                  ) :
                  data?.data?.length > 0 ? (
                    <>
                        <TableListing table={table} className="m-0"/>
                        <div className="pagination-wrap">
                            <div className="showing-pages">
                                <span>
                                    Showing {(currentPage - 1) * DataLimit + 1} to{' '}
                                    {Math.min(
                                        currentPage * DataLimit,
                                        data.meta.totalCount
                                    )}{' '}
                                    of {data.meta.totalCount} Materials
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
                                        total={Math.ceil(data.meta.totalCount/DataLimit)}
                                        current={currentPage}
                                        onChangePage={handleChangePage}
                                    />
                                </>
                            )}
                        </div>
                    </>
                ) : (
                   <div className='no-record-found'>
                      No Record Found
                   </div>
                )
                  }
          <DeleteModal
              message={
                  <>
                      Are you sure you want to <br /> Delete this record ?
                  </>
              }
              setIsDeleteModal={setIsDeleteModal}
              isDeleteModal={isDeleteModal}
              handleDelete={() => handleDelete(deleteId)}
          />

          <ApproveDeclinePopup
              ShowMaterialStatusPopup={ShowMaterialStatusPopup}
              setShowMaterialStatusPopup={setShowMaterialStatusPopup}
              setStatusUpdate={statusUpdate}
              title={`are you sure you want to ${buttonText} ?`}
              // handlestatus={handlestatus}
              text={buttonText}
              handlePermission={()=>handlePermission(statusUpdate)}
          />
        </div>
      </>
  )
}

export default MaterialManagement