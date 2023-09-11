<template>
  <div>
    <StartScreenComponent v-if="isShowStratScreen && categoryId == null" @close="closeStartScreen" />
    <div id="main-container" class="main-container">
      <div class="seat"></div>
      <el-row :gutter="30">
        <el-col :sm="24" :md="16">
          <ArticleListComponent :articles="articles" :isLoading="isLoading" :isDisable="isDisable" @loadMore="articleList" />
        </el-col>
        <RightSideComponent />
      </el-row>
    </div>
  </div>
</template>

<script>
import StartScreenComponent from '@/components/content/index/StartScreenComponent.vue';
import { articleList } from '@/api/article';
import ArticleListComponent from '@/components/content/index/ArticleListComponent.vue';
import RightSideComponent from '@/components/content/index/RightSideComponent.vue';
export default {
  props: {
    categoryId: null
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      // 显示开屏页
      isShowStratScreen: true,
      // 是否正在加载文章
      isLoading: false,
      // 加载更多按钮是否禁用
      isDisable: false,
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
      this.isLoading = true;
      articleList(this.pageNum, this.pageSize, this.categoryId).then((response) => {
        if(response != null) {
          this.articles = response.data.rows;
          this.isLoading = false;
          let maxPage = Math.ceil(parseFloat(response.data.total) / this.pageSize)
          if(this.pageNum >= maxPage) {
            this.isDisable = true;
          } else {
            this.isDisable = false;
            this.pageNum++;
          }
        }
      });
    }
  },
  mounted() {
    this.articleList();
  },
  watch: {
    categoryId(val, oldVal) {
      this.articleList();
    }
  },
  components: { StartScreenComponent, ArticleListComponent, RightSideComponent }
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