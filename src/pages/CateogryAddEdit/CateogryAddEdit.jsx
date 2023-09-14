
import React, { useDebugValue } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import {useForm} from 'react-hook-form'
import Swal from 'sweetalert2';
import requestApi from '../../utils/request';
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import { categoryaddedit, categorymanagement } from '../../config/routingConsts';
import InputControl from '../../components/InputControl'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row } from 'react-bootstrap';


const validationSchema = yup.object({
    mainCategoryName: yup.string().required("Please enter cateogry Name")
        });

const CateogryAddEdit = () => {

    const navigate = useNavigate()
    const {state} =useLocation()

    console.log(state,"state"); 
    
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

    // view-color on id //
    async function viewColors(mainCategoryId) {
        return await requestApi
            .post(
                `main-category/view`,
                { mainCategoryId: mainCategoryId },
                { headers: true }
            )
            .then((res) => {
                return res.data
            })
    }

    const { data, isLoading } = useQuery({
        queryKey: ['view-material'],
        queryFn: () => viewColors(state),
        enabled: !!state,
        onSuccess: (data) => {
            reset({
                mainCategoryName:data?.data?.name
            }) 
        }
    })

    // end industry on id //

  async function newAddColor(payload) {
    if (state) {
        return await requestApi
            .post(
                `main-category/add-edit`,
               {mainCategoryId:state,...payload} 
            )
            .then((res) => {
                return res.data
            })
    } else {
        return await requestApi
            .post(
                `main-category/add-edit`,
                payload
            )
            .then((res) => {
                return res.data
            })
    }
}

  const mutation = useMutation(newAddColor, {
    onSuccess: (data) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '',
            allowOutsideClick: false,
            text: data?.meta?.message
        }).then(() => {
            navigate(categorymanagement)
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


    const handleAddEditColor=(data)=>{
         mutation.mutate(data) 
    }

  return (
    <>
        <div className='admin-card'>
            <div class="head">
                <h2> {state?" Edit":" Add"} Cateogry</h2>
            </div>
            <div className='admin-form-body'>
                <form onSubmit={handleSubmit(handleAddEditColor)}>
                    <Row>
                        <Col xxl="4" md="6">
                            <div className='form-group'>
                                <InputControl
                                    label="category Name"
                                    name="mainCategoryName"
                                    register={register}
                                    // placeholder="Industry"
                                    error={errors?.mainCategoryName?.message}
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

export default CateogryAddEdit