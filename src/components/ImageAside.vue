
<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
                <div class="top">
                    <AsideList @click="handleChangeActiveId(item.id)" @edit="handleEdit(item)" @delete="handleDelete(item)" v-for="(item ,index) in list" :key="index" :active="item.id == activeId" >
                        {{item.name}}
                    </AsideList>
                </div>
                <div class="bottom">
                    <el-pagination
                        background
                        layout="prev, next"
                        :total="total"
                        :page-size="limit"
                        :current-page="currentPage"
                        @current-change="getData"

                    />
                </div>
            </el-aside>
            <FormDrawer FormDrawer :title="drawerTitle" ref="formDrawer" @submit ="handleSubmit" >
                        <el-form :model="form" ref="formRef" :rules="rules" style="width: 100%;" >
                            <el-form-item label="分类名称" prop="name">
                                <el-input placeholder="请输入分类名称" v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="排序" prop="order">
                                <el-input-number placeholder="请输入排序" v-model="form.order" controls-position="right" :min="0" :max="100" :step="1"></el-input-number>
                            </el-form-item>
                        </el-form>
            </FormDrawer>
</template>
<script setup lang="ts">
import { reactive, ref,computed } from 'vue'
import { toast } from '@/composables/util'
import { 
    createImageClassList,
    updateImageClassList,
    deleteImageClassList
} from "@/api/image_class";
import AsideList from "@/components/AsideList.vue";
import { getImageClassList } from "@/api/image_class";
import FormDrawer from "@/components/FormDrawer.vue"
const emit=defineEmits(['changeActiveId'])
function handleChangeActiveId(id:number){
    activeId.value=id
    emit('changeActiveId',id)
}

const form = reactive({
    name: '',
    order: 1
})
const editId=ref(0)
const drawerTitle=computed(()=>{
    return editId.value? '编辑分类':'添加分类'
})
const formRef = ref<ElForm>()
const handleCreate = () => {
    formDrawer.value?.openDrawer()
    form.name = ''
    form.order = 1
    editId.value=0
}
const handleSubmit = () => {
    formRef.value?.validate((valid) => {
        if (valid) {
            formDrawer.value?.showLoading()
            let api=editId.value? updateImageClassList(editId.value,form):createImageClassList(form)
           api.then(res => {
                toast(editId.value? '编辑成功':'添加成功')  
                formDrawer.value?.closeDrawer()
                getData()
           }).finally(() => {
            formDrawer.value?.hideLoading()
           })
        } else {
            console.log('form not valid')
            return
        }
    })
}
const handleEdit = (item:any) => {
    formDrawer.value?.openDrawer()
    editId.value=item.id
    form.name = item.name
    form.order = item.order
    console.log(item)
}
const handleDelete = (item:any) => {
    loading.value = true
    deleteImageClassList(item.id).then(res => {
        toast('删除成功')
        getData()
    })
    .finally(() => {
        loading.value = false
    })
}
const rules = reactive({
    name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' }
    ]
})

const formDrawer = ref<FormDrawer>()

const loading = ref(false)
const list = ref([])
const activeId = ref(0)
 
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
function getData(page:number=currentPage.value){
    if(typeof page==='number'){
        currentPage.value=page
    }
    loading.value = true
    getImageClassList(currentPage.value).then(res => {
        list.value = res.list
        total.value = res.totalCount
        let item:any=list.value[0]
        if(item){
            handleChangeActiveId(item.id)
        }
    }).finally(() => {
        loading.value = false
    })
}
getData()
defineExpose({
    handleCreate,
    handleSubmit,
    getData
})
</script>

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