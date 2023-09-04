import nProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";
import DashboardIndex from "../views/dashboard/index.vue";
import Index from "../views/index.vue";
import Login from "../views/login/index.vue";
import WriteIndex from "../views/content/article/write/index.vue";
import UserIndex from "../views/system/user/index.vue";
import RoleIndex from "../views/system/role/index.vue";
import MenuIndex from "../views/system/menu/index.vue";
import ArticleIndex from "../views/content/article/index.vue";
import CategoryIndex from "../views/content/category/index.vue";

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
          //menuName 应该从后端接收
          meta: {
            menuName: "主页"
          }
        },
        {
          path: "write/:id*",
          name: "write",
          component: WriteIndex,
          meta: {
            menuName: "写文章"
          }
        },
        {
          path: "system",
          redirect: "/index/system/user",
          meta: {
            menuName: "系统管理"
          },
          children: [
            {
              path: "user",
              name: "user",
              component: UserIndex,
              meta: {
                menuName: "用户管理"
              }
            },
            {
              path: "role",
              name: "role",
              component: RoleIndex,
              meta: {
                menuName: "角色管理"
              }
            },
            {
              path: "menu",
              name: "menu",
              component: MenuIndex,
              meta: {
                menuName: "菜单管理"
              }
            }
          ]
        },
        {
          path: "content",
          redirect: "/index/content/article",
          meta: {
            menuName: "内容管理"
          },
          children: [
            {
              path: "article",
              name: "article",
              component: ArticleIndex,
              meta: {
                menuName: "文章管理"
              }
            },
            {
              path: "category",
              name: "category",
              component: CategoryIndex,
              meta: {
                menuName: "分类管理"
              }
            }
          ]
        }
      ]
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
