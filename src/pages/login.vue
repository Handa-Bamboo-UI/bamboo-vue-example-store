<template>
    <el-row class="login-container">
        <el-col :lg="14" :md="12" class="left">
            <div>
                <div>欢迎光临</div>
                <br></br>
                <div>云山在线商城</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="title">欢迎回来</h2>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon><user /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon><lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round color="#626aef" class="w-[250px] h-[40px]" type="primary" @click="onSubmit" :loading="loading">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref,reactive,onMounted,onBeforeUnmount } from 'vue'
import { User,Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { setToken } from '@/composables/auth'
import { toast } from '@/composables/util'
const store = useStore()
const router = useRouter()
 
const form = reactive({
  username:"",
  password:""
})

const rules = {
    username:[
        { 
            required: true, 
            message: '用户名不能为空', 
            trigger: 'blur' 
        },
    ],
    password:[
        { 
            required: true, 
            message: '密码不能为空', 
            trigger: 'blur' 
        },
    ]
}

const formRef = ref(null)
const loading = ref(false)
const onSubmit = () => {
    loading.value = true
    formRef.value.validate((valid)=>{
        if(!valid){
            return false
        }
        store.dispatch('login',form)
        .then(res=>{
        
            toast('登录成功,3秒后跳转','欢迎回来','success')
            setTimeout(()=>{
                router.push({name:"admin"})
            },1000)
        })
        .finally(()=>{
            loading.value = false
        })
        .catch(err=>{
            toast('登录失败','error')
            loading.value = false
        })
    })
}


function onKeyUp(e){
    if(e.key == "Enter") onSubmit()
}


onMounted(()=>{
    document.addEventListener("keyup",onKeyUp)
})
//卸载事件
onBeforeUnmount(()=>{
    document.removeEventListener("keyup",onKeyUp)
})

</script>

<style scoped>
.login-container{
    @apply min-h-screen bg-indigo-500;
}
.login-container .left,.login-container .right{
    @apply flex items-center justify-center;
}
.login-container .right{
    @apply bg-light-50 flex-col opacity-90;
}
.login-container .left{
    background: linear-gradient(155deg, #4394ff 0%, #9362ef 100%);

}

.left div{
    @apply font-bold text-5xl text-light-50 mb-4 ;
    animation: moveLeft 1s ease-in-out forwards;
}
@keyframes moveLeft {
    0%{
        transform: translateX(-10px);
        opacity: 0;
    }
    1000% {
        transform: translateX(0px);
        opacity: 1;
    }
}
@keyframes moveUpDown {
    0%{
        transform: translateY(-10px);
        opacity: 0;
    }
    1000% {
        transform: translateY(0px);
        opacity: 1;
    }
}
.right .title{
    @apply font-bold text-3xl text-gray-800;
}
.right *{
    animation: moveUpDown 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    animation-delay: 0s;
}
.right>div{
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .line{
    @apply h-[1px] w-16 bg-gray-200;
}
</style>