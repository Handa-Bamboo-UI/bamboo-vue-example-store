<template>
    <el-form :model="model" label-width="80px" class="mb-3" size="small">
    <el-row :gutter="20">
        <slot/>

        <template v-if="showSearch">
            <slot name="show" />
        </template>
        <el-col :span="8" :offset="showSearch ? 0 : 8">
            <div class="flex items-center justify-end">
                <el-button type="primary" @click="$emit('search')" size="medium">搜索</el-button>
                <el-button @click="$emit('reset')" size="medium">重置</el-button>
                <el-button type="primary"  size="medium" @click="showSearch = !showSearch" v-if="hasShowSearch">
                    <span v-if="showSearch">收起</span>
                    <span v-else>展开</span>
                    <el-icon>
                        <ArrowUp v-if="showSearch"/>
                        <ArrowDown v-else/>
                    </el-icon>
                </el-button>
            </div>
        </el-col>
    </el-row>
    </el-form>
</template>
<script setup>
import { ref,useSlots } from 'vue';
defineProps({
    model:Object
})

defineEmits(["search","reset"])
const showSearch = ref(false)

const slots = useSlots()
const hasShowSearch = ref(!!slots.show)
</script>