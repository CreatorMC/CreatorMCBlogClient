<template>
  <div class="container">
    <el-menu class="bar-container" mode="horizontal" :default-active="$route.path" :ellipsis="false" router>
      <el-menu-item index="/index/home">首页</el-menu-item>
      <el-sub-menu index="" popper-class="custom-menu-popper">
        <template #title>分类</template>
        <el-menu-item v-for="item in categories" :index="`/index/category/${item.id}`">{{ item.name }}</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/">友链</el-menu-item>
      <el-menu-item index="/">关于</el-menu-item>
      <div class="flex-grow" />
      <div class="head">
        <el-avatar src="" fit="cover" @click="$router.push('/login')">
          未登录
        </el-avatar>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/category';

export default {
  name: "TopBarComponent",
  data() {
    return {
      categories: []
    }
  },
  methods: {
    getCategoryList() {
      getCategoryList().then((response) => {
        if(response != null) {
          this.categories = response.data;
        }
      });
    }
  },
  mounted() {
    this.getCategoryList();
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}

.bar-container {
  max-width: 80%;
  height: 100%;
  margin: auto;
  border-bottom: 0px !important;
  background-color: unset;
  > li {
    color: white;
    font-weight: bold;
  }
  > li:focus {
    color: white !important;
    background-color: unset !important;
  }
  :deep(.el-sub-menu__title) {
    color: white;
  }
  > li.is-active {
    background: linear-gradient(to top, #00000090, #00000010) !important;
  }
}

.flex-grow {
  flex-grow: 1;
}

.head {
  display: flex;
  align-items: center;
  > span {
    font-size: 12px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
  }
}
</style>