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
                      <el-tag class="tag" type="info"><router-link :to="`/index/category/${article.categoryId}`">{{ article.categoryName }}</router-link></el-tag>
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
            <LikeComponent ref="like" :id="id" @updateLikeCount="updateLikeCount" @updateIsLiked="updateIsLiked" />
          </el-card>
          <CommentComponent ref="comment" :id="id" type="0" @updateTotal="updateCommentTotal" />
        </el-col>
        <RightSideComponent>
          <DirectoryComponent ref="directory" />
        </RightSideComponent>
      </el-row>
    </div>
    <ToTopComponent />
    <SideBarComponent v-show="isFinish" :commentTotal="commentTotal" :likeCount="likeCount" :isLiked="isLiked" :article="article" @toComment="toComment" @clickLike="clickLike" />
  </div>
</template>

<script>
import RightSideComponent from '@/components/content/index/RightSideComponent.vue';
import { getArticle } from '@/api/article';
import { updateViewCount } from '@/api/article';
import CommentComponent from '@/components/main/comment/CommentComponent.vue';
import { createApp } from 'vue';
import CopyButtonComponentVue from '@/components/utils/CopyButtonComponent.vue';
import ToTopComponent from '@/components/utils/ToTopComponent.vue';
import LikeComponent from '@/components/content/article/LikeComponent.vue';
import DirectoryComponent from '@/components/content/article/DirectoryComponent.vue';
import SideBarComponent from '@/components/content/article/SideBarComponent.vue';

export default {
  props: [
    "id"
  ],
  data() {
    return {
      article: {},
      commentTotal: '0',
      likeCount: '0',
      isLiked: false,
      //是否完成查询文章
      isFinish: false
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
          this.$nextTick(this.publishCode);
          this.$nextTick(this.$refs.directory.init);
          this.isFinish = true;
          //确保文章存在，才更新浏览量
          this.updateViewCount();
        }
      })
    },
    /**
     * 更新对应文章的浏览量
     */
    updateViewCount() {
      updateViewCount(this.id).then((response) => {
        if(response != null) {
          //成功
          this.article.viewCount = response.data;
        }
      });
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
    },
    /**
     * 给代码区域添加语言显示和复制按钮
     */
    publishCode() {
      let codes = document.getElementsByClassName('hljs');
      for (let index = 0; index < codes.length; index++) {
        let item = codes[index];
        //添加语言标签
        let element = document.createElement('div');
        element.classList.add('mark-down-code-language');
        element.innerHTML = item.classList[1].substring(item.classList[1].indexOf('-') + 1);
        item.parentElement.style.position = 'relative';
        item.parentElement.appendChild(element);
        //添加复制按钮
        const copyButton = createApp(CopyButtonComponentVue, {
          code: item.innerText
        });
        let elementTwo = document.createElement('div');
        elementTwo.classList.add('mark-down-code-copy');
        elementTwo.style.right = element.clientWidth + "px";
        copyButton.mount(elementTwo);
        item.parentElement.appendChild(elementTwo);
      }
    },
    /**
     * 跳转到评论的位置
     */
    toComment() {
      this.$refs.comment.$el.scrollIntoView({
        behavior: 'smooth'
      });
    },
    /**
     * 更新总评论数
     */
    updateCommentTotal(value) {
      this.commentTotal = value;
    },
    /**
     * 更新总点赞数
     */
    updateLikeCount(value) {
      this.likeCount = value;
    },
    /**
     * 更新是否被点赞过
     */
    updateIsLiked(value) {
      this.isLiked = value;
    },
    /**
     * 侧边栏按钮点击点赞
     */
    clickLike() {
      this.$refs.like.updateLikeCount();
    }
  },
  mounted() {
    // 页面刚加载时
    this.getArticle();
  },
  watch: {
    id(val, oldVal) {
      // id改变时刷新页面
      this.getArticle();
      this.$refs.comment.cancelAjax();
      this.$refs.comment.refreshCommentList(val);
    }
  },
  components: { RightSideComponent, CommentComponent, ToTopComponent, LikeComponent, DirectoryComponent, SideBarComponent }
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