import React, { useDebugValue } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import {useForm} from 'react-hook-form'
import Swal from 'sweetalert2';
import requestApi from '../../utils/request';
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import { sizemanagement } from '../../config/routingConsts';
import InputControl from '../../components/InputControl'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row } from 'react-bootstrap';


const validationSchema = yup.object({
    size: yup.string().required("Please enter size Name")
        });

const SizeAddEdit = () => {

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
    async function viewsizes(sizeId) {
        return await requestApi
            .post(
                `size/view`,
                { sizeId: sizeId },
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
                size:data?.data?.name
            }) 
        }
    })

    // end industry on id //

  async function newAddsize(payload) {
    if (state) {
        return await requestApi
            .post(
                `size/add-edit`,
               {sizeId:state,...payload} 
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
            navigate(sizemanagement)
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
        <div className='admin-card'>
            <div class="head">
                <h2>{state?" Edit":" Add"} Size </h2>
            </div>
            <div className='admin-form-body'>
                <form onSubmit={handleSubmit(handleAddEditsize)}>
                    <Row>
                        <Col xxl="4" md="6">
                            <div className='form-group'>
                                <InputControl
                                    label="Size Name"
                                    name="size"
                                    register={register}
                                    // placeholder="Industry"
                                    error={errors?.size?.message}
                                />
                            </div>
                        </Col>
                    </Row>
                    <button type="submit" className='solid-red-btn'>Save</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default SizeAddEdit