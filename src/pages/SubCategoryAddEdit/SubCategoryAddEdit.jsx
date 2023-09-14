import React, { useState } from 'react'
import { Col, Dropdown, Form, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import requestApi from '../../utils/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputControl from '../../components/InputControl/InputControl'
import Swal from 'sweetalert2'
import { categoriesmanagement, subcategorymanagement } from '../../config/routingConsts'


//#region get All Main Category 
const getAllMainCategory = async () => {
    const mainCats = await requestApi.post(
        '/main-category/list',
        {},
        { headers: true }
    )
    return mainCats.data
}
//#endregion



const SubCategoryAddEdit = () => {

  //#region From schema
  const categoryValidationSchema = yup.object().shape({
    categoryName: yup
        .string()
        .trim()
        .max(25, 'Must be at max 25 characters')
        .required('Please enter sub category name'),
    MainCategory :yup
    .object()
    .required('Please select main category')
    .test("error","Please select main cateogry Name",(e)=>{
              return !!e.name? true:false
    })
})
//#endregion
            
const {
  register,
  handleSubmit,
  control ,
  reset,
  formState: { errors },
  watch
} = useForm({resolver: yupResolver(categoryValidationSchema), defaultValues:{
    MainCategory:{name:""}
} })

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const{state} = useLocation()

    const [MainCategory, setMainCategory] = useState({name:"Select Category"})



    //#region category Add/Edit
const categoryAddEdit = async (payload) => {
    if(state){
        const mainCats = await requestApi.post(
            '/category/add-edit',
            {...payload,categoryId:state},
            { headers: true }
        )
        return mainCats.data

    }else{
        const mainCats = await requestApi.post(
            '/category/add-edit',
            payload,
            { headers: true }
        )
        return mainCats.data
    }

  }
  //#endregion

    const { data: MainCategoryList, isLoading } = useQuery({
        queryKey: ['maincategorylist', MainCategory],
        queryFn: getAllMainCategory
    })

    const categoryMutation = useMutation(categoryAddEdit, {
      onSuccess: ( {data} ) => {
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: '',
              allowOutsideClick: false,
              text: data?.meta?.message
          }).then(()=>{
             navigate(subcategorymanagement) 
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

  // view-SubCategory on id //
  async function viewCategory(categoryId) {
    return await requestApi
        .post(
            `category/view`,
            { categoryId: categoryId },
            { headers: true }
        )
        .then((res) => {
            return res.data
        })
}

const { data } = useQuery({
    queryKey: ['view-size'],
    queryFn: () => viewCategory(state),
    enabled: !!state,
    onSuccess: (data) => {
        reset({
            MainCategory:{name:data?.data?.mainCategoryName,_id:data?.data?.mainCategoryId},
            categoryName:data?.data?.categoryName,
            categoryId:state
        }) 
    }
})
// end SubCategory on id //

    const SubCategoryAddEdit = (data) => {
            const {categoryName,MainCategory}=data      
           const payload={mainCategoryId:MainCategory?._id,categoryName}
            categoryMutation.mutate(payload)
    }
    
    return (
        <>
            <div className='admin-card'>
            <div class="head">
                <h2>
                {state?" Edit":" Add"} Sub Category </h2>
            </div>
            <div className='admin-form-body'>
                <form onSubmit={handleSubmit(SubCategoryAddEdit)}>
                    <Row>
                      <Col xxl="4" md="6">
                      <div className='form-group'>
                            <label >Select Category</label>
                            <Controller
                                control={control}
                                name="MainCategory"
                                render={({ field: { onChange, onBlur, value, ref } }) => (          
                            <Dropdown
                            flip="no"
                            onSelect={(e)=>onChange(JSON.parse(e))}
                            name="MainCategory"
                            drop="down-centered"
                            {...register("MainCategory")}
                        >
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                            >
                                {value?.name || "Select Category" }
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {MainCategoryList?.data?.map((mCat) => {
                                    return (
                                        <Dropdown.Item
                                            key={mCat._id}
                                            eventKey={JSON.stringify(mCat)}
                                        >
                                            {mCat.name}
                                        </Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                                )}
                            
                                >
                            </Controller>
                                    {
                                errors?.MainCategory && (
                                        <span className="error-message" style={{ color: 'red' }}> {errors?.MainCategory?.message}</span>
                                    )
                                }
                            </div>
                      </Col>
                        <Col xxl="4" md="6">
                            <div className='form-group'>
                                <InputControl
                                    label="Sub Cateogry Name"
                                    name="categoryName"
                                    register={register}
                                    error={errors?.categoryName?.message}
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

export default SubCategoryAddEdit
