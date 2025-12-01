<template>
    <div>
        <el-card>
            <ListHeader @create="handleCreate" @refresh="getData" />
            <el-tree :data="tableData" :props="{ label: 'name', children: 'child' }" v-loading="loading" node-key="id"
                style="height: 75vh;overflow-X: hidden;overflow-Y: scroll;"
                >
                <template #default="{ node, data }">
                    <div class="flex items-center justify-between w-full">
                              <el-icon v-if="data.icon" :size="16" class="ml-2">
                            <component :is="data.icon" />
                        </el-icon>
                        <span class="ml-2">{{ data.name }}</span>
                        <div class="ml-auto">
                            <el-button class="ml-2" size="small" @click.stop="openGoodsDrawer(data)">推荐商品</el-button>
                            <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0" @change="handleStatusChange($event,data)" class="ml-2" />
                            <el-button class="ml-2" size="small">修改</el-button>
                              <el-popconfirm title="确认删除吗？" @confirm="handleDelete(data.id)" >
                                <template #reference>
                                    <el-button class="ml-2" type="danger" size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </div>
                </template>
            </el-tree>
            <FormDrawer ref="formDrawerRef"  @submit="handleSubmit" >
            <el-form :model="form" ref="formRef" :rules="rules" style="width: 100%;" :inline="false">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="form.name" style="width: 100%;" placeholder="名称"></el-input>
                </el-form-item>
            </el-form>
            </FormDrawer>
        </el-card>
        <GoodsDrawer ref="goodsDrawerRef"  />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import ListHeader from "@/components/ListHeader.vue";
import { getCategoryList,createCategory, updateCategory, deleteCategory ,updateCategoryStatus,getCategoryGoods,deleteCategoryGoods,connectCategoryGoods} from "@/api/category"
import { useInitTable, useInitForm } from "@/composables/useCommon"
import FormDrawer from "@/components/FormDrawer.vue";
import GoodsDrawer from "./components/GoodsDrawer.vue";
const goodsDrawerRef = ref()
const {
    loading,
    tableData,
    getData,
    handleStatusChange,
    handleDelete,
} = useInitTable({
    getList: getCategoryList,
    onGetListSuccess: (res) => {
        tableData.value = res
        console.log(tableData.value)
    },
    delete: deleteCategory,
    updateStatus: updateCategoryStatus, 
})
const {
    formDrawerRef,
    formRef,
    form,
    rules,
    editId,
    drawerTitle,
    handleSubmit,
    resetForm,
    handleCreate,
    handleEdit
} = useInitForm({
    form: {
        name: "",
    },
    rules: {

    },
    getData,
    update: updateCategory,
    create: createCategory,
})
const addChild = (id : any) => {
    handleCreate()
    form.rule_id = id  
    console.log(form.rule_id)
    form.status=1
}
const openGoodsDrawer = (id : any) => {
    goodsDrawerRef.value?.openGoodsDrawer(id)
}
</script>
<style>
.el-switch.is-checked .el-switch__core {
    background-color: #7D71F1 !important;
    border-color: #7D71F1 !important;
}

.el-tree-node__content {
    height: 40px !important;
}

.el-tag.el-tag--primary {
    background-color: rgb(181, 171, 255) !important;
    color: #ffffff !important;
}
</style>
