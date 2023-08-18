<template>
  <div id="container">
    <el-scrollbar :class="isCollapse ? '' : 'side-width'" class="transition bg">
      <el-menu default-active="1" popper-effect="light" :collapse="isCollapse" class="bg theme">
        <el-menu-item index="1">
          <el-icon><Menu /></el-icon>
          <span>Navigator One</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon>
            <document />
          </el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>
            <setting />
          </el-icon>
          <span>Navigator Four</span>
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
  --el-menu-hover-bg-color: #1f2d3d;
  --el-menu-text-color: #fff;
}
</style>