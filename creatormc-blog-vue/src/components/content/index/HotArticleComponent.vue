<template>
  <el-card shadow="hover">
    <template #header>
      <span class="hot-title">热门文章</span>
    </template>
    <div class="hot-article" v-for="item in hotArticles">
      <div class="hot-img">
        <el-image :src="item.thumbnail" fit="cover" :lazy="true">
          <template #error>
            <div class="el-image__error">
              暂无封面
            </div>
          </template>
        </el-image>
      </div>
      <div class="hot-body">
        <div class="hot-article-title"><router-link class="link" :to="`/index/article/${item.id}`">{{ item.title }}</router-link></div>
        <div class="hot-article-view">{{ item.viewCount }}浏览</div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "HotArticleComponent",
  props: {
    hotArticles: Array
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.hot-title {
  font-size: large;
  font-weight: bold;
}
.hot-article{
  display: flex;
  height: 56.25px;
  overflow: hidden;
  margin-bottom: 30px;
  .hot-body {
    display: flex;
    flex-direction: column;
    width: calc(100% - 110px);
    > div {
      flex: 1;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .hot-article-title {
      font-size: 14px;
      font-weight: bold;
    }
    .hot-article-view {
      font-size: 12px;
      color: gray;
    }
  }
  .hot-img {
    margin-right: 10px;
    div {
      width: 100px;
      height: 56.25px;
    }
  }
}
.link {
  position: relative;
  z-index:0;
  color: black;
  text-decoration: none;
}

.link:hover {
  color: var(--el-color-primary);
}
</style>