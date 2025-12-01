import axios from '../axios/axios'
export function getImageClassList(page :number){
    return axios.get('/admin/image_class/'+page)
}
export function createImageClassList(data:any){
    return axios.post('/admin/image_class',data)
}
export function updateImageClassList(id:number,data:any){
    return axios.post('/admin/image_class/'+id,data)
}
export function deleteImageClassList(id:number){
    return axios.post(`/admin/image_class/${id}/delete`)
}
