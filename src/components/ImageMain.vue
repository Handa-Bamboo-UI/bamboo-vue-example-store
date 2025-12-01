<template>
    <el-main class="image-main" v-loading="loading">
        <div class="top">
            <el-row :gutter="20">
                <el-col :span="4" :offset="0" v-for="(item, index) in list" :key="index">
                    <el-card class="home-card" :class="{'checked':item.checked}">
                        <el-image :src="item.url" fit="cover" class="h-[150px] home-image"
                            :preview-src-list="[item.url]" style="width: 100%"></el-image>
                        <div>{{ item.name }}</div>
                        <div class="flex items-center justify-center p-2">
                            <el-checkbox v-if="openChoose" v-model="item.checked" class="mr-2" @change="handleChangeChecked(item)"></el-checkbox>
                            <el-button size="small" text @click="handleEdit(item)">重命名</el-button>
                            <el-popconfirm title="确定删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                                class="ml-auto px-1" @confirm="handleDelete(item.id)">
                                <template #reference>
                                    <el-button size="small" text>删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="bottom">
            <el-pagination background layout="prev,pager, next" :total="total" :page-size="limit"
                :current-page="currentPage" @current-change="getData" />
        </div>
    </el-main>
    <el-drawer v-model="drawer" title="上传图片">
        <upload-file :data="{ image_class_id}" @success="handleUploadSucess"></upload-file>
    </el-drawer>
</template>
<script setup lang="ts">
import { ref,computed,defineProps } from "vue";
import { getImageList } from "@/api/image";
import { showPrompt, toast } from "@/composables/util";
import { deleteImage, upadateImage } from "../api/image";
import UploadFile from "./UploadFile.vue";
const total = ref(0);
const loading = ref(false);
const list = ref([]);
const image_class_id = ref(1);
const currentPage = ref(1);
const drawer =ref(false)
const openUploadFile =()=>drawer.value =true
const getData = (page: number) => {
    currentPage.value = page;
    loading.value = true;
    getImageList(image_class_id.value, currentPage.value)
        .then((res) => {
            total.value = res.totalCount;
            list.value = res.list.map(item=>({
                ...item,
                checked:false
            }));
        })
        .finally(() => {
            loading.value = false;
        });
};
const loadData = (id: number) => {
    console.log(id);
    currentPage.value = 1;
    image_class_id.value = id;
    getData(currentPage.value);
};
const handleEdit = (item: any) => {
    loading.value = true;
    showPrompt("重命名", item.name)
        .then(({ value }) => {
            upadateImage(item.id, value)
                .then(res => {
                    toast("修改成功");
                    getData(currentPage.value);
                })
                .finally(() => {
                    loading.value = false;
                });
        })
        .catch(() => {
            loading.value = false;
        });
}
const handleDelete = (id: any) => {
    loading.value = true
    deleteImage([id]).then(res => {
        toast("刪除成功")
        getData(currentPage.value)
    })
        .finally(() => {
            loading.value = false
        })
}
const handleUploadSucess=()=>getData(1)
const emit = defineEmits(["choose"])
 
const checkedImage=computed(()=>{
    return list.value.filter(item=>item.checked)
})
const handleChangeChecked=(item:any)=>{
    if(item.checked && checkedImage.value.length>props.limit){
        item.checked=false
        toast("最多只能选择"+props.limit+"个图片")
        return 
    } 
      emit("choose",checkedImage.value)
}
defineExpose({
    loadData,
    openUploadFile
});
const props=defineProps({
    openChoose:{
        type: Boolean,
        default:false
    },
    limit:{
        type: Number,
        default:1
    }
})
</script>
<style scoped>
.image-main {
    position: relative;
    height: 100%;
}

.image-main {
    position: relative;
    height: 100%;
    overflow: scroll;
}

.home-card {
    border-radius: 29px;
    background-color: #f4f7ff;
    border: solid 1px #b5b5b53a;
    margin-bottom: 20px;
    box-shadow: 0px 0px 20px 0px rgba(70, 54, 115, 0.08) !important;
}
.checked{
    background-color: #e0e0ff;
}

.home-image {
    border-radius: 18px;
}
:deep(.is-checked .el-checkbox__inner){
    background-color: #8181f7 !important;
    border-color: #9191f0 !important;
    border-radius: 5px;
    scale: 1.2;
}
:deep(.el-checkbox__inner){
    border-radius: 5px;
    scale: 1.2;
}

.top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    border: none;
    overflow-x: hidden;
    overflow-y: scroll;
    margin: 10px;
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
