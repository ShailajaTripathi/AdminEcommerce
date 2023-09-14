import React from 'react'
import { Form, Modal } from 'react-bootstrap'
import { ReactComponent as DeleteImg } from '../../assets/images/redbin.svg'
import { ReactComponent as LogoutImg } from '../../assets/images/logout.svg'
import ButtonWithLoader from '../ButtonWithLoader'
import { ReactComponent as LogoutAdmin } from '../../assets/images/icons/adminLogout.svg'
const DeleteModal = ({
    title = 'CV',
    handleDelete,
    setIsDeleteModal,
    isDeleteModal,
    isLoading,
    isLogout,
    message = (
        <>
            Are you sure you want to delete this job application?
        </>
    )
}) => {
    return (
        <Modal
            className="modalbox confirm-modal text-center"
            show={isDeleteModal}
            onHide={() => setIsDeleteModal(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            {/* {!isLogout && <Modal.Header closeButton>Delete {title}</Modal.Header>} */}

            <Modal.Body>
                {/* <div className="deleteimg">{isLogout ? <LogoutAdmin /> : <DeleteImg />}</div> */}
                <div className='mb-4'><LogoutAdmin /></div>
                <h2>{message}</h2>
                <div className='modal-btn-group'>
                    <button
                        disabled={isLoading}
                        type="button"
                        className="border-red-btn modal-btn"
                        onClick={() => {
                            setIsDeleteModal(false)
                        }}
                    >
                        No
                    </button>
                    <ButtonWithLoader
                        isLoading={isLogout}
                        cssClass="solid-red-btn modal-btn"
                    >
                        <button
                            className="solid-red-btn modal-btn"
                            type="button"
                            onClick={handleDelete}
                        >
                            Yes
                        </button>
                    </ButtonWithLoader>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default React.memo(DeleteModal)
