import axios from 'axios'

axios.interceptors.request.use((config) => {
  // const accessToken = storeUser.accessToken
  //
  // if (accessToken) {
  //   config.headers.Authorization = `Bearer ${accessToken}`
  // }

  return config
})

// // refresh token 중복 갱신 방지용 소스
// const oneTimeRefresh = async () => {
//   if (storeUser.isRefresh) {
//     await storeUser.isRefresh
//     await delay(10)
//   } else {
//     storeUser.setRefresh(axios.get(`url?refreshToken=${storeUser.refreshToken}`))
//     const res = await storeUser.isRefresh
//     const { accessToken, refreshToken } = res?.data || {}
//     if (accessToken && refreshToken) {
//       storeUser.setTokenInfo({ accessToken, refreshToken })
//     }
//     setTimeout(() => storeUser.setRefresh(null), 5000)
//   }
//
//   return storeUser.accessToken
// }
axios.interceptors.response.use(
  async (res) => {
    // // 실패시 alert
    // alert()
    // //토큰만료시
    // if (res.data.errorCode === '401') {
    //   const accessToken = await oneTimeRefresh()
    //   if (accessToken) {
    //     console.log('url', res.config.url)
    //     res.config.url = url
    //     return axios.request(res.config)
    //   } else {
    //     // refresh API 실패
    //     return res.data
    //   }
    // }
    return res
  },
  (error) => {
    console.error(error)
    return {}
  }
)

const runAxios = (url, method, data, options = {}) => {
  const params = {}
  method.toLowerCase() === 'get' ? (params.params = data) : (params.data = data)

  return axios.request({
    url,
    method,
    ...params,
    ...options
  })
}

export default {
  get: (url, data, options) => runAxios(url, 'get', data, options),
  post: (url, data, options) => runAxios(url, 'post', data, options),
  put: (url, data, options) => runAxios(url, 'put', data, options),
  patch: (url, data, options) => runAxios(url, 'patch', data, options),
  delete: (url, data, options) => runAxios(url, 'delete', data, options),
  excelDown: async (method, url, param, fileNm = '', ext = '.xlsx') => {
    const fileName = (fileNm === '' ? new Date().toISOString() : fileNm) + ext
    const config = { responseType: 'blob' }

    const response = await runAxios(url, method, param, config)
    if ([200, 204].includes(response.status)) {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return blob
    }
  }
}
