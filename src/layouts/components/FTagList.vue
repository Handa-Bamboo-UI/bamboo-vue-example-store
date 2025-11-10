<template>
  <div class="f-tag-list" :style="{
    left: `${$store.state.asideWidth}px`
}">
    <el-tabs v-model="activeTab" type="card" class="demo-tabs flex-1" closable @tab-remove="removeTab"
      @tab-change="onChangeTab" style="min-width: 100px">
      <el-tab-pane v-for="item in editableTabs" :key="item.path" :label="item.title" :name="item.path" :id="item.path"
        :closable="item.path !== '/'">
      </el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link" style="
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          ">
          <el-icon class="el-icon--right" style="margin-left: -2px">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeAll">关闭所有标签页</el-dropdown-item>
            <el-dropdown-item command="closeOther">关闭其他标签页</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div class="span" style="height: 55px"></div>
</template>
<script setup lang="ts">
 import { useTabList } from '@/composables/useTabList'
 const { activeTab, editableTabs, handleCommand, removeTab, onChangeTab, asideWidth } = useTabList()

</script>
<style scoped>
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.f-tag-list {
  @apply fixed;
  display: flex;
  flex-direction: row;
  background-color: #d0d7ffcc;
  top: 65px;
  padding: 5px;
  padding-left: 24px;
  width: calc(100vw - v-bind(asideWidth));
}

.tag-btn {
  @apply bg-white rounded flex items-center justify-center;
  height: 32px;
  width: 32px;
  margin-top: 3px;
}

:deep(.el-tabs__header) {
  @apply mb-0;
}

.demo-tabs {
  width: auto;
}

:deep(.el-tabs__nav) {
  @apply bg-transparent;
  border: none !important;
  gap: 13px;
}

:deep(.el-tabs__nav::-webkit-scrollbar) {
  display: none;
}

:deep(.el-tabs__item) {
  @apply text-sm font-medium bg-white text-indigo-500 rounded-lg;
  line-height: 32px;
  height: 36px;
  border-radius: 15px;
}

:deep(.el-tabs__item.is-active) {
  font-weight: bold;
  font-size: 16px;
  border: none !important;
  background-color: #bcbeff;
  color: #fff;
}
</style>
