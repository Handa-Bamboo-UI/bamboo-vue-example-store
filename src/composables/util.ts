import { ElNotification ,ElMessageBox } from 'element-plus'
import NProgress from 'nprogress'

export function toast(title:string='提示',message:string,type:string='info',dangerouslyUseHTMLString:boolean=true){
    ElNotification({
        title,
        type,
        message,
        dangerouslyUseHTMLString
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

export function showPrompt(tip:string,value:string){
    return ElMessageBox.prompt(tip, '',{ 
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue:value
    })
}
export function queryParams(query:any){
    let q=[]
    for (const key in query) {
        if(query[key]){
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r =q.join('&')
    r=r?('?'+r):''
    return r
}
export function useArrayMoveUp(arr,index){
  swapArray(arr,index,index - 1)
}

 
export function useArrayMoveDown(arr,index){
  swapArray(arr,index,index + 1)
}

function swapArray(arr,index1,index2){
  arr[index1] = arr.splice(index2,1,arr[index1])[0]
  return arr
}
export function cartesianProductOf() {
  return Array.prototype.reduce.call(arguments, function (a, b) {
      var ret = [];
      a.forEach(function (a) {
          b.forEach(function (b) {
              ret.push(a.concat([b]));
          });
      });
      return ret;
  }, [
      []
  ]);
}
