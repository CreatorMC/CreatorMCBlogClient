<template>
  <el-form :model="form" :rules="rules" ref="form" :inline="false">
    <div class="title">
      <span>创造者MC的个人博客</span>
    </div>
    <el-form-item prop="userName">
      <el-input type="text" v-model="form.userName" placeholder="用户名（用于登录，不对外显示）"></el-input>
    </el-form-item>
    <el-form-item prop="nickName">
      <el-input type="text" v-model="form.nickName" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input type="text" v-model="form.email" placeholder="邮箱（用于找回密码）"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" show-password placeholder="密码：6-12位英文、数字、下划线"></el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input type="confirmPassword" v-model="confirmPassword" show-password placeholder="确认密码"></el-input>
    </el-form-item>
    <div class="text-container">
      <el-button link @click="$emit('showLogin')">已有账号？立即登录</el-button>
    </div>
    <el-form-item>
      <el-button class="login-button" type="primary" :loading="isRegister">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { login } from '@/api/login';
import router from '@/router';

export default {
  name: "LoginComponent",
  emits: [
    "showLogin"
  ],
  data() {
    return {
      form: {
        userName: "",
        nickName: "",
        email: "",
        password: ""
      },
      // 确认密码
      confirmPassword: "",
      isRegister: false,
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // login() {
    //   //校验表单
    //   this.$refs["form"].validate((valid) => {
    //     if (valid) {
    //       //把按钮状态设置为加载中
    //       this.isRegister = true;
    //       login(this.form).then((response) => {
    //         if (response != null) {
    //           //登录成功，保存token到localStorage中
    //           localStorage.setItem("token", response.data.token);
    //           //跳转到首页
    //           router.push("/index/home");
    //         }
    //       }).finally(() => {
    //         //恢复按钮状态
    //         this.isRegister = false;
    //       });
    //     }
    //   });
    // },
  }
}
</script>

<style lang="scss" scoped>
.login-button {
  width: 100%;
}
.text-container{
  display: flex;
  justify-content: space-between;
  :deep(.el-button.is-link) {
    color: blue;
  }
  :deep(.el-button.is-link:hover) {
    color: var(--el-color-primary);
  }
  :deep(.el-button.is-link:active) {
    color: blue;
  }
}
</style>