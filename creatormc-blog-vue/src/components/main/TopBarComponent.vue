<template>
  <div class="container">
    <el-menu class="bar-container" mode="horizontal" default-active="1" :ellipsis="false">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">分类</el-menu-item>
      <el-menu-item index="3">友链</el-menu-item>
      <el-menu-item index="4">关于</el-menu-item>
      <div class="flex-grow" />
      <div class="head">
        <el-avatar src="" fit="cover">
          未登录
        </el-avatar>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "TopBarComponent",
  data() {
    return {

    }
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
  > span {
    font-size: 12px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
  }
}
</style>