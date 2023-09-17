<template>
  <el-space style="width: 100%;" alignment="normal" direction="vertical" size="default" wrap fill>
    <div class="title">发表评论</div>
    <el-input
      v-model="text"
      :rows="5"
      type="textarea"
      maxlength="512"
      show-word-limit
      placeholder="想好说什么了吗？"
    />
    <EmojiComponent :emojiNames="emojiNames" :emojiMap="emojiMap" @addEmoji="addEmoji" />
    <el-button type="primary" :loading="isLoading" @click="addComment">发送</el-button>
  </el-space>
</template>

<script>
import { addComment } from '@/api/comment';
import { ElMessage } from 'element-plus';
import EmojiComponent from './EmojiComponent.vue';
export default {
  name: "SendCommentComponent",
  props: {
    emojiNames: Array,
    emojiMap: Map,
    //评论类型 0代表文章评论，1代表友链评论
    type: String,
    //文章id
    articleId: String,
    //根评论id
    rootId: "-1",
    //所回复的目标评论的userid
    toCommentUserId: "-1",
    //回复目标评论id
    toCommentId: "-1"
  },
  emits: [
    'sendComment'
  ],
  data() {
    return {
      text: "",
      //评论是否正在发送
      isLoading: false
    };
  },
  methods: {
    /**
     * 在输入框中添加表情
     */
    addEmoji(name) {
      this.text += `[${name}]`;
    },
    /**
     * 添加评论
     */
    addComment() {
      if(this.text == "") {
        ElMessage.warning("评论内容不能为空");
        return;
      }
      this.isLoading = true;
      addComment({
        type: this.type,
        articleId: this.articleId,
        rootId: this.rootId,
        content: this.text,
        toCommentUserId: this.toCommentUserId,
        toCommentId: this.toCommentId
      }).then((response) => {
        if(response != null) {
          ElMessage.success("发送成功");
          this.$emit('sendComment');
        }
      }).finally(() => {
        this.isLoading = false;
      })
    }
  },
  components: { EmojiComponent }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: large;
  font-weight: bold;
}
</style>