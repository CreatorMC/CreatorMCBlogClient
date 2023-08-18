<template>
  <div class="container">
    <el-row>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
        <div class="left-container">
          <el-button class="fold-button" plain size="default" @click="">
            <el-icon :size="20"><Expand /></el-icon>
          </el-button>
          <el-breadcrumb :separator-icon="arrowRightIcon">
            <el-breadcrumb-item v-for="(item, index) in $route.matched" v-show="index != 0" :to="{ path: item.path }">{{ item.meta.menuName }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        头像
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ArrowRight } from '@element-plus/icons-vue'
import { markRaw } from 'vue';

export default {
  data() {
    return {
      arrowRightIcon: markRaw(ArrowRight)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .el-row {
    height: 100%;
    align-content: center;
  }
}
.left-container {
  display: flex;
  padding: 5px;
  align-items: center;
}
.fold-button {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
</style>