import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import InputControl from '../InputControl'
import Swal from 'sweetalert2'
import { useMutation, useQuery } from '@tanstack/react-query';
import requestApi from '../../utils/request';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { faqmanagement } from '../../config/routingConsts';
import { ReactComponent as IconClose } from '../../assets/images/icons/icon-modal-close.svg'


const validationSchema = yup.object({
  title: yup.string().required("Please enter title"),
  description: yup.string().required("Please enter description"),
      });

const FAQAddEditModal = ({openModal,setOpenModal}) => {


  const navigate = useNavigate()
  const {state} =useLocation()
const {
  register,
  control,
  handleSubmit,
  reset,
  getValues,
  setValue,
  watch,
  setError,
  formState: { errors, submitCount },
} = useForm({
  mode: "all",
  resolver: yupResolver(validationSchema),
  // defaultValues: { addSize: [], addVariant: [] },
});

  // view-size on id //
  async function viewsizes(faqId) {
      return await requestApi
          .post(
              `faq/view`,
              { faqId: faqId },
              { headers: true }
          )
          .then((res) => {
              return res.data
          })
  }
  
  const { data, isLoading } = useQuery({
      queryKey: ['view-size'],
      queryFn: () => viewsizes(state),
      enabled: !!state,
      onSuccess: (data) => {
          reset({
              title:data?.data?.title,
              description:data?.data?.description
          }) 
      }
  })

  // end industry on id //

async function newAddsize(payload) {
  if (state) {
      return await requestApi
          .post(
              `faq/add-edit`,
             {faqId:state,...payload} 
          )
          .then((res) => {
              return res.data
          })
  } else {
      return await requestApi
          .post(
              `size/add-edit`,
              payload
          )
          .then((res) => {
              return res.data
          })
  }
}

const mutation = useMutation(newAddsize, {
  onSuccess: (data) => {
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: '',
          allowOutsideClick: false,
          text: data?.meta?.message
      }).then(() => {
          navigate(faqmanagement)
      })
  },
  onError: (error) => {
      Swal.fire({
          position: 'center',
          icon: 'error',
          title: '',
          allowOutsideClick: false,
          text: error?.message
      })
  }
})


  const handleAddEditsize=(data)=>{
   
      // const {name} = data
       mutation.mutate(data) 
  }


  return (
    <>
    <Modal centered show={openModal} onHide={()=>setOpenModal(false)} className='confirm-modal filter-modal'>
            <Modal.Body>
                <div className='head'>
                    <h2>Add/Edit FAQ</h2>
                    <div className='close' onClick={()=>{setOpenModal(false)}}><IconClose/></div>
                </div>
                <form onSubmit={handleSubmit(handleAddEditsize)}>
                    <Row>
                        <Col lg="12">
                            <div className="form-group">
                                <label>Question</label>
                                <input type="text" value={'How do I know that the products you sell are authentic?'}/>
                            </div>
                        </Col>
                        <Col lg="12">
                            <div className="form-group">
                                <label>Answer</label>
                                <textarea name="" id="" cols="30" rows="8" value={'As an authorized online distributor for all of the designers we feature, we unconditionally guarantee that every item we sell is 100% authentic. Please note that we are unable to comment on the authenticity of any items not purchased from swanee@MEN.com'}></textarea>
                            </div>
                        </Col>
                        <Col lg="12">
                            <button type="submit" className='solid-red-btn'>Add/Edit</button>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
        </Modal>
    </>


  )
}

export default FAQAddEditModal