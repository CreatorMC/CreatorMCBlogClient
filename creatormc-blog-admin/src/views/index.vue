<template>
  <div>
    <el-container>
      <el-aside>
        <SideBar :is-collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="head-style">
          <TopBar @updateCollapse="updateCollapse" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from "../components/main/SideBar.vue"
import TopBar from "../components/main/TopBar.vue";

export default {
  data() {
    return {
      isCollapse: false
    }
  },
  components: {
    SideBar,
    TopBar
  },
  methods: {
    /**
     * 改变菜单折叠状态
     */
    updateCollapse(arg) {
      this.isCollapse = arg;
    }
  }
}
</script>

<style lang="scss" scoped>
.head-style {
  height: $headHeight;
}
</style>