import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { forgotpassword, home, signup } from '../../config/routingConsts'
import Button from '../../components/Button/Button'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import requestApi from '../../utils/request'
import Swal from 'sweetalert2'
import { useAdminInfo } from '../../context/AdminContextDetail'


export function adminLogin({ email, password }) {
  return requestApi.post('/login', { email, password })
}

const Login = () => {
  const [disableBtn, setDisableBtn] = useState(false)
  const { t } = useTranslation()
  const currentUserContext = useAdminInfo()
  const homePage = t('home', { returnObjects: true })
  const [loginuser, setloginUser] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setloginUser({ ...loginuser, [e.target.name]: e.target.value })
  }
  
  const validationSchema = yup.object({
    email: yup.string().required('Please Enter Email Address'),
    // .max(
    //     30,
    //     'Username or Email must be between 8 to 30 characters long'
    // ),
    password: yup
      .string()
      .required('Please Enter Password')
      .min(6, 'Password must be 6 to 30 characters long')
      .max(30, 'Password must be 6 to 30 characters long'),
    agree: yup.boolean().oneOf([true], 'Please Check Agree')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'all' })
  

  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
}

const mutation = useMutation(adminLogin, {
  onSuccess: ({ data }) => {
      setDisableBtn(true)
      localStorage.setItem(
          'adminToken',
          JSON.stringify(data?.meta?.tokenData)
      )
      localStorage.setItem('admin', JSON.stringify(data?.data))
      navigate(home)
      currentUserContext.setCurrentUser(data?.data)
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
const handleOnSubmit = (data) => {
  const { email, password } = data
  mutation.mutate({
      email,
      password
  })
  setTimeout(() => {
      setDisableBtn(false)
  }, 3000)
}

  return (
    <>
      <section className='card-view'>

        <div className="head">
          <h2>{homePage.Login.title}</h2>
        </div>
        <form onSubmit={handleSubmit(handleOnSubmit)}  className='login-form'>
          <div className="form-group">
            <label htmlFor="">{homePage.Login.emailTitle}</label>
            <input type="text" name="email" id="" placeholder={homePage.Login.emailPlaceholder} {...register(
              'email',
              {
                onChange: (
                  e
                ) => {
                  handleChange(
                    e
                  )
                }
              }
            )} />
            <span
            className='error'
            >
              {
                errors.email
                  ?.message
              }
            </span>
          </div>
          <div className="form-group m-0">
            <label htmlFor="">{homePage.Login.passwordTitle}</label>
            <div className='password-group'>
              <input type={
                passwordShown
                  ? 'text'
                  : 'password'
              } name="password" id="" placeholder={homePage.Login.passwordPlaceholder} {...register(
                'password',
                {
                  onChange: (
                    e
                  ) => {
                    handleChange(
                      e
                    )
                  }
                }
              )} />
              <button type='button'
              onClick={togglePasswordVisiblity}
              className={passwordShown ? 'eye show' : 'eye hidden'}
              ></button>
            </div>
            <span className='error'
            >
              {
                errors.password
                  ?.message
              }
            </span>
          </div>
          <div className="form-group forgot-group">
            <Link to={forgotpassword}>{`${homePage.Login.forgotpassword}`}</Link> <span>?</span>
          </div>
          <div className="form-btn-group">
            <Button commonClass="solid-red-btn form-btn" text={homePage.Login.btnLogin} />
          </div>
        </form>
      </section>
    </>
  )
}

export default Login