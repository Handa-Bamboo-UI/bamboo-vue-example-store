import axios from '../axios/axios'
export function getImageList(id:number,page :number){
    return axios.get(`/admin/image_class/${id}/image/${page}`)
}
export function upadateImage(id:number,name :string){
    return axios.post(`/admin/image/${id}`,{name})
}

export function deleteImage(ids:any){
        return axios.post(`/admin/image/delete_all`,{ids})
}
export const uploadImageAction="/api/admin/image/upload"