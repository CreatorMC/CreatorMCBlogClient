<template>
  <div id="container">
    <el-scrollbar :class="isCollapse ? '' : 'side-width'" class="transition bg">
      <el-menu default-active="1" popper-effect="dark" :collapse="isCollapse" class="bg theme">
        <el-menu-item index="1">
          <el-icon><Menu /></el-icon>
          <template #title>
            <span>Navigator One</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Menu /></el-icon>
          <template #title>
            <span>Navigator Two</span>
          </template>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><document /></el-icon>
          <template #title>
            <span>Navigator Three</span>
          </template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>
            <span>Navigator Four</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
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
  height: 100vh;
}
.side-width {
  width: $sideWidth !important;
}
.transition {
  width: 64px;
  transition: width var(--el-transition-duration);
}
.bg {
  background-color: rgb(38, 52, 69);
}
.theme {
  --el-menu-hover-bg-color: #001528;
  --el-menu-text-color: #fff;
}
</style>