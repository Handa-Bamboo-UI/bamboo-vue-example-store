import { addRoutes, router } from './index'
import {getToken} from '@/composables/auth'
import {toast,showLoading,hideLoading} from '@/composables/util'

import store from '@/store'
let hasGetInfo = false
router.beforeEach(async (to,from,next)=>{
    const token = getToken()
    showLoading()
    if(!token && to.name != 'login'){
        toast('请先登录')
        return next({name:'login'})
    }
    if(token && to.name === 'login'){
        toast('您已登录，无需重复登录')
        return next({path:from.path?from.path:'/'})
    }
    let hasNewRoute = false
    if(token && !hasGetInfo){
      let {menus} = await store.dispatch('getinfo')
       //动态添加路由
       if(menus && menus.length > 0){
        hasNewRoute = addRoutes(menus)
       }
    }
    let title =(to.meta.title ? to.meta.title+' - 商城系统' : '商城系统')
    
    document.title = title
    hasNewRoute ? next(to.fullPath) : next()
})
router.afterEach(()=>{
    hideLoading()
})
