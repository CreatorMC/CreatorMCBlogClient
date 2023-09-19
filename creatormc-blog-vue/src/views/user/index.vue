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
import { getUserInfo } from '@/api/user';

export default {
  props: [
    'id'
  ],
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
  mounted() {
    this.form = this.$route.params.form;
  },
  beforeRouteEnter(to, from, next) {
    getUserInfo(to.params.id).then((response) => {
      if(response != null) {
        to.params.form = response.data;
        next();
      }
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
    getUserInfo(to.params.id).then((response) => {
      if(response != null) {
        this.form = response.data;
        next();
      }
    })
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