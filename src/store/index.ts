import { createStore } from 'vuex'
import login, { getInfo } from '../api/manager'
import { setToken,removeToken } from '@/composables/auth'
const store = createStore({
    state(){
        return{
           user:{
           },
           //侧边栏菜单
           asideWidth:"250px",
           menus:[],
           ruleNames:[]
        }
    },
    mutations:{
        //记录用户信息
       SET_USERINFO(state:any,user:any){
        state.user= user
       },
       handleAsideWidth(state:any){
        state.asideWidth= state.asideWidth=="250px"?"64px":"250px"
       },
       SET_MENUS(state:any,menus:any){
        state.menus= menus
       },
       SET_RULE_NAMES(state:any,ruleNames:any){
        state.ruleNames= ruleNames
       }
    },
    actions:{
        //登录
         login({commit}:any,data:any){
            return new Promise((resolve,reject)=>{
                login(data).then((res:any)=>{
                    setToken(res.token)
                    resolve(res)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
         },
        //获取用户信息
         async getinfo({commit}:any){
            return new Promise((resolve,reject)=>{
                getInfo().then((res:any)=>{
                    console.log(res)
                    commit('SET_USERINFO',res)
                    commit('SET_MENUS',res.menus)
                    commit('SET_RULE_NAMES',res.ruleNames)
                    resolve(res)
                }).catch((err:any)=>{
                    reject(err)
                })
            })
        },
        //退出登录
        logout({commit}:any){
            
             removeToken()
             commit('SET_USERINFO',{})
        }
    }
})
export default store 