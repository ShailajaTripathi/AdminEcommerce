import React from 'react'
import { Col, Dropdown, Modal, ModalBody, ModalTitle, Row } from 'react-bootstrap'
import { ReactComponent as IconClose } from '../../assets/images/icons/icon-modal-close.svg'

const FilterModal = ({ShowCatalogFilterPopup,setShowCatalogFilterPopup}) => {
    
    return (
        <Modal
            centered
            className='modalbox confirm-modal filter-modal'
            show={ShowCatalogFilterPopup}
            onHide={() => setShowCatalogFilterPopup(false)}
        >
            <ModalBody>
                <div className='head'>
                    <h2>Filter</h2>
                    <div className='close' onClick={()=>{setShowCatalogFilterPopup(false)}}><IconClose/></div>
                </div>
                <form action="">
                    <Row>
                        <Col lg="4" md="6" sm="12">
                            <div className="form-group">
                                <label>Vender Name</label>
                                <input type="text" value={'Westand Cloth Store'}/>
                            </div>
                        </Col>
                        <Col lg="4" md="6" sm="12">
                            <div className="form-group">
                                <label>Category</label>
                                <Dropdown
                                    flip="no"
                                    drop="down-centered"
                                >
                                    <Dropdown.Toggle
                                        variant="success"
                                        id="dropdown-basic"
                                    >
                                        Male
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Male">
                                            Male
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="Female">
                                            Female
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                        <Col lg="4" md="6" sm="12">
                            <div className="form-group">
                                <label>Sub Category</label>
                                <Dropdown
                                    flip="no"
                                    drop="down-centered"
                                >
                                    <Dropdown.Toggle
                                        variant="success"
                                        id="dropdown-basic"
                                    >
                                       Lehenga
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Lehenga">
                                            Lehenga
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="Lehenga 2">
                                            Lehenga 2
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="Lehenga 3">
                                            Lehenga 3
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                        <Col lg="4" md="6" sm="12">
                            <div className="form-group">
                                <label>Product Material</label>
                                <Dropdown
                                    flip="no"
                                    drop="down-centered"
                                >
                                    <Dropdown.Toggle
                                        variant="success"
                                        id="dropdown-basic"
                                    >
                                       Cotton
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Cotton">
                                            Cotton
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="Cotton">
                                            Cotton
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="Cotton">
                                            Cotton
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                        <Col lg="4" md="6" sm="12">
                            <div className="form-group">
                                <label>Country of Origin</label>
                                <Dropdown
                                    flip="no"
                                    drop="down-centered"
                                >
                                    <Dropdown.Toggle
                                        variant="success"
                                        id="dropdown-basic"
                                    >
                                       India
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Cotton">
                                            USA
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="uK">
                                            UK
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                        <Col lg="4" md="6" sm="12">
                            <div className="form-group">
                                <label>Type</label>
                                <Dropdown
                                    flip="no"
                                    drop="down-centered"
                                >
                                    <Dropdown.Toggle
                                        variant="success"
                                        id="dropdown-basic"
                                    >
                                       Marriage Fashion
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Marriage Fashion">
                                            Marriage Fashion
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="Marriage Fashion">
                                            Marriage Fashion
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                        <Col lg="4" md="6" sm="12">
                            <div className="form-group">
                                <label>Product Weight (gms)</label>
                                <input type="text" value={'500'}/>
                            </div>
                        </Col>
                        <Col lg="4" md="6" sm="12">
                            <div className="form-group">
                                <label>Product Weight (gms)</label>
                                <Dropdown
                                    flip="no"
                                    drop="down-centered"
                                >
                                    <Dropdown.Toggle
                                        variant="success"
                                        id="dropdown-basic"
                                    >
                                       7 To 10 Days
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="7 To 10 Days">
                                            1 To 7 Days
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey=" 1 To 7 Days">
                                            7 To 10 Days
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                        <Col lg="12">
                            <div className="modal-btn-group">
                                <button type='button' className='solid-red-btn modal-btn'>Apply</button>
                                <button type='button' className='border-red-btn modal-btn'>Reset</button>
                            </div>
                        </Col>
                    </Row>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default FilterModal