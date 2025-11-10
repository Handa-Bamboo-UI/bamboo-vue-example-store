<template>
    <div class="flex f-header">
        <span class="logo gap-3">
            <el-icon size="25">
                <Discount />
            </el-icon>
            HandaQAQ
        </span>

        <el-tooltip class="item" effect="dark" content="切换侧边栏" placement="bottom">
            <el-icon class="icon-btn" size="25"  @click="$store.commit('handleAsideWidth')">
                <fold v-if="$store.state.asideWidth=='250px'" />
                <expand v-else />
            </el-icon>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="刷新页面" placement="bottom">
            <el-icon class="icon-btn" size="25" @click="handleRefreshPage">
                <refresh />
            </el-icon>
        </el-tooltip>
        <div class="ml-auto flex items-center ">
            <el-tooltip class="item" effect="dark" content="全屏显示" placement="bottom">
                <el-icon class="icon-btn" size="25" @click="toggle"><full-screen v-if="!isFullscreen" />
                    <Minus v-else />
                </el-icon>
            </el-tooltip>
            <el-dropdown class="drop-btn" @command="handleCommand">
                <span class="el-dropdown-link flex items-center gap-2 text-base font-bold">
                    <el-avatar :size="30" :src="$store.state.user.avatar" alt="用户头像"></el-avatar>
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>

                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <form-drawer ref="formDrawerRef" @submit="onSubmit">
                <span class="text-3xl text-center block mt-4 mb-4 font-bold text-indigo-500">修改密码</span>
                <span class="text-xl text-center block text-gray-500">请输入旧密码以验证您的身份</span>
                <br></br>
                <el-form ref="formRef" :model="form" :rules="rules" label-width="120px"
                    class="mt-6 flex flex-col mx-auto">
                    <!-- 旧密码 -->
                    <el-form-item label="旧密码" prop="oldPassword" class="mb-5">
                        <el-input v-model="form.oldPassword" type="password" placeholder="请输入旧密码" show-password
                            clearable class="rounded-lg" />
                    </el-form-item>

                    <!-- 新密码 -->
                    <el-form-item label="新密码" prop="newPassword" class="mb-5">
                        <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码" show-password
                            clearable class="rounded-lg" />
                    </el-form-item>

                    <!-- 确认新密码 -->
                    <el-form-item label="确认新密码" prop="confirmPassword" class="mb-5">
                        <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入新密码" show-password
                            clearable class="rounded-lg" />
                    </el-form-item>
                </el-form>

            </form-drawer>
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue'
import { showModel, toast } from "@/composables/util"
import FormDrawer from "@/components/FormDrawer.vue"
import { logout } from "@/api/manager"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
import { useChangePassword ,useLogout} from "@/composables/useManager"
const {  formDrawerRef,
    formRef,
    form,
    rules,
    onSubmit,
    openChangePasswordDrawer,
} = useChangePassword()
const {handleLogout} = useLogout()
const drawerVisible = ref(false)
const loading = ref(false)



function handleRefreshPage() {
    window.location.reload()
}
const store = useStore()
const handleCommand = (command: string) => {
    switch (command) {
        case 'logout':
            handleLogout()
            break
        case 'changePassword':
            openChangePasswordDrawer()
            break

        default:
            break
    }
}

</script>
<style scoped>
*{
    user-select: none;
}
.f-header {
    @apply flex h-16 px-4 fixed top-0 left-0 right-0 text-white;
    background-image: linear-gradient(to right, #8385f2, #7a65f1);
    align-items: center;
    height: 64px;
}

.logo {
    width: 200px;
    @apply flex justify-center items-center text-xl font-bold;
}

.icon-btn {
    @apply flex justify-center items-center w-10 h-10 rounded-md text-black;
    width: 42px;
    height: 42px;
    color: #fff;
    cursor: pointer;
}

.icon-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.drop-btn {
    height: 42px;
    cursor: pointer;
    width: 100px;
    @apply flex justify-center items-center rounded-md text-white mx-5;
    align-items: center;
}
</style>
