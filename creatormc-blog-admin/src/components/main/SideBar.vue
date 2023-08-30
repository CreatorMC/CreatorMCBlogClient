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
          <el-menu-item index="/index/write">
            <el-icon><icon-svg name="edit" /></el-icon>
            <template #title>
              <span>写文章</span>
            </template>
          </el-menu-item>
          <el-sub-menu index="/index/system">
            <template #title>
              <el-icon><icon-svg name="setting" /></el-icon>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/index/system/user">
              <el-icon><icon-svg name="user" /></el-icon>
              <template #title>
                <span>用户管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/index/system/role">
              <el-icon><icon-svg name="role" /></el-icon>
              <template #title>
                <span>角色管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/index/system/menu">
              <el-icon><icon-svg name="tree-table" /></el-icon>
              <template #title>
                <span>菜单管理</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><icon-svg name="table" /></el-icon>
              <span>内容管理</span>
            </template>
            <el-menu-item>
              <el-icon><icon-svg name="container" /></el-icon>
              <template #title>
                <span>文章管理</span>
              </template>
            </el-menu-item>
            <el-menu-item>
              <el-icon><icon-svg name="category" /></el-icon>
              <template #title>
                <span>分类管理</span>
              </template>
            </el-menu-item>
            <el-menu-item>
              <el-icon><icon-svg name="link" /></el-icon>
              <template #title>
                <span>友链管理</span>
              </template>
            </el-menu-item>
            <el-menu-item>
              <el-icon><icon-svg name="tag" /></el-icon>
              <template #title>
                <span>标签管理</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div :class="isCollapse ? '' : 'side-width'" class="transition"></div>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: Boolean   //是否折叠菜单
  },
  data() {
    return {

    }
  }
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