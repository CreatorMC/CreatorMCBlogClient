<template>
  <div>
    <div id="container">
      <div class="bg"></div>
      <el-form :model="form" ref="form" label-width="80px" :inline="false">
        <div class="title">
          <span>创造者MC的个人博客后台</span>
        </div>
        <el-form-item label-width="0px">
          <el-input type="text" v-model="form.userName" placeholder="请输入用户名">
            <template #prepend>
              <el-icon><UserFilled /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-input type="password" v-model="form.password" show-password placeholder="请输入密码">
            <template #prepend>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-button class="login-button" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-image class="bg-img" src="https://t.mwm.moe/moez" fit="cover" draggable="false" @contextmenu="rightClick"></el-image>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      }
    }
  },
  methods: {
    login() {

    },
    rightClick(e) {
      //禁止右键保存图片
      e.preventDefault();
    }
  }
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
  .title {
    text-align: center;
    font-size: x-large;
    font-weight: bold;
    padding-bottom: 18px;
  }
  .el-input {
    height: 50px;
  }
  button {
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
.login-button {
  width: 100%;
}
</style>