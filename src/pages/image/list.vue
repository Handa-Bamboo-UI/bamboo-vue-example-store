<template>
    <el-container class="bg-gray-100 rounded-md " style="height:calc(100vh - 119px);padding: 0;">
        <el-header class="image-header">
            <el-button type="primary" size="normal" @click="handleCreate" round>新增图片分类</el-button>
            <el-button type="primary" size="normal" @click="handleOpenUpload" round>新增图片</el-button>
        </el-header>
        <el-container style="height:calc(100vh - 169px);padding: 0;">
            <ImageAside ref="imageAsideRef" @changeActiveId="handleChangeActiveId" />
            <ImageMain ref="ImageMainRef" />
        </el-container>
    </el-container>
</template>
<style scoped>
.image-header {
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    @apply flex items-center justify-between;
}



</style>
<script setup lang="ts">
import { ref } from "vue";
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";
const imageAsideRef = ref<ImageAside>(null);
const ImageMainRef = ref<ImageMain>(null);
const handleCreate = () => {
    imageAsideRef.value?.handleCreate();
}
const handleOpenUpload = () =>ImageMainRef.value.openUploadFile()
const handleChangeActiveId = (id: number) => {
    ImageMainRef.value?.loadData(id)
}
</script>