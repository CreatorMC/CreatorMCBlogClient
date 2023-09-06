<template>
  <div>
    <div id="container">
      <el-scrollbar :class="isCollapse ? '' : 'side-width'" class="transition bg">
        <el-menu router :default-active="$route.path" popper-effect="dark" :collapse="isCollapse" class="bg theme">
          <el-menu-item index="/index/dashboard">
            <el-icon><icon-svg name="dashboard" /></el-icon>
            <template #title>
              <span>主页</span>
            </template>
          </el-menu-item>
          <SideBarRoute :routes="routes" pre="/index/" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div :class="isCollapse ? '' : 'side-width'" class="transition"></div>
  </div>
</template>

<script>
import { userStore } from '@/store/user';
import SideBarRoute from './SideBarRoute.vue';

export default {
  props: {
    isCollapse: Boolean //是否折叠菜单
  },
  data() {
    return {
      routes: userStore().routes
    };
  },
  components: { SideBarRoute }
}
</script>

<style lang="scss" scoped>
#container {
  position: fixed;
  height: 100vh;
  z-index: 500;
}
.side-width {
  width: $sideWidth !important;
}
.transition {
  width: 64px;
  transition: width var(--el-transition-duration);
}
.bg {
  background-color: rgb(38, 52, 69) !important;
}
.theme {
  --el-menu-hover-bg-color: #{$sideMenuHoverBgColor};
  --el-menu-text-color: #{$sideMenuTextColor};
}
</style>