<template>
  <div class="main-container">
    <div class="seat"></div>
    <el-card shadow="never">
      <template #header>
        <div>
          <h1 class="title">个人中心</h1>
        </div>
      </template>
      <el-form class="form" :model="form" ref="form" label-width="100px" label-position="left">
        <el-form-item label="头像">
          <el-avatar class="head" shape="circle" :src="form.avatar" fit="cover"></el-avatar>
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
    </el-card>
  </div>
</template>

<script>
import { userStore } from '@/store/user';

export default {
  data() {
    return {
      form: {
        //头像
        avatar: "",
        //邮箱
        email: "",
        //用户id
        id: "",
        //昵称
        nickName: "",
        //性别
        sex: ""
      }
    }
  },
  mounted() {
    const store = userStore();
    this.form = store.user;
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0px;
  text-align: center;
}

.head {
  width: 120px;
  height: 120px;
}

.form {
  > div {
    min-height: 80px;
  }
}
</style>