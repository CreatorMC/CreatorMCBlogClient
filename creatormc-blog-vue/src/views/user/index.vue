<template>
  <div class="main-container">
    <div class="seat"></div>
    <el-card shadow="never">
      <template #header>
        <div>
          <h1 class="title">个人中心</h1>
        </div>
      </template>
      <UserInfoShow v-if="!isEdit" v-model:form="form" v-model:isEdit="isEdit" />
      <UserInfoEdit v-else v-model:form="form" v-model:isEdit="isEdit" />
    </el-card>
  </div>
</template>

<script>
import UserInfoShow from '@/components/user/UserInfoShow.vue';
import UserInfoEdit from '@/components/user/UserInfoEdit.vue';

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
      },
      //是否处于编辑模式
      isEdit: false
    };
  },
  components: { UserInfoShow, UserInfoEdit }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0px;
  text-align: center;
}
</style>