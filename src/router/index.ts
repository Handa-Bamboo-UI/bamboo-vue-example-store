import { createRouter, createWebHashHistory } from "vue-router";
import home from "@/pages/home.vue";
import notFound from "@/pages/404.vue";
import login from "@/pages/login.vue";
import admin from "@/layouts/admin.vue";
import goodsList from "@/pages/goods/list.vue";
import categoryList from "@/pages/category/list.vue";
import imageList from "@/pages/image/list.vue";
import noticeList from "@/pages/notice/list.vue"
import managerList from "@/pages/manager/list.vue"
import accessList from "@/pages/access/list.vue"
import accessRoleList from "@/pages/role/list.vue"
import skusList from "@/pages/skus/list.vue"
import couponList from "@/pages/coupon/list.vue"
import levelList from "@/pages/level/list.vue"
import userList from "@/pages/user/list.vue"
import commentList from "@/pages/comment/list.vue"
import orderList from "@/pages/order/list.vue"
import SettingBuy from "@/pages/settings/buy.vue"
import SettingShip from "@/pages/settings/ship.vue"
import SettingBase from "@/pages/settings/base.vue"
import DistributionIndex from "@/pages/distribution/index.vue"
import DistributionSetting from "@/pages/distribution/setting.vue"

const routes = [
  {
    path: "/",
    name: "admin",
    component: admin,
    children: [
      {
        path: "/",
        name: "home",
        component: home,
        meta: {
          title: "后台首页",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: "登录页",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: notFound,
    meta: {
      title: "404页",
    },
  },
];
//动态路由
const asyncRoutes = [
 
  {
    path: "/goods/list",
    name: "/goods/list",
    component: goodsList,
    meta: {
      title: "商品列表",
    },
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: categoryList,
    meta: {
      title: "分类列表",
    },
  },
  {
    path: "/image/list",
    name: "/image/list",
    component: imageList,
    meta: {
      title: "图片列表",
    },
  },
    {
    path: "/notice/list",
    name: "/notice/list",
    component: noticeList,
    meta: {
      title: "公告管理",
    },
  },
  {
    path: "/manager/list",
    name: "/manager/list",
    component: managerList,
    meta: {
      title: "用户管理",
    },
  },
  {
    path: "/access/list",
    name: "/access/list",
    component: accessList,
    meta: {
      title: "权限管理",
    },
  },
  {
    path: "/role/list",
    name: "/role/list",
    component: accessRoleList,
    meta: {
      title: "角色管理",
    },
  }
  ,
  {
    path: "/skus/list",
    name: "/skus/list",
    component: skusList,
    meta: {
      title: "商品规格列表",
    },
  },
  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: couponList,
    meta: {
      title: "优惠券管理",
    },
  },
  {
    path: "/level/list",
    name: "/level/list",
    component: levelList,
    meta: {
      title: "会员等级管理",
    },
  },
  {
    path: "/user/list",
    name: "/user/list",
    component: userList,
    meta: {
      title: "用户列表",
    },
  },
  {
    path: "/comment/list",
    name: "/comment/list",
    component: commentList,
    meta: {
      title: "评论管理",
    },
  },
  {
    path: "/order/list",
    name: "/order/list",
    component: orderList,
    meta: {
      title: "订单管理",
    },
  },
  {
      path:"/setting/buy",
      name:"/setting/buy",
      component:SettingBuy,
      meta:{
          title:"支付设置"
      }
  },{
      path:"/setting/ship",
      name:"/setting/ship",
      component:SettingShip,
      meta:{
          title:"物流设置"
      }
  },
  {
    path:"/setting/base",
    name:"/setting/base",
    component:SettingBase,
    meta:{
        title:"配置"
    }
},
{
    path:"/distribution/index",
    name:"/distribution/index",
    component:DistributionIndex,
    meta:{
        title:"分销员管理"
    }
},{
    path:"/distribution/setting",
    name:"/distribution/setting",
    component:DistributionSetting,
    meta:{
        title:"分销设置"
    }
}
  
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

 
export function addRoutes(menus : any[]){
  //定义是否有新路由
  let hasNewRoute = false
  const findAndAddRoutes = (menus : any[]) =>{
    menus.forEach(menu =>{
      menu.frontpath
      let item = asyncRoutes.find(e=>e.path === menu.frontpath)
      if(item && !router.hasRoute(item.path)){
        router.addRoute("admin",item)
        hasNewRoute = true
      }
      if(menu.child && menu.child.length > 0){
        findAndAddRoutes(menu.child)
      }
    })
  }
  findAndAddRoutes(menus)
  return hasNewRoute
}
 
