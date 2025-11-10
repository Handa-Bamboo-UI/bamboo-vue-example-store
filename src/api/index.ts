/* 管理员接口 */
import axios from '../axios/axios'

 function getStatic(){
    return axios.get('/admin/statistics1')
 }
 function getStatic2(){
    return axios.get('/admin/statistics2')
 }
  function getStatic3(type:string){
    return axios.get('/admin/statistics3?type='+type)
 }
export { getStatic,getStatic2,getStatic3 }
