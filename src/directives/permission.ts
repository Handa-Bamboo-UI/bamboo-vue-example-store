import type { App } from "vue"
function hasPermission(){
    
}
export default {
    install(app: App) {
        app.directive('permission', {
           mounted(el,binding){
            binding.value.some((item: string) => {
                const [permission, method] = item.split(',')
                return checkPermission(permission, method)
            })
        }
        })
    }
}
