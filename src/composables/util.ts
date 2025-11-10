import { ElNotification ,ElMessageBox } from 'element-plus'
import NProgress from 'nprogress'

export function toast(title:string='提示',message:string,type:string='info'){
    ElNotification({
        title,
        type,
        message
    })
}
export function showModel(content:string='确定执行此操作吗？',title:string='提示',type:string='warning'){
    return ElMessageBox.confirm(content,title,{
       content,
       title,
       confirmButtonText:"确定",
       cancelButtonText:"取消",
       type
    })
}

//显示全屏Loading
export function showLoading(){
    NProgress.start()
}
//隐藏全屏Loading
export function hideLoading(){
    NProgress.done()
}
