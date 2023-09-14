import React,{ useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import MyAccountLayout from '../../components/Layout/Dashboard/MyAccountLayout'
import PasswordInput from '../../components/PasswordInput'
import requestApi from '../../utils/request'
import { useAdminInfo } from '../../context/AdminContextDetail'
// import { useMutation } from 'react-query'
import {useMutation} from '@tanstack/react-query'
import Swal from 'sweetalert2'
import ButtonWithLoader from '../../components/ButtonWithLoader/ButtonWithLoader'

//#region Password form Schema 
const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Please enter current password')
        .min(6, 'Current password must have atleast 6 characters'),
    newPassword: Yup.string()
        .required('Please enter new password')
        .min(6, 'New Password must have atleast 6 characters'),
    confirmPassword: Yup.string()
        .required('Please enter confirm password')
        .min(6, 'Confirm password must have atleast 6 characters')
        .oneOf(
            [Yup.ref('newPassword')],
            'New password and confirm password does not match.'
        )
})
//#endregion

const ChangePassword = () => {
    const {
        currentUser: { email }
    } = useAdminInfo()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ resolver: yupResolver(ChangePasswordSchema) })
    const [disableBtn, setDisableBtn] = useState(false)
    
    async function adminChangePassword(payload) {
        return await requestApi.post(`/change-password`, payload)
    }

    const mutation = useMutation(adminChangePassword, {
        onSuccess: (data) => {
            const { oldPassword, newPassword, confirmPassword, email } = data
            const payload = {
                oldPassword,
                newPassword,
                confirmPassword,
                email
            }
            Swal.fire({
                icon:'success',
                text:data?.data?.meta?.message,
                position:'center',
                title:''
            })
            reset()
        },
        onError: (err) => {    
            Swal.fire({
                icon:"error",
                text:err?.message,
                position:'center',
                title:""
            })
        }
    })

    const handleOnSubmit = (payload) => {
        mutation.mutate(payload)
    }
    return (
        <MyAccountLayout>
            <div className='head'>
                <h2>Change Password</h2>
            </div>
            <div className='support-body-content'>
                <Form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Row>
                        <Col xxl="4" lg="6" md="6">
                            <div className="form-group">
                                <PasswordInput
                                    label="Current Password"
                                    name="oldPassword"
                                    register={register}
                                    error={errors.oldPassword?.message}
                                />
                            </div>
                        </Col>
                        <Col xxl="4" lg="6" md="6">
                            <div className="form-group">
                                <PasswordInput
                                    label="New Password"
                                    name="newPassword"
                                    register={register}
                                    error={errors.newPassword?.message}
                                />
                            </div>
                        </Col>
                        <Col xxl="4" lg="6" md="6">
                            <div className="form-group">
                                <PasswordInput
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    register={register}
                                    error={errors.confirmPassword?.message}
                                />
                            </div>
                        </Col>
                        <Col lg="12">
                            <ButtonWithLoader 
                                isLoading={mutation?.isLoading}
                                cssClass="solid-red-btn">
                                <button
                                    className="solid-red-btn"
                                    type="submit"
                                >
                                    Change Password
                                </button>
                            </ButtonWithLoader>
                        </Col>
                    </Row>
                </Form>
            </div>
        </MyAccountLayout>
    )
}

export default ChangePassword
