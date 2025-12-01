<template>
    <div class="px-9 pt-5">
        <el-row :gutter="20" class="mb-5">
            <template v-if="loading">
                <el-col :span="6" v-for="i in 4" :key="i">
                    <el-skeleton style="width: 100%;" animated loading>
                        <template #template>
                            <el-card shadow="hover" class="border-0">
                                <template #header>
                                    <div class="flex justify-between">
                                        <el-skeleton-item variant="text" style="width: 50%" />
                                        <el-skeleton-item variant="text" style="width: 10%" />
                                    </div>
                                </template>
                                <el-skeleton-item variant="h3" style="width: 80%" />
                            </el-card>
                        </template>
                    </el-skeleton>
                </el-col>
            </template>
            <el-col :span="6" :offset="0" v-for="(item, index) in list" :key="index">
                <el-card shadow="never" class="home-card">
                    <div class="flex items-center gap-3">
                        <el-icon :size="40" :class="item.color" style="color: #807AF1;" class="w-[40px] h-[40px] rounded-full ">
                            <User v-if="index == 0" />
                            <ShoppingCart v-if="index == 1" />
                            <PriceTag v-if="index == 2" />
                            <Timer v-if="index == 3" />
                        </el-icon>
                        <div class="ml-2 flex flex-col justify-start items-start gap-3">
                            <h2 class="text-2xl font-bold" style="color: #807AF1;">{{ item.value }}</h2>
                            <small class="text-gray-400 align-center text-xs">{{ item.label }}</small>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { ref } from "vue"
import {
    getAgentStatistics
} from "@/api/distribution"

const list = ref([])
const loading = ref(false)
loading.value = true
getAgentStatistics().then(res => {
    list.value = res.panels
    console.log(res.panels)
}).finally(() => {
    loading.value = false
})

</script>
<style scoped>
.home-card {
  border-radius: 29px;
  padding: 10px;
  background-color: #f4f7ff;
  border: solid 1px #b5b5b53a;
  box-shadow: 0px 0px 20px 0px rgba(70, 54, 115, 0.08) !important;
}
.home-card span{
  @apply text-gray-500;
}

.home-card:hover {
  scale: 1.03;
  filter: brightness(1.01);
  transition: all 0.2s;
}

:deep(.el-card__header) {
  display: flex;
  justify-content: space-between;
}

:deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}
:deep(.el-skeleton__item) {
  height: 20px;
}
</style>