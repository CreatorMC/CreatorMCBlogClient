<template>
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
</template>

<script>
import HotArticleComponent from '@/components/content/index/HotArticleComponent.vue';
import { hotArticleList } from '@/api/article';
export default {
  name: "RightSideComponent",
  data() {
    return {
      hotArticles: []
    };
  },
  methods: {
    /**
     * 查询浏览量前10条的文章
     */
    hotArticleList() {
      hotArticleList().then((response) => {
        if (response != null) {
          this.hotArticles = response.data;
        }
      });
    }
  },
  mounted() {
    this.hotArticleList();
  },
  components: { HotArticleComponent }
}
</script>

<style lang="scss" scoped>
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