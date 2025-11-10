<script setup lang="ts">
import AsideList from "@/components/AsideList.vue";
import { getImageClassList } from "@/api/image_class";
import { ref } from 'vue'
const loading = ref(false)
const list = ref([])
const activeId = ref(0)
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
function getData(){
    loading.value = true
    getImageClassList(currentPage.value).then(res => {
        list.value = res.list
        total.value = res.totalCount
        let item=list.value[0]
        if(item){
            activeId.value=item.id
        }
    }).finally(() => {
        loading.value = false
    })
}
getData()

</script>

<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
                <div class="top">
                    <AsideList v-for="(item,index) in list" :key="index" :active="index == activeId" @edit="edit" @delete="delete">
                        {{item.name}}
                    </AsideList>
                </div>
                <div class="bottom">
                    <el-pagination
                        background
                        layout="prev, next"
                        :total="total"
                        :page-size="limit"
                        :current-page.sync="currentPage"
                        @current-change="getData"
                    />
                </div>
            </el-aside>
</template>
<style scoped>
.image-aside {
    background-color: #f5f7fa;
    border-right: 1px solid #e4e7ed;
    position: relative;
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
    display: none;
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