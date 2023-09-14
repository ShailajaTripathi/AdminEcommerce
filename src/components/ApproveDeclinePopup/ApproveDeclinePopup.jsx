import React from 'react'
import { Modal, ModalBody, ModalTitle } from 'react-bootstrap'
import { ReactComponent as IconApprove } from '../../assets/images/icons/icon-approve-modal.svg'
import { ReactComponent as IconDecline  } from '../../assets/images/icons/icon-decline-modal.svg'

const ApproveDeclinePopup = ({
    ShowMaterialStatusPopup,
    setShowMaterialStatusPopup,
    title,
    handlePermission,
    text
}) => {
    return (
        <Modal
            centered
            className='modalbox deletemodal confirm-modal'
            show={ShowMaterialStatusPopup}
            onHide={() => setShowMaterialStatusPopup(false)}
        >
            <Modal.Header>
                <ModalTitle>{title}</ModalTitle>
            </Modal.Header>
            <ModalBody>
                <div className='mb-4'>
                    {text==="Decline"? 
                        <IconDecline/>
                    :
                        <IconApprove />
                    }
                   
                </div>
                <h2>{title}</h2>
                <div className='modal-btn-group'>
                    <button
                    className="border-red-btn  modal-btn"
                        onClick={() => {
                            setShowMaterialStatusPopup(false)
                        }}
                    >
                        Cancel
                    </button>
                    <button className="solid-red-btn modal-btn" onClick={handlePermission}>{text}</button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ApproveDeclinePopup
