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

<style>
body {
  margin: 0 calc((100vw - 100%) * -1) 0 0;
  padding-right: calc(100vw - 100%);
  overflow-x: hidden;
  background-color: #efefef;
}
</style>
