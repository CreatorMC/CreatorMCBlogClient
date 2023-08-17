<script>
import SideBar from "../components/main/SideBar.vue"

export default {
  data() {
    return {
      
    }
  },
  components: {
    SideBar
  }
}
</script>

<template>
  <div>
    <el-container>
      <el-aside class="side-style">
        <SideBar/>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.side-style {
  width: 210px;
}
</style>