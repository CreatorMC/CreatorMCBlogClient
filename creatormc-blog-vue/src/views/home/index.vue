<template>
  <div>
    <StartScreenComponent v-if="isShowStratScreen && categoryId == null" @close="closeStartScreen" />
    <div id="main-container" class="main-container">
      <div class="seat"></div>
      <el-row :gutter="gutter">
        <el-col :sm="24" :md="16">
          <ArticleListComponent :articles="articles" :isLoading="isLoading" :isDisable="isDisable" @loadMore="articleList" />
        </el-col>
        <RightSideComponent />
      </el-row>
    </div>
    <ToTopComponent />
  </div>
</template>

<script>
import StartScreenComponent from '@/components/content/index/StartScreenComponent.vue';
import { articleList } from '@/api/article';
import ArticleListComponent from '@/components/content/index/ArticleListComponent.vue';
import RightSideComponent from '@/components/content/index/RightSideComponent.vue';
import ToTopComponent from '@/components/utils/ToTopComponent.vue';
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
          this.articles.push(...response.data.rows)
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
      //重置相关属性
      this.pageNum = 1;
      this.pageSize = 10;
      this.articles = [];
      //重新请求
      this.articleList();
    }
  },
  computed: {
    gutter() {
      return window.innerWidth <= 800 ? 5 : 30;
    }
  },
  components: { StartScreenComponent, ArticleListComponent, RightSideComponent, ToTopComponent }
}
</script>

<style lang="scss" scoped>
</style>