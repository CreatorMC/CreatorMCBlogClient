<template>
  <div class="container">
    <el-tooltip
      effect="dark"
      content="评论"
      placement="right"
    >
      <div class="item">
        <el-icon><icon-svg name="icon-comment" /></el-icon>
        <div style="font-size: small;">0</div>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "SideBarComponent",
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  left: 4vw;
  top: $headHeight + 20px;
  .item {
    padding: 5px;
    border-radius: 50%;
    width: 49px;
    height: 49px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.85);
  }
  :deep(i) {
    font-size: 32px;
    transition: all 0.2s ease;
  }
  .item:hover :deep(i) {
    color: var(--el-color-primary-light-3);
  }
}
</style>