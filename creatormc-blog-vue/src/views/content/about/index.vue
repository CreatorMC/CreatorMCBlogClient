<template>
  <div class="main-container">
    <div class="seat"></div>
    <el-row :gutter="30">
      <el-col :sm="24" :md="16">
        <el-card class="body" shadow="never">
          <template #header>
            <h1>关于我</h1>
          </template>
          <div>
          </div>
        </el-card>
      </el-col>
      <RightSideComponent />
    </el-row>
  </div>
</template>

<script>
import RightSideComponent from '@/components/content/index/RightSideComponent.vue';
export default {
    data() {
        return {};
    },
    components: { RightSideComponent }
}
</script>

<style lang="scss" scoped>
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

.seat {
  height: calc($headHeight + 20px);
}

.body {
  position: relative;
  margin-bottom: 30px;
  h1 {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>