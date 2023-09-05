<template>
  <div class="container">
    <el-row>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
        <div class="left-container">
          <el-button class="fold-button" plain size="default" @click="foldMenu">
            <el-icon :size="20">
              <Fold v-show="!isCollapse" />
              <Expand v-show="isCollapse" />
            </el-icon>
          </el-button>
          <el-breadcrumb :separator-icon="arrowRightIcon">
            <transition-group name="breadcrumb">
              <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="item" v-show="index != 0" :to="{ path: item.path }"><span>{{ item.meta.menuName }}</span></el-breadcrumb-item>
            </transition-group>
          </el-breadcrumb>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <div class="right-container">
          <el-dropdown>
            <el-avatar shape="square" :src="avatar" fit="cover"></el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$router.push('/')">首页</el-dropdown-item>
                <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ArrowRight } from '@element-plus/icons-vue'
import { markRaw, ref } from 'vue';
import { logout } from '../../api/login';
import { getAdminUserInfo } from '../../api/user';
import router from '../../router';
import { userStore } from '../../store/user';

export default {
  setup() {
    const store = userStore();
    //创建响应式的头像变量
    var avatar = ref("");
    avatar.value = store.user.avatar;
    //订阅pinia的userStore产生的变化，发生变化时重新给响应式对象赋值
    store.$subscribe((mutation, state) => {
      avatar.value = state.user.avatar;
    });
    return {
      avatar                                  //头像链接
    }
  },
  data() {
    return {
      arrowRightIcon: markRaw(ArrowRight),
      isCollapse: false,                      //控制页面左侧菜单栏是否折叠
    }
  },
  methods: {
    /**
     * 改变菜单折叠状态
     */
    foldMenu() {
      this.isCollapse = !this.isCollapse;
      this.$emit('updateCollapse', this.isCollapse);
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
    if(localStorage.getItem("token") == null) {
      //用户没有登录过，进入登录页进行登录
      router.push("/login");
      return;
    }
    //用户登录过了，获取用户信息
    const store = userStore();
    if(store.user.id == null || store.user.id == "") {
      //用户信息没有获取过
      getAdminUserInfo().then((response) => {
        if(response != null) {
          //将返回数据保存到pinia中
          store.permissions = response.data.permissions;
          store.roles = response.data.roles;
          store.user = response.data.user;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .el-row {
    height: 100%;
    align-items: center;
    align-content: center;
  }
}
.left-container {
  display: flex;
  padding: 5px;
  align-items: center;
}
.fold-button {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
.right-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px;
  .el-avatar {
    outline: none;
  }
}
</style>