import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ReactComponent as BackIcon } from '../../assets/images/icons/icon-back-red.svg'
import { login,resetpassword } from '../../config/routingConsts'
import Button from '../../components/Button/Button'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import InputControl from '../../components/InputControl'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import requestApi from '../../utils/request'
import Swal from 'sweetalert2'
import { useMutation } from '@tanstack/react-query'

const forgotPassValidationSchema = yup.object().shape({
  email: yup
      .string()
      .email('Please enter a valid email')
      .required('Please enter email')
})

const ForgotPassword = () => {
  const {t} = useTranslation()
  const home = t('home',{returnObjects:true})
  const navigate = useNavigate()

  const [emailSent, setEmailSent] = useState('')

  async function adminForgotPassword(email) {
    return await requestApi.post('/forgot-password', email)
}

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(forgotPassValidationSchema) })

  const mutation = useMutation(adminForgotPassword, {
    onSuccess: (res) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '',
             text:res?.data?.meta?.message
        }).then(()=> navigate(home))
       
        reset()
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

const handleOnSubmit = ({ email }) => {
    mutation.mutate({
        email
    })
}

  return (
    <section className='card-view'>
      <div className="head">
        <h2>{home.ForgotPassword.title}</h2>
        <Link to={-1} className='back'><BackIcon/>{home.backBtn}</Link>
      </div>
      <form  onSubmit={handleSubmit(handleOnSubmit)} action="" className='login-form' >
        <div className="form-group">
          <InputControl
                                    label="Email Address"
                                    name="email"
                                    register={register}
                                    error={errors.email?.message}
                                
            />
        </div>
        <div className="form-btn-group">
          <Button commonClass="solid-red-btn form-btn" text={home.ForgotPassword.btnForgot}  />
        </div>
      </form>
    </section>
  )
}

export default ForgotPassword