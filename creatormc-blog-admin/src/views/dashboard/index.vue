<template>
  <div>
    这是首页（仪表盘）
  </div>
</template>

<script>
import { getAdminUserInfo } from '../../api/user';
import router from '../../router';
import { userStore } from '../../store/user';

export default {
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
    if(localStorage.getItem("token") == null) {
      //用户没有登录过，进入登录页进行登录
      router.push("/login");
      return;
    }
    //用户登录过了，获取用户信息
    const store = userStore();
    if(store.user.id == null || store.user.id == "") {
      //用户信息没有获取过
      getAdminUserInfo().then((response) => {
        //将返回数据保存到pinia中
        store.permissions = response.data.permissions;
        store.roles = response.data.roles;
        store.user = response.data.user;
      });
    }
  }
}
</script>

<style scoped>
</style>