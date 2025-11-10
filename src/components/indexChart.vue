<template>
  <el-card class="home-card" ref="el">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="font-bold text-lg">订单统计</span>
        <div class="flex justify-between items-center">
          <el-check-tag v-for="item in options" :key="item.value" :checked="current === item.value"
            @click="handleChoose(item.value)">{{ item.text }}</el-check-tag>
        </div>
      </div>
    </template>
    <div id="chart" style="height: 100%; width: 100%"></div>
  </el-card>
</template>
<script setup type="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useResizeObserver } from "@vueuse/core"
import * as echarts from "echarts";
import { getStatic3 } from "@/api/index"
const current = ref("week")
const options = [{
  text: "近1个月",
  value: "month"
}, {
  text: "近1周",
  value: "week"
}, {
  text: "近24小时",
  value: "hour"
}]
const handleChoose = (val) => {
  current.value = val;
  getData()
}
var mychart = null
onMounted(() => {
  if (document.getElementById("chart")) {
    mychart = echarts.init(document.getElementById("chart"));
    getData()
  }

})
function getData() {
  let option = {
    xAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    },
    yAxis: {
      type: "value"
    },
    series: [{
      data: [1, 2, 3, 4, 5, 6, 7],
      type: "bar"
    }]
  }
  mychart.showLoading()
  getStatic3(current.value).then((res) => {
    option.xAxis.data = res.x;
    option.series[0].data = res.y;
    console.log(option);
    mychart.setOption(option);
  }).finally(() => {
    mychart.hideLoading()
  })
}
onBeforeUnmount(() => {
  if (mychart) {
    mychart.dispose()
  }
})
const el = ref(null)
useResizeObserver(el, (entries) => {
  mychart.resize()
})
</script>
<style scoped>
.home-card {
  border-radius: 29px;
  background-color: #f4f7ff;
  border: solid 1px #b5b5b53a;
  box-shadow: 0px 0px 20px 0px rgba(70, 54, 115, 0.08) !important;
  height: 415px;
}

:deep(.el-card__body) {
  height: 90%;
}

.home-card:hover {
  scale: 1.01;
}

.home-card span {
  @apply text-gray-500;
}
</style>
