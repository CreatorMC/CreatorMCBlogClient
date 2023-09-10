<template>
  <div>
    <StartScreenComponent v-if="isShowStratScreen" @close="closeStartScreen" />
    <div id="main-container" class="main-container">
      <div class="seat"></div>
      <el-row :gutter="30">
        <el-col :sm="24" :md="16">
          <ArticleListComponent :articles="articles" />
        </el-col>
        <el-col class="gutter-v" :sm="24" :md="8">
          <el-card shadow="hover">
            <div class="avatar">
              <el-avatar :size="100" shape="circle" src="/img/avatar.png" fit="cover"></el-avatar>
              <h1>创造者MC</h1>
              <div class="icon">
                <a href="https://github.com/CreatorMC" target="_blank"><el-icon><icon-svg name="icon-github" /></el-icon></a>
                <a href="https://gitee.com/creator-mc" target="_blank"><el-icon><icon-svg name="icon-gitee" /></el-icon></a>
                <a href="https://blog.csdn.net/weixin_59232910?type=blog" target="_blank"><el-icon><icon-svg name="icon-csdn" /></el-icon></a>
                <a href="https://space.bilibili.com/152404569" target="_blank"><el-icon><icon-svg name="icon-Bilibili" /></el-icon></a>
              </div>
            </div>
          </el-card>
          <HotArticleComponent :hotArticles="hotArticles" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import StartScreenComponent from '@/components/content/index/StartScreenComponent.vue';
import { articleList, hotArticleList } from '@/api/article';
import ArticleListComponent from '@/components/content/index/ArticleListComponent.vue';
import HotArticleComponent from '@/components/content/index/HotArticleComponent.vue';
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      categoryId: -1,
      isShowStratScreen: true,
      articles: [],
      hotArticles: []
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
    },
    /**
     * 查询浏览量前10条的文章
     */
    hotArticleList() {
      hotArticleList().then((response) => {
        if(response != null) {
          this.hotArticles = response.data;
        }
      });
    }
  },
  mounted() {
    this.articleList();
    this.hotArticleList();
  },
  components: { StartScreenComponent, ArticleListComponent, HotArticleComponent }
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

.avatar {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}

.icon {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  i {
    font-size: 2em;
    color: var(--el-color-info);
  }
  i:hover {
    color: var(--el-color-info-light-3);
  }
}

.gutter-v {
  > div {
    margin-bottom: 30px;
  }
}
</style>