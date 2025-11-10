import axios from 'axios'
import {ElNotification} from 'element-plus'
import { useCookies } from '@vueuse/integrations/useCookies'
import { toast } from '@/composables/util'
const service =axios.create({
  baseURL: "/api",
  timeout: 5000
})
 service.interceptors.request.use(
  config => {
    const cookie = useCookies()
    const token = cookie.get('admin-token')
    if(token){
      config.headers['token'] = token
    }
    return config
  }
)
service.interceptors.response.use(
  response => {
    return response.data.data
  },
  error => {
    toast('错误',error.response.data.msg,'error')
    return Promise.reject(error)
  },

)

export default service