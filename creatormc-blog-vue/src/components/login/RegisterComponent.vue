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
      <el-input type="confirmPassword" v-model="form.confirmPassword" show-password placeholder="确认密码"></el-input>
    </el-form-item>
    <div class="text-container">
      <el-button link @click="$emit('showLogin')">已有账号？立即登录</el-button>
    </div>
    <el-form-item>
      <el-button class="login-button" type="primary" :loading="isRegister" @click="register">注册</el-button>
      <div class="login-button-protocol">注册即表示同意<router-link to="/index/protocol">用户协议</router-link></div>
    </el-form-item>
  </el-form>
</template>

<script>
import { register } from '@/api/user';
import { ElMessage } from 'element-plus';

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
        password: "",
        // 确认密码，请求时不带此字段
        confirmPassword: "",
      },
      isRegister: false,
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        nickName: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          {
            validator: this.validateEmail,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            validator: this.validatePass,
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
          {
            validator: this.validateConfirmPassword,
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    /**
     * 验证密码
     */
    validatePass(rule, value, callback) {
      let passReg = /^(\w){6,18}$/;
      if(passReg.test(value)) {
        callback();
      } else {
        callback(new Error("长度在6-18之间，只包含英文、数字、下划线"));
      }
    },
    /**
     * 验证邮箱
     */
    validateEmail(rule, value, callback) {
      let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if(emailReg.test(value)) {
        callback();
      } else {
        callback(new Error("邮箱格式不正确"));
      }
    },
    /**
     * 验证确认密码
     */
    validateConfirmPassword(rule, value, callback) {
      if(value == this.form.password) {
        callback();
      } else {
        callback(new Error("两次输入不一致"));
      }
    },
    /**
     * 用户注册
     */
    register() {
      //校验表单
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //把按钮状态设置为加载中
          this.isRegister = true;
          register({
            userName: this.form.userName,
            nickName: this.form.nickName,
            email: this.form.email,
            password: this.form.password
          }).then((response) => {
            if (response != null) {
              //注册成功
              ElMessage.success("注册成功");
              //跳转到登录组件
              this.$emit("showLogin");
            }
          }).finally(() => {
            //恢复按钮状态
            this.isRegister = false;
          });
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.login-button {
  width: 100%;
}
.login-button-protocol {
  width: 100%;
  text-align: center;
  font-size: 0.9em;
  color: black;
  a {
    text-decoration: none;
  }
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