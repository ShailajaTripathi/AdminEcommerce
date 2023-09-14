import axios from 'axios'
import Swal from 'sweetalert2'
import { useAdminInfo } from '../context/AdminContextDetail'
import { home } from '../config/routingConsts'

const requestApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const AxiosInterceptor = ({ children }) => {
    const currentUserContext = useAdminInfo()

    requestApi.interceptors.request.use((req) => {
        const authToken = JSON.parse(localStorage.getItem('adminToken'))

        if (authToken || req?.data?.authToken) {
            let tokens = req?.data?.authToken ?? ''
            let newtoken = authToken ?? tokens
            req.headers = {
                Authorization: `Bearer ${newtoken}`
            }
        }
        // if (authToken) {
        //     req.headers = {
        //         Authorization: `Bearer ${authToken}`
        //     }
        // }

        return Promise.resolve(req)
    })
    requestApi.interceptors.response.use(
        (response) => {
            const { data } = response
            if (data?.meta?.status === 1) {
                return Promise.resolve(response)
            } else {
                return Promise.reject({
                    status: data?.statusCode,
                    message: data?.meta?.message
                })
            }
        },
        async (error) => {
            if (error?.response?.status === 401) {
                localStorage.removeItem('admin')
                localStorage.removeItem('adminToken')
                await Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: '',
                    text: 'Your session has been expired. please login again'
                }).then(() => {
                    currentUserContext.setCurrentUser(null)
                    // window.location.reload()
                    window.location.replace(home);
                    return true
                })
                return true
            } else {
                const response = {
                    message: 'Something went to wrong.',
                    status: 404
                }
                if (
                    error?.response?.status === 400 ||
                    error?.response?.status === 500
                ) {
                    response.message = error?.response?.data?.message
                    response.status = error?.response?.data?.statusCode
                    return Promise.reject(response)
                }

                if (error?.meta) {
                    response.message = error?.meta?.message
                } else {
                    if (error?.status !== 404 || error?.statusCode !== 404) {
                        if (error?.status || error?.statusCode) {
                            response.message = error?.message
                            response.status = error?.status || error?.statusCode
                        } else {
                        
                            response.message = 'Service Unavailable.'
                            response.status = 503
                        }
                    }
                }

                return Promise.reject(response)
            }
        }
    )

    return children
}

export default requestApi
export { AxiosInterceptor }



// import axios from 'axios'

// const requestApi = axios.create({
//     baseURL: process.env.REACT_APP_API_URL
// })

// requestApi.interceptors.request.use((req) => {
//     const authToken = JSON.parse(localStorage.getItem('authToken'))

//     if (authToken || req?.data?.authToken) {
//         let tokens = req?.data?.authToken ?? ''
//         let newtoken = authToken ?? tokens
//         req.headers = {
//             Authorization: `Bearer ${newtoken}`
//         }
//     }

//     return Promise.resolve(req)
// })
// requestApi.interceptors.response.use(
//     (response) => {
//         const { data } = response
//         if (data?.meta?.status === 1) {
//             return Promise.resolve(data)
//         } else {
//             // store.dispatch({type : "test", payload : "/test"})
//             // history.push("/hello")
//             // window.location.href = "/";
//             let error = {
//                 message: 'Something went Wrong',
//                 statusCode: 500
//             }
//             error.message = data.meta.message
//             error.statusCode = data.statusCode
//             return Promise.reject(error)
//         }
//     },
//     function (error) {
//         if (error?.response?.status === 401) {
//             localStorage.removeItem('admin')
//             localStorage.removeItem('authToken')
//         } else {
//             return Promise.reject(error?.response?.data)
//         }
//     }
// )

// export default requestApi
