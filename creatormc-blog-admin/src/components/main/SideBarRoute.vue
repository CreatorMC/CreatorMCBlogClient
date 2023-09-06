<template>
  <!-- https://cn.vuejs.org/api/built-in-special-elements.html#template -->
  <template v-for="item in routes">
    <el-menu-item v-if="item.meta.menuType == 'C'" :index="`${pre}${item.name}`">
      <el-icon><icon-svg :name="item.meta.icon" /></el-icon>
      <template #title>
        <span>{{ item.meta.menuName }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="`${pre}${item.name}`">
      <template #title>
        <el-icon><icon-svg :name="item.meta.icon" /></el-icon>
        <span>{{ item.meta.menuName }}</span>
      </template>
      <!-- https://cn.vuejs.org/api/sfc-script-setup.html#recursive-components -->
      <SideBarRoute :routes="item.children" :pre="`${pre}${item.name}/`" />
    </el-sub-menu>
  </template>
</template>

<script>
export default {
  name: "SideBarRoute",
  props: {
    routes: Array,
    pre: String
  },
  data() {
    return {

    }
  }
}
</script>