<template>
  <el-drawer v-model="showDrawer" title="" :size="size" :destroy-on-close="destroyOnClose" :close-on-click-modal="closeOnClickModal" class="min-w-[480px] max-w-[900px] opacity-94 bg-light-50 z-[9999]">
     <div class="formDrawer">
       <span class="text-3xl text-left block mt-4 mb-4 font-bold text-indigo-500">{{title}}</span>
        <div class="body">
            <slot></slot>
        </div>
        <div class="button">
             <el-button type="primary" @click="onSubmit" :loading="loading" round class="bg-indigo-500 w-[120px] h-[40px] text-white text-lg"> {{confirmButtonText}}</el-button>
             <el-button type="danger" @click="closeDrawer" :loading="loading" round class="w-[120px] h-[40px] text-white text-lg"> {{cancelButtonText}}</el-button>
    </div>
     </div>
  </el-drawer>
</template>
<script setup>
import { ref } from 'vue'
const loading = ref(false)
const showLoading =()=>{
  loading.value = true
}
const hideLoading = () => {
  loading.value = false
}
const showDrawer = ref(false)
const openDrawer = () => {
  showDrawer.value = true
}
const closeDrawer = () => {
  showDrawer.value = false
}
const emit=defineEmits(['submit'])
const onSubmit = () => {
  emit('submit')
}
const props=defineProps({
    title: {
        type: String,
        default: ' '
    },
    size: {
        type: String,
        default: '45%'
    },
    closeOnClickModal: {
        type: Boolean,
        default: false
    },
    destroyOnClose: {
        type: Boolean,
        default: false
    },
    confirmButtonText: {
        type: String,
        default: '确定'
    }
    ,
    cancelButtonText: {
        type: String,
        default: '取消'
    }
})
defineExpose({
  openDrawer,
  closeDrawer,
  showLoading,
  hideLoading,
})
</script>
<style scoped>
 
.formDrawer{
  width: 100%;
  height: 100%;
 
  @apply   p-8 rounded-lg;
}
.formDrawer .body{
    @apply flex flex-col justify-start items-start text-blue-gray-900;
}
.formDrawer .button{
    position: absolute;
    bottom: 30px;
    @apply flex justify-center items-center mt-8;
}
</style>