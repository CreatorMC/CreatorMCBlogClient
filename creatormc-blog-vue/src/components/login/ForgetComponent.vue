<template>
  <el-form :model="form" :rules="rules" ref="form" :inline="false">
    <div class="title">
      <span>创造者MC的个人博客</span>
    </div>
    <el-form-item prop="email">
      <el-input type="text" v-model="form.email" placeholder="注册时填写的邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="vCode">
      <div class="flex">
        <el-input type="text" v-model="form.vCode" placeholder="验证码"></el-input>
        <el-button class="button" type="success" :disabled="isDisableSendEmail" @click="sendEmailVCode">{{ sendVCodeButtonText }}</el-button>
      </div>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" show-password placeholder="新密码：6-12位英文、数字、下划线"></el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input type="confirmPassword" v-model="form.confirmPassword" show-password placeholder="确认密码"></el-input>
    </el-form-item>
    <div class="text-container">
      <el-button link @click="$emit('showLogin')">返回登录</el-button>
    </div>
    <el-form-item>
      <el-button class="login-button" type="primary" :loading="isMakeSure" @click="updateUserPassword">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { sendEmailVCode } from '@/api/login';
import { ElMessage } from 'element-plus';
import { updateUserPassword } from '@/api/user';

export default {
  name: "ForgetComponent",
  emits: [
    "showLogin"
  ],
  data() {
    return {
      form: {
        email: "",
        vCode: "",
        password: "",
        // 确认密码，请求时不带此字段
        confirmPassword: "",
      },
      isMakeSure: false,
      sendVCodeButtonText: "发送验证码",
      //是否禁用发送邮箱验证码按钮
      isDisableSendEmail: false,
      //发送验证码成功后收到的uuid，作为Redis中的Key，在确认时发给后端
      uuid: "",
      rules: {
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
        vCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
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
      if (passReg.test(value)) {
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
      if (emailReg.test(value)) {
        callback();
      } else {
        callback(new Error("邮箱格式不正确"));
      }
    },
    /**
     * 验证确认密码
     */
    validateConfirmPassword(rule, value, callback) {
      if (value == this.form.password) {
        callback();
      } else {
        callback(new Error("两次输入不一致"));
      }
    },
    /**
     * 发送验证码
     */
    sendEmailVCode() {
      this.isDisableSendEmail = true;
      sendEmailVCode(this.form.email).then((response) => {
        if(response != null) {
          this.uuid = response.data;
          let second = 30;
          ElMessage.success("发送成功");
          let timer = setInterval(() => {
            this.sendVCodeButtonText = `已发送(${second})`;
            second--;
            if(second <= 0) {
              this.sendVCodeButtonText = '发送验证码';
              this.isDisableSendEmail = false;
              clearInterval(timer);
            }
          }, 1000);
        } else {
          this.isDisableSendEmail = false;
        }
      }).catch(() => {
        this.isDisableSendEmail = false;
      });
    },
    /**
     * 更新用户密码
     */
    updateUserPassword() {
      this.isMakeSure = true;
      updateUserPassword({
        email: this.form.email,
        vCode: this.form.vCode,
        password: this.form.password,
        uuid: this.uuid
      }).then((response) => {
        if(response != null) {
          ElMessage.success("更新成功");
          //返回登录界面
          this.$emit('showLogin');
        }
      }).finally(() => {
        this.isMakeSure = false;
      });
    }
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
.flex {
  width: 100%;
  display: flex;
  :deep(.el-input__wrapper) {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .button {
    width: 100px;
    height: unset !important;
    border-radius: 0px var(--el-input-border-radius,var(--el-border-radius-base)) var(--el-input-border-radius,var(--el-border-radius-base)) 0px;
  }
}
</style>