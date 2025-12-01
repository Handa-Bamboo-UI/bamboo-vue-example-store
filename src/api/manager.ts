/* 管理员接口 */
import axios from '../axios/axios'

function login(data: { username: string, password: string }) {
return axios.post('/admin/login',{
    username: data.username,
    password: data.password
})
}
function getInfo(){
    return axios.post('/admin/getInfo')
}
function logout(){
    return axios.post('/admin/logout')
}
function changePassword(data: any) {
    return axios.post('/admin/updatepassword',data)
}
function getManagerList(page: number,query :any) {
    let q=[]
    for (const key in query) {
        if(query[key]){
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r =q.join('&')
    r=r?('?'+r):''
    return axios.get(`/admin/manager/${page}${r}`)
}

  function updateManagerStatus(id,status){
    return axios.post(`/admin/manager/${id}/update_status`,{
        status
    })
}


  function createManager(data){
    return axios.post(`/admin/manager`,data)
}

  function updateManager(id,data){
    return axios.post(`/admin/manager/${id}`,data)
}

  function deleteManager(id){
    return axios.post(`/admin/manager/${id}/delete`)
}
export default login
export { login,getInfo,logout,changePassword,getManagerList,updateManagerStatus,createManager,updateManager,deleteManager }

