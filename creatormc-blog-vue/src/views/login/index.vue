<template>
  <div>
    <div id="container">
      <div class="bg"></div>
      <LoginComponent />
    </div>
    <el-image class="bg-img" :src="backgroundImg" fit="cover" draggable="false" @contextmenu="rightClick"></el-image>
  </div>
</template>

<script>
import { getRandomImg } from '@/api/login';
import LoginComponent from '@/components/login/LoginComponent.vue';

export default {
  data() {
    return {
      backgroundImg: "",
    }
  },
  methods: {
    rightClick(e) {
      //禁止右键保存图片
      e.preventDefault();
    }
  },
  mounted() {
    getRandomImg().then((response) => {
      this.backgroundImg = response.data;
    });
  },
  components: { LoginComponent }
}
</script>

<style lang="scss" scoped>
.bg-img {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: -10;
  //禁止选中背景图片
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
#container {
  position: relative;
  width: 30%;
  min-width: 300px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20vh;
  border-radius: var(--el-border-radius-round);
  overflow: hidden;
  :deep(.title) {
    text-align: center;
    font-size: x-large;
    font-weight: bold;
    padding-bottom: 18px;
  }
  :deep(.el-input) {
    height: 50px;
  }
  :deep(button) {
    height: 40px;
  }
}
#container::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: rgba(255, 255, 255, 0.399);
  z-index: -1;
}
</style>