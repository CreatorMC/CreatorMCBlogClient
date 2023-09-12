<template>
  <div id="father">
    <div id="container">
      <LoginComponent v-if="showIndex == 0" @showRegister="showRegister" />
      <RegisterComponent v-else-if="showIndex == 1" @showLogin="showLogin" />
    </div>
    <el-image class="bg-img" :src="backgroundImg" fit="cover" draggable="false" @contextmenu="rightClick"></el-image>
  </div>
</template>

<script>
import { getRandomImg } from '@/api/login';
import LoginComponent from '@/components/login/LoginComponent.vue';
import RegisterComponent from '@/components/login/RegisterComponent.vue';

export default {
  data() {
    return {
      backgroundImg: "",
      // 显示哪个组件
      // 0：登录 1：注册 2：找回密码
      showIndex: 0
    }
  },
  methods: {
    /**
     * 显示注册组件
     */
    showRegister() {
      this.showIndex = 1;
    },
    /**
     * 显示登录组件
     */
    showLogin() {
      this.showIndex = 0;
    },
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
  components: { LoginComponent, RegisterComponent }
}
</script>

<style lang="scss" scoped>
.bg-img {
  position: fixed;
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
  position: absolute;
  width: 30%;
  height: fit-content;
  min-width: 300px;
  padding: 20px;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
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

#father {
  width: 100%;
  height: 100vh;
}
</style>