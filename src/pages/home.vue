<template>
  <div class="home">
    <el-row :gutter="20">
 
      <template v-if="panel.length == 0">
      <el-col :span="6" v-for="i in 4" :key="i">
        <el-skeleton    >
          <template #template>
            <el-card class="home-card">
              <template #header>
                  <el-skeleton-item variant="text" style="width: 50%;" />
                  <el-skeleton-item variant="text" style="width: 20%;"/>
              </template>
                <el-skeleton-item variant="text" style="width: 25%;height: 40px;" />
              <el-divider type="horizontal" />
              <div class="flex flex-row w-full" style="justify-content: space-between">
                  <el-skeleton-item variant="text" style="width: 50%;" />
                  <el-skeleton-item variant="text" style="width: 25%;" />
              </div>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>
      </template>
 
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0" v-for="item in panel" :key="item.title">
        <el-card class="home-card">
          <template #header>
            <span class="text-xl font-bold text-gray-500">{{
              item.title
            }}</span>
            <el-tag :type="item.unitColor" effect="plain">{{
              item.unit
            }}</el-tag>
          </template>
          <CountTo :value="item.value" :duration="1" />
          <el-divider type="horizontal" />
          <div class="flex flex-row w-full" style="justify-content: space-between">
            <span class="text-sm text-gray-500">{{ item.subTitle }}</span>
            <span class="text-sm text-gray-500">{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <indexNavs />
    <el-row :gutter="20">
      <el-col :span="12">
          <indexChart v-permission="['getStatistics3,GET']" />
      </el-col>
      <el-col :span="12">
        <indexCard title="店铺及商品提示" tip="店铺未审核" :btns="goods" />
        <indexCard title="交易提示" tip="需要立即处理的交易订单" :btns="order" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getStatic, getStatic2 } from "@/api/index";
import { useTabList } from "@/composables/useTabList";
const { asideWidth } = useTabList();
import CountTo from "@/components/CountTo.vue";
import indexNavs from "@/components/indexNavs.vue";
import indexChart from "@/components/indexChart.vue";
import indexCard from "@/components/indexCard.vue";
const panel = ref([] as any[]);
getStatic().then((res:any) => {
  panel.value = res.panels;
  console.log(panel.value);
});
const goods = ref([] as any[]);
const order = ref([] as any[]);
getStatic2().then((res:any) => {
  goods.value = res.goods;
  console.log(goods.value);
  order.value = res.order;
  console.log(order.value);
});
</script>
<style scoped>
.home {
  height: 100%;
  width: calc(100% - v-bind(asideWidth));
  margin: 0px;
  overflow: scroll;
  position: fixed;
  background-color: transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 20px;
}

.home::-webkit-scrollbar {
  display: none;
}

.home-card {
  border-radius: 29px;
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
  border-radius: 5px;
  background-color: #bac4ff3a;
}
 
</style>