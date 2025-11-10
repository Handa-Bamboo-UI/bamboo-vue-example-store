<template>
    <div class="f-menu " :style="{width: $store.state.asideWidth}"  >
        <el-menu
            :collapse="isCollapse"
            :default-active="defaultActive"
            @select="handleSelect"
            :collapse-transition="false"
            :unique-opened="true"
        >
        <template v-for="item in asideMenu" :key="item.name">
            <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                <template #title>
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for="item2 in item.child" :key="item2.name" :index="item2.frontpath">
                       <el-icon>
                        <component :is="item2.icon"></component>
                    </el-icon>
                    {{item2.name}}
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="item.frontpath">
               <el-icon>
                    <component :is="item.icon"></component>
               </el-icon>
               <span>{{item.name}}</span>
            </el-menu-item>
        </template>
        </el-menu>  
         
    </div>
</template>
<style scoped>
.f-menu {
    padding: 40px 0;
    width: 250px;
    height: 100%;
    background-image: linear-gradient(140deg, #eeeeff 0%, #eaf1ff 100%);
    overflow: scroll;
    @apply shadow-md fixed top-64px bottom-0 left-0;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.f-menu::-webkit-scrollbar {
     display: none;
}   
.el-menu-item.is-active{
    background-color: #757ce763 ;
    color: #ffffff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.el-menu{
    @apply bg-transparent;
}
.el-sub-menu__title i,
.el-sub-menu__title span{
    font-weight: bold;
    color: #7a75c7;
    @apply text-lg;
}

.el-menu-item{
    font-weight: bold;
    color: #a39fdd;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.el-menu-item:hover{
    scale: 1.1;
    background-color: #757ce763 ;
    color: #ffffff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
<script setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {computed} from 'vue'
const store = useStore()

const router = useRouter()
 const asideMenu = computed(() => {
    return store.state.menus
 })
const handleSelect = (index) => {
 
    router.push(index)
}
const isCollapse = computed(() => {
    return store.state.asideWidth == "64px"
})
const  defaultActive = computed(() => {
    return router.currentRoute.value.path
})
console.log(asideMenu.value)
</script>