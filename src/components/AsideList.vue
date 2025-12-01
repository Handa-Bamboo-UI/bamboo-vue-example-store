template
<template>
    <div class="aside-list" :class="{ 'active': active }">
        <span class="text-lg font-bold text-gray-500 truncate">
            <slot></slot>
        </span>
        <el-button @click.stop="$emit('edit')" text size="small" class="ml-auto px-1">
            <el-icon class="mr-2">
                <Edit />
            </el-icon>
        </el-button>
        <el-popconfirm
            title="确定删除吗？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            class="ml-auto px-1"
            @confirm.stop="$emit('delete')"
        >
        <template #reference>
            <el-button text size="small" class="ml-auto px-1 "   >
                <el-icon class="mr-2">
                    <Close />
                </el-icon></el-button>
        </template>
        </el-popconfirm>
    </div>
</template>
<script setup lang="ts">
defineProps({
    active: {
        type: Boolean,
        default: false
    }

})
defineEmits(['edit', 'delete'])
</script>
<style scoped>
.aside-list {
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
    @apply flex items-center justify-between;
    transition: all 0.3s ease-in-out;
}

.aside-list.active {
    background-color: #cacaff;
    transition: all 0.3s ease-in-out;
}

.aside-list.active span {
    color: #ffffff;
}

.aside-list:hover {
    background-color: #e7e7ff;
    transition: all 0.3s ease-in-out;
}
</style>