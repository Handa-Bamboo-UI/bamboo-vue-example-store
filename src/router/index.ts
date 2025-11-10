import { createRouter, createWebHashHistory } from "vue-router";
import home from "@/pages/home.vue";
import notFound from "@/pages/404.vue";
import login from "@/pages/login.vue";
import admin from "@/layouts/admin.vue";
import goodsList from "@/pages/goods/list.vue";
import categoryList from "@/pages/category/list.vue";
import imageList from "@/pages/image/list.vue";



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
 
