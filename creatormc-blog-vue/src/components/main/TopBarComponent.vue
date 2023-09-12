<template>
  <div class="container">
    <el-menu class="bar-container" mode="horizontal" :default-active="$route.path" :ellipsis="false" router>
      <el-menu-item index="/index/home">首页</el-menu-item>
      <el-sub-menu index="" popper-class="custom-menu-popper">
        <template #title>分类</template>
        <el-menu-item v-for="item in categories" :index="`/index/category/${item.id}`">{{ item.name }}</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/">友链</el-menu-item>
      <el-menu-item index="/">关于</el-menu-item>
      <div class="flex-grow" />
      <div class="head">
        <el-dropdown :disabled="avatar == null || avatar == ''">
          <el-avatar :src="avatar" fit="cover" @click="$router.push('/login')">
            <span v-show="avatar == null || avatar == ''">未登录</span>
          </el-avatar>
          <template v-if="!(avatar == null || avatar == '')" #dropdown>
            <div style="text-align: center; border-bottom: 1px var(--el-border-color) var(--el-border-style)">
              <h3>{{ nickName }}</h3>
            </div>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/index/user')">个人中心</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/category';
import { userStore } from '@/store/user';
import { ref } from 'vue';
import { logout } from '@/api/login';
import router from '@/router';

export default {
  name: "TopBarComponent",
  setup() {
    const store = userStore();
    //创建响应式的头像变量
    var avatar = ref("");
    var nickName = ref("");
    avatar.value = store.user.avatar;
    nickName.value = store.user.nickName;
    //订阅pinia的userStore产生的变化，发生变化时重新给响应式对象赋值
    store.$subscribe((mutation, state) => {
      avatar.value = state.user.avatar;
      nickName.value = state.user.nickName;
    });
    return {
      avatar,   //头像链接
      nickName  //昵称
    }
  },
  data() {
    return {
      categories: []
    }
  },
  methods: {
    getCategoryList() {
      getCategoryList().then((response) => {
        if(response != null) {
          this.categories = response.data;
        }
      });
    },
    /**
     * 退出登录
     */
    logout() {
      logout().then((response) => {
        if(response != null) {
          localStorage.removeItem("token");
          router.push("/login");
          const store = userStore();
          //恢复store状态到初始值
          store.$reset();
          sessionStorage.clear();
        }
      });
    }
  },
  mounted() {
    this.getCategoryList();
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}

.bar-container {
  max-width: 80%;
  height: 100%;
  margin: auto;
  border-bottom: 0px !important;
  background-color: unset;
  > li {
    color: white;
    font-weight: bold;
  }
  > li:focus {
    color: white !important;
    background-color: unset !important;
  }
  :deep(.el-sub-menu__title) {
    color: white;
  }
  > li.is-active {
    background: linear-gradient(to top, #00000090, #00000010) !important;
  }
}

.flex-grow {
  flex-grow: 1;
}

.head {
  display: flex;
  align-items: center;
  span {
    font-size: 12px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
  }
  :deep(.el-avatar) {
    outline: none;
  }
}
</style>