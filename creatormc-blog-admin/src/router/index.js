import nProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";
import DashboardIndex from "../views/dashboard/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "DashboardIndex",
      component: DashboardIndex,
    },
  ],
});

/**
 * 前置路由守卫
 */
router.beforeEach((to, from) => {
  //每次切换页面时调用进度条
  nProgress.start();
  //跳转
  return true;
});

/**
 * 后置路由守卫
 */
router.afterEach(() => {
  //页面切换完成关闭进度条
  nProgress.done();
});

export default router;
