<template>
  <div>
    <StartScreenComponent v-if="isShowStratScreen" @close="closeStartScreen" />
    <div id="main-container" class="main-container">
      <div class="seat"></div>
      内容
    </div>
  </div>
</template>

<script>
import StartScreenComponent from '@/components/content/index/StartScreenComponent.vue';
export default {
  data() {
    return {
      isShowStratScreen: true
    }
  },
  methods: {
    closeStartScreen() {
      this.isShowStratScreen = false;
    }
  },
  components: { StartScreenComponent }
}
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
}

.seat {
  height: $headHeight;
}
</style>