<template>
  <el-card class="home-card" ref="el">
    <template #header>
      <div class="flex w-full justify-between">
        <span class="font-bold text-lg">{{title}}</span>
        <el-tag type="danger" effect="plain" class="text-xs">{{tip}}</el-tag>
      </div>
    </template>
    <el-row :gutter="20" class="w-full">
        <el-col :span="6" :offset="0" v-for="(item,index) in btns" :key="index">
            <el-card class="home-card-sub">
                <div class="flex flex-col justify-center items-center w-full">
                    <span class="font-bold">{{item.value}}</span>
                    <span style="white-space: nowrap;">{{item.label}}</span>
                </div>
            </el-card>
        </el-col>
    </el-row>
  </el-card>
</template>
<script setup>
defineProps({
    title: {
        type: String,
        default: ""
    },
    tip: {
        type: String,
        default: ""
    },
    btns: {
        type: Array,
        default: () => []
    }
})
</script>
<style scoped>
.home-card {
  border-radius: 29px;
  background-color: #f4f7ff;
  border: solid 1px #b5b5b53a;
  margin-bottom: 20px;
  box-shadow: 0px 0px 20px 0px rgba(70, 54, 115, 0.08) !important;
}
.home-card-sub {
  border-radius: 18px;
  background-color: rgb(246, 248, 252);
  border: solid 1px #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(123, 107, 175, 0.113) !important;
}
.home-card span{
  @apply text-gray-500;
}
</style>
