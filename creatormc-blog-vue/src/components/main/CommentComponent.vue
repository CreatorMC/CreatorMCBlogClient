<template>
  <div>
    <el-card class="bottom" shadow="never">
      <el-space style="width: 100%;" alignment="normal" direction="vertical" size="default" wrap fill>
        <div class="title">发表评论</div>
        <el-input
          v-model="text"
          :rows="5"
          type="textarea"
          placeholder="想好说什么了吗？"
        />
        <EmojiComponent :emojiNames="emojiNames" :emojiMap="emojiMap" @addEmoji="addEmoji" />
        <el-button type="primary">发送</el-button>
        <div class="title">
          评论（{{ total }}）
        </div>
        <CommentItemComponent :commentList="commentList" />
      </el-space>
    </el-card>
  </div>
</template>

<script>
import { commentList } from '@/api/comment';
import EmojiComponent from './EmojiComponent.vue';
import CommentItemComponent from './CommentItemComponent.vue';
export default {
  name: "CommentComponent",
  props: [
    'id'
  ],
  data() {
    return {
      text: "",
      emojiMap: null,
      emojiNames: [
        "嘿嘿",
        "哈哈",
        "大笑",
        "嘻嘻",
        "斜眼笑",
        "苦笑",
        "笑得满地打滚",
        "笑哭了",
        "呵呵",
        "倒脸",
        "眨眼",
        "羞涩微笑",
        "微笑天使",
        "喜笑颜开",
        "花痴",
        "好崇拜哦",
        "飞吻",
        "微笑",
        "亲亲",
        "羞涩亲亲",
        "微笑亲亲",
        "含泪的笑脸",
        "好吃",
        "吐舌",
        "单眼吐舌",
        "滑稽",
        "眯眼吐舌",
        "挑眉",
        "得意",
        "流口水",
        "睡着了",
        "感冒",
        "脸发烧",
        "冷脸",
        "聚会笑脸",
        "墨镜笑脸",
        "不满",
        "吃惊",
        "脸红",
        "恳求的脸",
        "冷汗",
        "放声大哭",
        "吓死了",
        "困惑",
        "痛苦",
        "生气"
      ],
      //评论列表
      commentList: [],
      //总评论数
      total: 0,
      //查询第几页评论
      pageNum: 2,
      //每页多少条评论
      pageSize: 10
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
     * 获取文章评论列表
     */
    getCommentList() {
      commentList(this.id, this.pageNum, this.pageSize).then((response) => {
        if(response != null) {
          console.log(response);
          this.commentList = response.data.rows;
          this.total = response.data.total;
          this.pageNum++;
          let maxPage = Math.ceil(this.total / this.pageSize);
          if(this.pageNum > maxPage) {
            //TODO 没有下一页了
          }
        }
      });
    }
  },
  mounted() {
    this.emojiMap = new Map();
    this.emojiNames.forEach(name => {
      this.emojiMap.set(name, `/emoji/${name}.png`);
    });
    this.getCommentList();
  },
  components: { EmojiComponent, CommentItemComponent }
}
</script>

<style lang="scss" scoped>
.bottom {
  margin-bottom: 30px;
}
.title {
  font-size: large;
  font-weight: bold;
}
</style>    