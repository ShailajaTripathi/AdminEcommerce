import React, { useRef, useState } from 'react'
import MyAccountLayout from '../../components/Layout/Dashboard/MyAccountLayout'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import InputControl from '../../components/InputControl/InputControl'
import requestApi from '../../utils/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useAdminInfo } from '../../context/AdminContextDetail'
import Swal from 'sweetalert2'
import { getFormData } from '../../functions/common'
import { ReactComponent as SelectImg } from '../../assets/images/selectimg.svg'
import InputControl from '../../components/InputControl'
import { Col, Row } from 'react-bootstrap'


async function ViewProfileData() {
    return await requestApi.post(`/view-profile`, {}, { headers: true }).then((res) => res.data)
}

const EditProfile = () => {

        //#region Validation Schema For Form
        const editProfileSchema = yup.object({
            firstName: yup.string().required('Please enter first name.').trim().max(25, 'First name must be most 25 characters.'),
            lastName: yup.string().required('Please enter last name.').trim().max(25, 'Last name must be most 25 characters.'),
            email: yup.string().required('Please enter email.'),
            phone: yup
                .string()
                .required('Please enter contact number.')
                .matches(/^[0-9]+$/, {
                    message: 'Mobile number must be in digits'
                })
                .min(6, 'Mobile number must be at least 6 digits')
                .max(12, 'Mobile number must be at most 12 digits'),
        })
        //#endregion
    const [imageErr, setimageErr] = useState('')

    const currentAdminContext = useAdminInfo()
    const queryClient = useQueryClient()

    const {
        register,
        reset,
        handleSubmit,
        setValue,
        formState: { errors },
        control
    } = useForm({ resolver: yupResolver(editProfileSchema) })


    //#region  API Call for View Data of Current-User
    const onSuccess = (response) => {
        
        const { firstName, lastName, profilePic, email, phone } = response.data
        reset({
            firstName,
            lastName,
            email,
            phone,
            profilePic
        })
        setImageUrl(profilePic)
        localStorage.setItem(
            'admin',
            JSON.stringify({
                firstName, lastName, email, phone, profilePic
            })
        )
        currentAdminContext.setCurrentUser({
            firstName, lastName, email, phone, profilePic
        })
    }
    const onError = (error) => {
        console.log(error)
    }

    const { data } = useQuery({
        queryKey: ['admin-profile'],
        onSuccess,
        onError,
        queryFn:ViewProfileData
    })
    //#endregion

    function adminEditProfile(payload) {
        return requestApi.post(`/edit-profile`, payload)
    }
    const mutation = useMutation(adminEditProfile, {
        onSuccess: (res) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '',
                text: res?.data?.meta?.message
            })
            queryClient.invalidateQueries('admin-profile')
            // localStorage.setItem('admin', JSON.stringify({res}))
            // currentAdminContext.setCurrentUser(res)
        },
        onError: (err) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '',
                text: err?.message
            })
        }
    })
    const editOnSubmit = ({ profilePic, ...data }) => {
        if (imageErr === '') {
            const { firstName, lastName, email, phone } = data
            const payload = {
                // firstName,
                // lastName,
                // email,
                // phone
                profilePic, ...data
            }
            const formdata = getFormData(payload)
            mutation.mutate(formdata)
        }
    }
    const uploadImage = useRef(null)
    const [imageUrl, setImageUrl] = useState(null)

    const handleFileUpload = (e) => {
        if (
            e.target.files[0].type === 'image/jpg' ||
            e.target.files[0].type === 'image/jpeg' ||
            e.target.files[0].type === 'image/png'
        ) {
            setValue('profilePic', e.target.files[0])
            setImageUrl(URL.createObjectURL(e.target.files[0]))
            setimageErr('')
        } else {
            setimageErr('Please select .jpeg, .jpg or .png file formate.')
        }
    }

    return (
        <MyAccountLayout>
            <div className='head'>
                <h2>Edit Profile</h2>
            </div>
            <div className='support-body-content'>
                <form onSubmit={handleSubmit(editOnSubmit)}>
                    <Row>
                        <Col lg="12">
                            <div className='form-group'>
                                <div className="profile-image mb-0">
                                    <img src={imageUrl} alt='image'/>
                                    <div
                                        className="selectimg"
                                        onClick={() => uploadImage.current.click()}
                                    >
                                        <input
                                            type="file"
                                            ref={(event) => {
                                                register('profilePic')
                                                uploadImage.current = event
                                            }}
                                            accept=".jpg,.png,.jpeg"
                                            style={{ display: 'none' }}
                                            onChange={handleFileUpload}
                                        />
                                        <SelectImg />
                                    </div>
                                </div>
                                {/* {errors.profilePic?.message && (
                                        <span className="error-message">
                                            {errors.profilePic?.message}
                                        </span>
                                    )} */}
                                {!!imageErr && <span className="error-message">{imageErr}</span>}
                            </div>
                        </Col>
                        <Col xxl="4" lg="6" md="6">
                            <InputControl
                                label="First Name"
                                name="firstName"
                                register={register}

                                error={errors.firstName?.message}
                            />
                        </Col>
                        <Col xxl="4" lg="6" md="6">
                            <InputControl
                                label="Last Name"
                                name="lastName"
                                register={register}
                                error={errors.lastName?.message}
                            />
                        </Col>
                        <Col xxl="4" lg="6" md="6">
                            <InputControl
                                label="Email Address"
                                name="email"
                                disabled
                                register={register}
                                error={errors.email?.message}
                            />
                        </Col>
                        <Col xxl="4" lg="6" md="6">
                            <InputControl
                                label="Contact No."
                                name="phone"
                                register={register}
                                error={errors.phone?.message}
                            />
                        </Col>
                        <Col lg="12">
                            <button className="solid-red-btn" type="submit">
                                Edit
                            </button>
                        </Col>
                    </Row>
                    
                </form>
            </div>
            
        </MyAccountLayout>
    )
}

export default EditProfile  