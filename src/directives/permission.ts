import type { App } from "vue"
import store from '@/store'
function hasPermission(value : string[],el : HTMLElement){
    if(!Array.isArray(value)){
        throw new Error(`请设置操作权限标签！例如v-permission="['admin,read']"`)
    }
    const hasAuth = value.findIndex((v=>store.state.ruleNames.includes(v))) !== -1
    if(el && !hasAuth){
        el.parentNode && el.parentNode.removeChild(el)
    }
    return hasAuth
}
export default {
    install(app: App) {
        app.directive('permission', {
           mounted(el,binding){
           hasPermission(binding.value,el)
        }
        })
    }
}
