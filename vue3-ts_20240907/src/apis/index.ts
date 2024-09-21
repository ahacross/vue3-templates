import type {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import axios from 'axios'

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

axios.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config
})

axios.interceptors.response.use(
  async (res: AxiosResponse): Promise<any> => {
    const { status } = res
    return status >= 200 && status < 300 ? res.data : res
  },
  (error: AxiosError): Promise<never> => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

const runRequest =
  <T = any>(method: Method) =>
  (url: string, data?: any, options: AxiosRequestConfig = {}): Promise<T> =>
    axios
      .request<T>({
        [method.toLowerCase() === 'get' ? 'params' : 'data']: data,
        url,
        method,
        ...options
      } as AxiosRequestConfig)
      .then((response) => response as unknown as T)

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
    try {
      const response = await runRequest<Blob>(method)(url, data, {
        responseType: 'blob'
      })
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `${(fileNm === '' ? new Date().toISOString() : fileNm) + ext}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)

      return blob
    } catch (error) {
      console.error('Download Error:', error)
      return undefined
    }
  }
}
