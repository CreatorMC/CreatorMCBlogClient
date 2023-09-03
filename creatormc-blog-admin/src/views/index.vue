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
        <el-main style="overflow-x: hidden;" class="fix-width">
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <component style="overflow: auto;" class="fix-width" :is="Component" />
            </transition>
          </router-view>
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
.fix-width {
  width: 100%;
}
</style>