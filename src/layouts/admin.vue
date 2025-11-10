<template>
    <el-container >
   
        <el-container style="height: 100%;">
            <el-aside :width="$store.state.asideWidth" class="bg-light-50" style="transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);">
            <f-menu></f-menu>
            </el-aside>
            <el-main style="margin-top: 64px; padding: 0;">
                <f-tag-list></f-tag-list>
                <router-view v-slot="{Component}">
                    <transition name="fade"  >
                        <keep-alive :max="10">
                            <component :is="Component"></component>
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
             <el-header style="height: 0;">
          <f-header></f-header>
        </el-header>
    </el-container>
</template>
<script setup>

import FTagList from '@/layouts/components/FTagList.vue'
import FMenu from '@/layouts/components/FMenu.vue'
import FHeader from '@/layouts/components/FHeader.vue'

</script>
<style scoped>
::-webkit-scrollbar {
    display: none;
}
.fade-enter-active, .fade-leave-active {
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    height: 0;
    transform: translateX(100%);
}
</style>