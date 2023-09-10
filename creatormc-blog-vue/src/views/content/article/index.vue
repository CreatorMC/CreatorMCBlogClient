<template>
  <div>
    <div id="main-container" class="main-container">
      <div class="seat"></div>
      <el-row :gutter="30">
        <el-col :sm="24" :md="16">
          <el-card class="article" shadow="never">
            <template #header>
              <div class="header">
                <h1>
                  <div class="title">
                    <div class="tag-container">
                      <el-tag class="tag" type="info">{{ article.categoryName }}</el-tag>
                    </div>
                    <span class="title-span">{{ article.title }}</span>
                  </div>
                </h1>
                <h2 style="color: gray;">
                  <icon-svg name="icon-user" />发表于&nbsp;<icon-svg name="icon-time-circle-fill" />{{ publishTime(article.createTime) }}&nbsp;<icon-svg name="icon-eye-fill" />{{ article.viewCount }}次围观
                </h2>
              </div>
            </template>
            <div class="content" v-html="article.content"></div>
          </el-card>
        </el-col>
        <RightSideComponent />
      </el-row>
    </div>
  </div>
</template>

<script>
import RightSideComponent from '@/components/content/index/RightSideComponent.vue';
import { getArticle } from '@/api/article';

export default {
  props: [
    "id"
  ],
  data() {
    return {
      article: {}
    };
  },
  methods: {
    /**
     * 查询文章详情
     */
    getArticle() {
      getArticle(this.id).then((response) => {
        if(response != null) {
          this.article = response.data;
          this.article.content = this.$markdown.parse(response.data.content);
        }
      })
    },
    /**
     * 得到发布时间
     * https://github.com/hy-inger/hy-inger.github.io/issues/7
     */
    publishTime(str) {
      if(!str) {
        return;
      }
      let date = str.split(' ')[0];
      let arr = date.split('-');
      return `${arr[0]}年${arr[1]}月${arr[2]}日`;
    }
  },
  mounted() {
    this.getArticle();
  },
  components: { RightSideComponent }
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
</style>

<style lang="scss">
.content {
  img {
    width: 100%;
  }
  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }
}
</style>