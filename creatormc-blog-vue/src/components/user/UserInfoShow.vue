<template>
  <div>
    <el-form class="form" label-width="100px" label-position="left">
      <el-form-item label="头像">
        <el-avatar class="head" shape="circle" :src="form.avatar && form.avatar != '' ? form.avatar : $defaultAvatar" fit="cover"></el-avatar>
      </el-form-item>
      <el-form-item label="昵称">
        {{ form.nickName }}
      </el-form-item>
      <el-form-item label="电子邮件">
        {{ form.email }}
      </el-form-item>
      <el-form-item label="性别">
        {{ form.sex == "0" ? "男" : (form.sex == "1" ? "女" : "未知") }}
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button type="primary" @click="$emit('update:isEdit', true)">编辑个人信息</el-button>
    </div>
  </div>
</template>

<script>
import { userStore } from '@/store/user';

export default {
  name: "UserInfoShow",
  props: [
    "form",
    "isEdit"
  ],
  emits: [
    'update:isEdit',
    'update:form'
  ],
  data() {
    return {

    }
  },
  mounted() {
    const store = userStore();
    this.$emit('update:form', store.user);
  }
}
</script>

<style lang="scss" scoped>
.form {
  :deep(.el-form-item__label) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.head {
  width: 120px;
  height: 120px;
}

.footer {
  display: flex;
  justify-content: center;
}
</style>