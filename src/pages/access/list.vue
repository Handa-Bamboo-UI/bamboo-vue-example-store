<template>
    <div>
        <el-card>
            <ListHeader @create="handleCreate" @refresh="getData" />
            <el-tree :data="tableData" :props="{ label: 'name', children: 'child' }" v-loading="loading" node-key="id"
                :default-expanded-keys="defaultExpandKeys"
                style="height: 75vh;overflow-X: hidden;overflow-Y: scroll;"
                >
                <template #default="{ node, data }">
                    <div class="flex items-center justify-between w-full">
                        <el-tag size="small" :type="data.menu ? 'primary' : 'info'">{{ data.menu ? '菜单' : '操作' }}</el-tag>
                        <el-icon v-if="data.icon" :size="16" class="ml-2">
                            <component :is="data.icon" />
                        </el-icon>
                        <span class="ml-2">{{ data.name }}</span>
                        <div class="ml-auto">
                            <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0" @change="handleStatusChange($event,data)" />
                            <el-button class="ml-2" size="small">修改</el-button>
                            <el-button class="ml-2" size="small" @click.stop="addChild(data.id)">增加</el-button>
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
                <el-form-item label="上级菜单" prop="rule_id">
                    <el-cascader :model-value="form.rule_id"  
                        :options="options"    
                        :props="{value:'id',label: 'name', children: 'child', checkStrictly: true, emitPath: false }"
                        placeholder="请选择上级菜单" />
                </el-form-item>
                <el-form-item label="菜单/规则" prop="menu">
                    <el-radio-group v-model="form.menu">
                        <el-radio :value="1"  >菜单</el-radio>
                        <el-radio :value="0"  >规则</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" style="width: 30%;" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon" v-if="form.menu == 1">
                    <IconSelect v-model="form.icon" />
                </el-form-item>
                <el-form-item label="前端路由" prop="frontpath" v-if="form.menu == 1 && form.rule_id > 0">
                    <el-input v-model="form.frontpath" placeholder="前端路由"></el-input>
                </el-form-item>
                <el-form-item label="后端规则" prop="condition" v-if="form.menu == 0">
                    <el-input v-model="form.condition" placeholder="后端规则"></el-input>
                </el-form-item>
                <el-form-item label="请求方式" prop="method" v-if="form.menu == 0">
                    <el-select v-model="form.method" class="m-2" placeholder="请选择请求方式">
                        <el-option v-for="item in ['GET', 'POST', 'PUT', 'DELETE']" :key="item" :label="item"
                            :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :min="0" :max="1000" />
                </el-form-item>
            </el-form>
            </FormDrawer>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ListHeader from "@/components/ListHeader.vue";
 
import { getRuleList,createRule, updateRule, deleteRule ,updateRuleStatus} from "@/api/rule"
import { useInitTable, useInitForm } from "@/composables/useCommon"
import FormDrawer from "../../components/FormDrawer.vue";
import IconSelect from "@/components/IconSelect.vue";
const options = ref([])
const defaultExpandKeys = ref([])
const {
    loading,
    tableData,
    getData,
    handleStatusChange,
    handleDelete,
} = useInitTable({
    getList: getRuleList,
    onGetListSuccess: (res) => {
        tableData.value = res.list
        options.value = res.list
        defaultExpandKeys.value = res.list.map(item => item.id)
        console.log(defaultExpandKeys.value)
    },
    delete: deleteRule,
    updateStatus: updateRuleStatus,
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
        rule_id: 0,
        menu: 0,
        name: "",
        condition: "",
        method: "GET",
        status: 1,
        order: 50,
        icon: "",
        frontpath: ""
    },
    rules: {

    },
    getData,
    update: updateRule,
    create: createRule,
})
const addChild = (id : any) => {
    handleCreate()
    form.rule_id = id  
    console.log(form.rule_id)
    form.status=1
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
