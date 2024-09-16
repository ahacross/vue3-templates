import type {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import axios from 'axios'

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

axios.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config
})

axios.interceptors.response.use(
  async (res: AxiosResponse): Promise<any> => {
    return [200].includes(res.status) ? res.data : res
  },
  (error: AxiosError): Promise<null> => {
    console.error(error)
    return Promise.reject(null)
  }
)

const runRequest =
  (method: Method) =>
  (url: string, data?: any, options: AxiosRequestConfig = {}): Promise<any> =>
    axios.request({
      [method.toLowerCase() === 'get' ? 'params' : 'data']: data,
      url,
      method,
      ...options
    })

export default {
  get: runRequest('get'),
  post: runRequest('post'),
  put: runRequest('put'),
  patch: runRequest('patch'),
  delete: runRequest('delete'),
  downloadExcel: async (
    method: Method,
    url: string,
    data: any,
    fileNm: string = '',
    ext: string = '.xlsx'
  ) => {
    const res = await runRequest(method)(url, data, { responseType: 'blob' })
    if ([200, 204].includes(res.status)) {
      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${(fileNm === '' ? new Date().toISOString() : fileNm) + ext}`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return blob
    }
  }
}
