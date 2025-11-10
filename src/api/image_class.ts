import axios from '../axios/axios'
export function getImageClassList(page :number){
    return axios.get('/admin/image_class/'+page)
}