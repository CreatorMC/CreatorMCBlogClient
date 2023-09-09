<template>
  <div>
    <StartScreenComponent v-if="isShowStratScreen" @close="closeStartScreen" />
    <div id="main-container" class="main-container">
      <div class="seat"></div>
      <el-row :gutter="30">
        <el-col :sm="24" :md="16">
          <ArticleListComponent :articles="articles" />
        </el-col>
        <el-col :sm="24" :md="8">第二列</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import StartScreenComponent from '@/components/content/index/StartScreenComponent.vue';
import { articleList } from '@/api/article';
import ArticleListComponent from '@/components/content/index/ArticleListComponent.vue';
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      categoryId: -1,
      isShowStratScreen: true,
      articles: []
    }
  },
  methods: {
    closeStartScreen() {
      this.isShowStratScreen = false;
    },
    /**
     * 查询文章列表
     */
    articleList() {
      articleList(this.pageNum, this.pageSize, this.categoryId == -1 ? null : this.categoryId).then((response) => {
        if(response != null) {
          this.articles = response.data.rows;
        }
      });
    }
  },
  mounted() {
    this.articleList();
  },
  components: { StartScreenComponent, ArticleListComponent }
}
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
}

@media screen and (max-width: 800px) {
  .main-container {
    max-width: 95% !important;
  }
}

.seat {
  height: calc($headHeight + 20px);
}
</style>