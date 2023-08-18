<template>
  <div>
    <el-container>
      <el-aside class="side-style">
        <SideBar />
      </el-aside>
      <el-container>
        <el-header>
          <TopBar />
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

    }
  },
  components: {
    SideBar,
    TopBar
  }
}
</script>

<style scoped>
.side-style {
  width: 210px;
}
</style>