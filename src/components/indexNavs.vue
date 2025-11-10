<template>
    <el-row :gutter="20" class="mt-5">
        <el-col :span="3" :offset="0" v-for="(item,index) in iconNavs" :key="index">
            <el-card class="home-card" @click="$router.push(item.path)">
                <div class=" flex flex-row items-center justify-center cursor-pointer space-x-4 flex-wrap">
                    <el-icon :size="25" :class="item.color">
                        <component :is="item.icon"/>
                    </el-icon>
                    <span class="font-bold" >{{ item.title }}</span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup>

const iconNavs = [
        {
            icon:"user",
            color:"text-light-blue-500",
            title:"用户",
            path:"/user/list"
        },
        {
            icon:"shopping-cart",
            color:"text-violet-500",
            title:"商品",
            path:"/goods/list"
        },
        {
            icon:"tickets",
            color:"text-fuchsia-500",
            title:"订单",
            path:"/order/list"
        },
        {
            icon:"chat-dot-square",
            color:"text-teal-500",
            title:"评价",
            path:"/comment/list"
        },
        {
            icon:"picture",
            color:"text-rose-500",
            title:"图库",
            path:"/image/list"
        },
        {
            icon:"bell",
            color:"text-green-500",
            title:"公告",
            path:"/notice/list"
        },
        {
            icon:"set-up",
            color:"text-grey-500",
            title:"配置",
            path:"/setting/base"
        },
        {
            icon:"files",
            color:"text-yellow-500",
            title:"优惠券",
            path:"/coupon/list"
        }
    ]
</script>
<style scoped>
*{
    -webkit-user-select: none;
}
.home-card {
  border-radius: 29px;
  background-color: #f4f7ff;
  border: solid 1px #b5b5b53a;
  box-shadow: 0px 0px 20px 0px rgba(70, 54, 115, 0.08) !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 70px;
  @apply mb-4;
}
.home-card:hover  {
    filter: brightness(1.02);
}
span{
    margin:0 !important;
    overflow: hidden;
    width: 80px;
    text-align: center;
    @apply text-gray-500 text-lg;
}

.home-card:hover {
  scale: 1.05;
}
</style>
