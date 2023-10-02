<template>
  <div class="container">
    <el-tooltip
      effect="dark"
      content="评论"
      placement="right"
    >
      <div class="item" @click="toComment">
        <el-icon><icon-svg name="icon-comment" /></el-icon>
        <div style="font-size: small;">{{ commentTotal }}</div>
      </div>
    </el-tooltip>
    <el-tooltip
      effect="dark"
      content="点赞"
      placement="right"
    >
      <div :class="isLiked ? 'liked' : ''" class="item" @click="clickLike">
        <el-icon><icon-svg name="icon-like" /></el-icon>
        <div style="font-size: small;">{{ likeCount }}</div>
      </div>
    </el-tooltip>
    <el-popover
      placement="right"
      :width="100"
    >
      <template #reference>
        <div class="item">
          <el-icon><icon-svg name="icon-share" /></el-icon>
        </div>
      </template>
      <div class="share-list">
        <div @click="shareLink">
          <el-icon><icon-svg name="icon-link" /></el-icon><div>&nbsp;复制链接</div>
        </div>
        <div @click="sharePic">
          <el-icon><icon-svg name="icon-image" /></el-icon><div>&nbsp;生成海报</div>
        </div>
        <div @click="shareQQ">
          <el-icon><icon-svg name="icon-QQ" /></el-icon><div>&nbsp;QQ分享</div>
        </div>
      </div>
    </el-popover>
    <ShareImgComponent :article="article" v-model="showShareImg" />
  </div>
</template>

<script>
import { copyText } from '@/utils/copy';
import { ElMessage } from 'element-plus';
import ShareImgComponent from './ShareImgComponent.vue';

export default {
  name: "SideBarComponent",
  props: {
    commentTotal: "0",
    likeCount: "0",
    isLiked: false,
    article: Object
  },
  emits: [
    "toComment",
    "clickLike"
  ],
  data() {
    return {
      showShareImg: false
    };
  },
  methods: {
    /**
     * 跳转到评论的位置
     */
    toComment() {
      this.$emit("toComment");
    },
    /**
     * 点击点赞
     */
    clickLike() {
      this.$emit("clickLike");
    },
    /**
     * 复制链接
     */
    shareLink() {
      copyText(location.href, () => {
        ElMessage.success("复制成功");
      });
    },
    /**
     * 生成海报
     */
    sharePic() {
      this.showShareImg = true;
    },
    /**
     * 分享到QQ
     */
    shareQQ() {
      let title = encodeURIComponent(this.article.title);
      // 分享内容链接
      let url = encodeURIComponent(location.href);
      // 分享图片的路径，多张图片以＂|＂隔开，可选参数
      let picurl = encodeURIComponent(this.article.thumbnail || "");
      let link = "http://connect.qq.com/widget/shareqq/index.html?title=" + title
        + "&url=" + url
        + "&pics=" + picurl;
      // 在新窗口中打开
      window.open(link, "_blank");
    }
  },
  components: { ShareImgComponent }
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  left: 4vw;
  top: $headHeight + 20px;
  .item {
    padding: 5px;
    border-radius: 50%;
    width: 49px;
    height: 49px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.85);
    margin-bottom: 20px;
    justify-content: center;
  }
  :deep(i) {
    font-size: 32px;
    color: var(--el-color-info-dark-2);
    transition: all 0.2s ease;
  }
  .item:hover :deep(i) {
    color: var(--el-color-primary-light-3);
  }
}
.liked :deep(i){
  color: var(--el-color-primary-light-3);
}

@media screen and (max-width: 800px) {
  .container {
    display: none;
  }
}

.share-list {
  > div {
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    height: 3em;
    align-items: center;
  }
  > div:hover {
    color: var(--el-color-primary-dark-2);
    background-color: var(--el-color-primary-light-7);
  }
  :deep(i) {
    font-size: large;
  }
}
</style>