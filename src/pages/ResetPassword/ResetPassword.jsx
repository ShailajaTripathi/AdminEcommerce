import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import requestApi from '../../utils/request'
import { home } from '../../config/routingConsts'
import PasswordInput from '../../components/PasswordInput'
import { ReactComponent as BackIcon } from '../../assets/images/icons/icon-back-red.svg'


const ResetPassword = () => {
    const navigate = useNavigate()
    const { token } = useParams()

    //#region validation schema
    const resetPasswordValidationSchema = yup.object().shape({
        newPassword: yup
            .string()
            .required('Please enter new password')
            .when('currentPassword', (currentPassword) => {
                if (currentPassword)
                    return yup
                        .string()
                        .notOneOf(
                            [yup.ref(`currentPassword`), null],
                            'Current password and New password should not be same'
                        )
                        .required('Please enter new password')
            }),
        confirmPassword: yup
            .string()
            .required('Please enter confirm password')
            .oneOf(
                [yup.ref(`newPassword`), null],
                'New password and confirm password does not match'
            )
    })
    //#endregion

    async function resetpassword({ newPassword, confirmPassword }) {
        return await requestApi.post(`/reset-password/${token}`, {
            newPassword: newPassword,
            confirmPassword: confirmPassword
        })
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(resetPasswordValidationSchema),
        mode: 'all'
    })

    const mutation = useMutation(resetpassword, {
        onSuccess: ({ data }) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '',
                text: data?.meta?.message
            }).then(() => {
                navigate(home)
                reset()
            })
        },
        onError: (error) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '',
                text: error?.message
            })
        }
    })

    const handleOnSubmit = ({ newPassword, confirmPassword }) => {
        mutation.mutate({
            newPassword,
            confirmPassword
        })
    }

    return (
        <section className="card-view">
            <div className="head">
                <h2>Reset Password</h2>
                <Link to={home} className="back">
                    <BackIcon />
                    Back
                </Link>
            </div>

            <Form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="login-form"
            >
                <Row>
                    <Col lg="12">
                        <div className="form-group">
                            <PasswordInput
                                label="New Password"
                                name="newPassword"
                                register={register}
                                error={errors.newPassword?.message}
                            />
                        </div>
                    </Col>
                    <Col lg="12">
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
                        <button className="solid-red-btn w-100" type="submit">
                            Change Password
                        </button>
                    </Col>
                </Row>
            </Form>
        </section>
    )
}

export default ResetPassword
