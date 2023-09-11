<template>
  <div>
    <el-container>
      <el-header class="header"><TopBarComponent /></el-header>
      <div>
        <router-view></router-view>
      </div>
    </el-container>
  </div>
</template>

<script>
import TopBarComponent from '../components/main/TopBarComponent.vue';
export default {
  data() {
    return {};
  },
  components: { TopBarComponent }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 500;
  width: 100%;
  height: $headHeight;
  left: 0;
  top: 0;
  background-color: $headSubMenuBgColor;
  backdrop-filter: blur(4px);
  padding: 0px;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}
</style>