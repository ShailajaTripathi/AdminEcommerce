import React, { useState } from 'react'
import CMS from '../CMS/CMS'
import { Accordion, Modal } from 'react-bootstrap'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useMutation, useQuery } from '@tanstack/react-query';
import {useForm} from 'react-hook-form'
import Swal from 'sweetalert2';
import requestApi from '../../utils/request';
import FAQAddEditModal from '../../components/FAQAddEditModal/FAQAddEditModal'

import {ReactComponent as IconPlus} from '../../assets/images/icons/icon-plus-white.svg'
import { ReactComponent as IconsDots } from '../../assets/images/icons/icon-action-dots.svg'
import { ReactComponent as IconEdit } from '../../assets/images/icons/icon-edit-white.svg'
import { ReactComponent as IconView } from '../../assets/images/icons/icon-view-white.svg'
import { ReactComponent as IconDelete } from '../../assets/images/icons/icon-delete-white.svg'

const FAQManagement = () => {

  const[openModal, setOpenModal] = useState(false)

  const handleModal=()=>{
    setOpenModal(true)    
  }

  // const [openAction, setopenAction] = useState(false)
  // const OpenAction = () => {
  //   setopenAction(!openAction);
  // };

  
  const [openAction, setopenAction] = useState(null)
    const OpenAction = (id) => {
      console.log(id)
    setopenAction(openAction === id ? null : id);
    };
    

//#region  Static Data 
  const  FAQData =[
    {
      id: 1,
      title:"How do I know that the products you sell are authentic?",
      description:<>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.</>
    },
    {
      id: 2,
      title:"How do I know that the products you sell are authentic?",
      description:<>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.</>
    },

    {
      id: 3,
      title:"How do I know that the products you sell are authentic?",
      description:<>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.</>
    },
    {
      id: 4,
      title:"How do I know that the products you sell are authentic?",
      description:<>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.</>
    },
    {
      id: 5,
      title:"How do I know that the products you sell are authentic?",
      description:<>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.</>
    },
    {
      id: 6,
      title:"How do I know that the products you sell are authentic?",
      description:<>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.</>
    },


  ] 
  //#endregion

  return (
    <CMS>
     <div className='head faq-head'>
        <h2>FAQs</h2>
        <button onClick={()=>handleModal()} className='solid-red-btn'><IconPlus/>Add FAQ</button>
      </div>
      <div className='support-body-content faq-body'>
        <Accordion className='admin-accordion'>
          {
            FAQData.map((rr,i)=>{
              return(
              <Accordion.Item eventKey={rr?.id}>
              <div className='head'>
               {rr?.title}
                <div className='accordion-action'>
                  <div className={`table-action ${openAction ? "active" : ""}`}>
                      <div className={`action-btn ${openAction ? "active" : ""}`} onClick={()=>OpenAction(rr?.id)}><IconsDots/></div>
                      <div className='action-panel three-action'>
                          <div className='action-btn-icon edit'
                              // onClick={() =>
                              //   navigate(coloraddedit, {
                              //       state: row?.row?.original?._id
                              //   })
                              // }
                          ><IconEdit/></div>
                           <div className='action-btn-icon edit'
                              // onClick={() =>
                              //   navigate(coloraddedit, {
                              //       state: row?.row?.original?._id
                              //   })
                              // }
                          ><IconView/></div>
                          <div className='action-btn-icon delete'
                              // onClick={() =>
                              //   handleDeleteModal(
                              //       row?.row?.original?._id
                              //   )
                              // }
                          ><IconDelete/></div>
                      </div>
                  </div> 
                  <Accordion.Header></Accordion.Header>
                </div>
              </div>
              <Accordion.Body>
              <p>{rr?.description}</p>
              </Accordion.Body>
            </Accordion.Item>
              )
            })
          }
        </Accordion>
      </div>
      <FAQAddEditModal openModal={openModal} setOpenModal={setOpenModal} />
    </CMS>
  )
}

export default FAQManagement