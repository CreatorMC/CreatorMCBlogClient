import nProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";
import DashboardIndex from "../views/dashboard/index.vue";
import Index from "../views/index.vue";
import Login from "../views/login/index.vue";
import { getAdminUserInfo } from "@/api/user";
import { userStore } from "@/store/user";
import { disposeRouters, getRouters } from "../api/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/index/dashboard"
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/index",
      name: "index",
      component: Index,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: DashboardIndex,
          meta: {
            menuName: "主页"
          }
        }
      ]
    },
    // 捕获所有未匹配到的路由
    // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-Not-found-%E8%B7%AF%E7%94%B1
    {
      path: '/:pathMatch(.*)*',
      redirect: "/error"
    },
    {
      path: "/error",
      name: "error",
      component: () => import('@/views/error/index.vue')
    }
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

/**
 * 全局解析守卫
 * 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。
 */
router.beforeResolve(async to => {
  //跳转到登陆页面时不发送下面的请求，否则会导致路由无限重定向
  //因为我设置了响应拦截器，当返回的后端自定义状态码为401时，在拦截器内有跳转到登录页面的代码
  if(to.name !== 'login') {
    //获取用户信息
    const store = userStore();
    if(store.user.id == null || store.user.id == "") {
      try {
        //用户信息没有获取过
        const response = await getAdminUserInfo();
        if(response != null) {
          //将返回数据保存到pinia中
          store.permissions = response.data.permissions;
          store.roles = response.data.roles;
          store.user = response.data.user;
        } else {
          // 一定要加这句，防止在用户未登录时，弹出两次重新登陆提示对话框
          // 为什么不加这句会弹出两次对话框？因为整个守卫内有两个请求，如果这里不中断，会继续执行后面获取路由信息的请求
          // 由于用户未登录，所以两个请求都会返回 401，导致弹出两次对话框
          return false;
        }
      } catch (error) {
        // TODO 错误 取消导航 跳转到404页面
        return false;
      }
    }

    //获取路由信息
    if(store.routes == null || store.routes.length == 0) {
      try {
        const menus = (await getRouters()).data.menus;
        store.routes = await disposeRouters(menus);
        for (const item of store.routes) {
          router.addRoute('index',item);
        }
        // 返回语句，为了防止在同一页面刷新后，路由匹配不到的问题
        return to.fullPath;
      } catch (error) {
        // TODO 错误 取消导航 跳转到404页面
        return false;
      }
    }
  }
});

export default router;
