<template>
  <div>
    <el-card class="article" v-for="item in articles" shadow="hover">
      <template #header>
        <div class="header">
          <h1>
            <div class="title">
              <div class="tag-container">
                <el-tag class="tag" type="info"><router-link :to="`/index/category/${item.categoryId}`">{{ item.categoryName }}</router-link></el-tag>
              </div>
              <router-link class="link" :to="`/index/article/${item.id}`"><span class="title-span">{{ item.title }}</span></router-link>
            </div>
          </h1>
          <h2 style="color: gray;">
            <icon-svg name="icon-user" />发表于&nbsp;<icon-svg name="icon-time-circle-fill" />{{ publishTime(item.createTime) }}&nbsp;<icon-svg name="icon-eye-fill" />{{ item.viewCount }}次围观
          </h2>
        </div>
      </template>
      <div class="body">
        <div>
          <p>{{ item.summary }}</p>
        </div>
        <div v-if="item.thumbnail != ''">
          <el-image class="img" :src="item.thumbnail" fit="cover" loading="lazy"></el-image>
        </div>
      </div>
    </el-card>
    <div style="margin-bottom: 30px; width:100%;">
      <el-button style="width:100%;" type="primary" :loading="isLoading" :disabled="isDisable" @click="$emit('loadMore')">
        {{ isDisable ? "到达世界的尽头~" : "加载更多" }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleListComponent",
  props: {
    articles: Array,
    isLoading: Boolean,
    isDisable: Boolean
  },
  emits: [
    "loadMore"
  ],
  data() {
    return {
      
    }
  },
  methods: {
    /**
     * 得到发布时间
     * https://github.com/hy-inger/hy-inger.github.io/issues/7
     */
    publishTime(str) {
      let date = str.split(' ')[0];
      let arr = date.split('-');
      return `${arr[0]}年${arr[1]}月${arr[2]}日`;
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  h1 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 14px;
    font-weight: normal;
  }
}

.body {
  p {
    margin-top: 0px;
  }
  > div {
    width: 100%;
    text-align: center;
  }
  .img {
    width: 100%;
    height: 56.25%;
    max-width: 400px;
  }
}

.article {
  position: relative;
  margin-bottom: 30px;
}

.title {
  width: fit-content;
  position: relative;
  margin: auto;
}

.tag-container {
  position: absolute;
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
}
.tag{
  margin-left: -100%;
  font-weight: normal;
  margin-right: 10px;
  a {
    color: inherit;
    text-decoration: none;
  }
}

@media screen and (max-width: 800px) {
  .title-span {
    font-size: 18px;
  }
  .header {
    h2 {
      font-size: 12px;
    }
  }
}

.link {
  position: relative;
  z-index:10;
  color: black;
  text-decoration: none;
}

.link:hover {
  color: var(--el-color-primary);
}
</style>