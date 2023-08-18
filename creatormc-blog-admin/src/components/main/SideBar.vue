<template>
  <div id="container">
    <el-scrollbar>
      <el-menu default-active="1" popper-effect="light">
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
  data() {
    return {

    }
  }
}
</script>

<style scoped>
#container {
  height: 100vh;
}
</style>