// import axios from 'axios'
// import { signin } from '../Routes/routingConsts'

// const authToken = JSON.parse(localStorage.getItem('adminToken'))
// const params = ""

// const requestApi = axios.create({
//     baseURL: process.env.REACT_APP_API_URL
// })

// if (authToken) {
//     requestApi.defaults.headers = {
//         Authorization: `Bearer ${authToken}`
//     }
// }


// requestApi.interceptors.request.use((req) => {
    
//     console.log(req, "request")       

//     const authToken = JSON.parse(localStorage.getItem('adminToken'))
//     if (authToken) {
//         req.headers = {
//             Authorization: `Bearer ${authToken}`
//         } 
//     }
//     return Promise.resolve(req)
// })

// requestApi.interceptors.response.use(
//     (response) => {
//         const { data } = response
//         if (data?.meta?.status === 1) {
//             return Promise.resolve(response)
//         } else {
//             return Promise.reject({
//                 status: data?.statusCode,
//                 message: data?.meta?.message
//             })
//         }
//     },
//     async (error) => {
//         if (
//             error?.response?.status === 401 ||
//             error?.response?.status === 402
//         ) {
//             // remove localstorage and logout user
//         } else {
//             const response = {
//                 message: 'Something went to wrong.',
//                 status: 404
//             }
//             if (error?.meta) {
//                 response.message = error?.meta?.message
//             } else {
//                 if (error?.response?.status !== 404) {
//                     if (error?.response?.status) {
//                         response.message = error?.response?.data?.message
//                         response.status = error?.response?.status
//                     } else {
//                         response.message = 'Service Unavailable.'
//                         response.status = 503
//                     }
//                 }
//             }

//             return Promise.reject(response)
//         }
//     }
// )

// export default requestApi


import axios from "axios";
const requestApi = async (
  method = "get",
  request = "/",
  payload,
  params,
  isToken = false
) => {
  let headers = {};
  const authToken = JSON.parse(localStorage.getItem("adminToken"))
  if (isToken) {
    headers = {
      Authorization: `Bearer ${authToken}`,
    };
  }

  const url = process.env.REACT_APP_API_URL+request;
  const options = {
    method,
    url,
    data: payload !== undefined && payload,
    params: params,
    headers,
  };

  return new Promise((resolve, reject) => {
    axios(options, payload)
      .then((res) => {
        let { data } = res;
        if (data?.meta?.status === 1) {
          resolve(res);
        } else {
          reject(data);
        }
      })
      .catch((error) => {
        if (
          error?.response?.statusCode === 400 ||
          error?.response?.statusCode === 401 ||
          error?.response?.statusCode === 402 ||
          error?.response?.statusCode === 404 
        ) {
          // store.dispatch(logout())
        } else {
          reject(error);
        }
      });
  });
};

export default requestApi;
