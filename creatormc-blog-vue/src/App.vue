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
  margin: 0 calc((100vw - 100%) * -1) 0 0;
  padding-right: calc(100vw - 100%);
  overflow-x: hidden;
  background-color: #efefef;
}

.main-container {
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
}

@media screen and (max-width: 800px) {
  .main-container {
    max-width: 95% !important;
  }
}

// 顶部占位样式
.seat {
  height: calc($headHeight + 20px);
}
</style>
