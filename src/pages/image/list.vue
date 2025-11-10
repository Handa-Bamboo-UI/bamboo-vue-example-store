<template>
    <el-container class="bg-gray-100 rounded-md " style="height:calc(100vh - 119px);padding: 0;">
        <el-header class="image-header">
            <el-menu>
                <el-menu-item index="1">图片列表</el-menu-item>
            </el-menu>
        </el-header>
        <el-container style="height:calc(100vh - 169px);padding: 0;">
            <ImageAside />
            <ImageMain />
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
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";
</script>