import nProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/index/home"
    },
    {
      path: "/login",
      name: "login",
      component: () => import('../views/login/index.vue')
    },
    {
      path: "/index",
      name: "index",
      component: Index,
      children: [
        {
          path: "home",
          name: "home",
          component: () => import('../views/home/index.vue')
        },
        {
          path: "article/:id",
          name: "article",
          component: () => import('../views/content/article/index.vue'),
          props: true
        },
        {
          path: "category/:categoryId",
          name: "category",
          component: () => import('../views/home/index.vue'),
          props: true
        },
      ]
    },
    // 捕获所有未匹配到的路由
    // https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-Not-found-%E8%B7%AF%E7%94%B1
    // 此处不能重定向，否则重定向会覆盖全局解析守卫中的跳转，导致刷新网页也跳转到 404
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: "error",
    //   component: () => import('@/views/error/index.vue')
    // }
  ],
  scrollBehavior(to, from, savedPosition) {
    if(to.fullPath == '/index/home') {
      // 首页滚动到顶部
      return { top: 0 };
    } else if (savedPosition) {
      // 保持浏览器默认滚动行为
      return savedPosition;
    }
    return null;
  }
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