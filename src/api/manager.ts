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
export default login
export { login,getInfo,logout,changePassword }
