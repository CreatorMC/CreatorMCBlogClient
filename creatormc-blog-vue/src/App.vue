<template>
  <div>
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default {
  setup() {
    var locale = zhCn;
    return {
      locale
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<!-- 全局样式 -->
<style lang="scss">
body {
  min-width: 100vw !important;
  margin: 0;
  overflow-x: hidden;
  background-color: #efefef;
}
</style>
