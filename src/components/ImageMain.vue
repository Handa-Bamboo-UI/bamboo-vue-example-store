<template>
    <el-main class="image-main">
                <div class="top">
                    <el-menu class="image-menu">
                        <el-menu-item v-for="item in 40" :index="item">{{ item }}</el-menu-item>
                    </el-menu>
                </div>
                <div class="bottom">
                    <el-button type="primary" size="small">新增图片</el-button>
                </div>
            </el-main>
</template>
<style scoped>
.image-main {
    position: relative;
    height: 100%;
    overflow: scroll;
}

.image-main {
    position: relative;
    height: 100%;
    overflow: scroll;
}

.top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    border: 1px solid #e4e7ed;
    overflow: scroll;
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border: none !important;

}

::-webkit-scrollbar-corner {
    display: none;
}

::-webkit-scrollbar-track {
    border-right-color: transparent !important;
    border-left-color: transparent !important;
    background-color: #f5f7fa00;
}

::-webkit-scrollbar-thumb {
    background-color: #b9b8ff;
    border-right-color: transparent !important;
    border-left-color: transparent !important;
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #c0bfff;
}

.bottom {
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
    @apply flex items-center justify-center;
}
</style>