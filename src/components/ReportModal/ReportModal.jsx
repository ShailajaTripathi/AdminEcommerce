import React from 'react'
import { Col, Dropdown, Modal, ModalBody, ModalTitle, Row } from 'react-bootstrap'
import { ReactComponent as IconClose } from '../../assets/images/icons/icon-modal-close.svg'

const ReportModal = ({ShowMaterialStatusPopup,setShowMaterialStatusPopup}) => {
    
    return (
        <Modal
            centered
            className='modalbox confirm-modal filter-modal  repor-modal'
            show={ShowMaterialStatusPopup}
            onHide={() => setShowMaterialStatusPopup(false)}
        >
            <ModalBody>
                <div className='head'>
                    <h2>Report</h2>
                    <div className='close' onClick={()=>{setShowMaterialStatusPopup(false)}}><IconClose/></div>
                </div>
                <form action="">
                    <Row>
                        <Col lg="4" md="6" sm="12">
                            <div className="form-group">
                                <label>Note</label>
                                <textarea name="" id="" cols="30" rows="8" placeholder='Write a message'></textarea>
                            </div>
                        </Col>
                        <Col lg="12">
                            <div className="modal-btn-group">
                                <button type='button' className='solid-red-btn modal-btn'>Report</button>
                            </div>
                        </Col>
                    </Row>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default ReportModal