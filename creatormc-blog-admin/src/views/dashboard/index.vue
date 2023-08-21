<template>
  <div>
    这是首页（仪表盘）
  </div>
</template>

<script>
import router from '../../router';

export default {
  data() {
    return {

    }
  },
  mounted() {
    if(localStorage.getItem("token") == null) {
      //用户没有登录过，进入登录页进行登录
      router.push("/login");
      return;
    }
    //用户登录过了，获取用户信息
  }
}
</script>

<style scoped>
</style>