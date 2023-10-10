<template>
  <div>
    <el-card class="bottom" shadow="never">
      <el-space style="width: 100%;" alignment="normal" direction="vertical" size="default" wrap fill>
        <SendCommentComponent
          v-if="enable"
          :emojiNames="emojiNames"
          :emojiMap="emojiMap"
          :type="type"
          :articleId="id"
          @sendComment="refreshCommentList(id)" />
        <div class="load" v-else>该文章已禁止评论</div>
        <div class="title">
          评论（{{ total }}）
        </div>
        <CommentItemComponent
          :commentList="commentList"
          :emojiMap="emojiMap"
          :emojiNames="emojiNames"
          :type="type"
          :articleId="id"
          :enable="enable"
          @sendComment="refreshCommentList(id)" />
        <div class="load" ref="load">
          <LoadingComponent v-if="isLoading" />
          {{ loadText }}
        </div>
      </el-space>
    </el-card>
  </div>
</template>

<script>
import { commentList, linkCommentList } from '@/api/comment';
import CommentItemComponent from './CommentItemComponent.vue';
import SendCommentComponent from './SendCommentComponent.vue';
import LoadingComponent from '@/components/utils/LoadingComponent.vue';

export default {
  name: "CommentComponent",
  props: [
    'id',
    //评论类型 0代表文章评论，1代表友链评论
    'type',
    'enable'
  ],
  emits: [
    'updateTotal'
  ],
  expose: [
    'refreshCommentList',
    'cancelAjax',
    'getTotal'
  ],
  data() {
    return {
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
      pageNum: 1,
      //每页多少条评论
      pageSize: 10,
      //加载文本
      loadText: "滑动加载",
      //是否在加载评论
      isLoading: false,
      //是否禁用加载评论
      isDisabled: false,
      //用于限制滚动事件的连续触发，避免造成连续请求
      isScroll: false,
      //用于在外层组件调用刷新方法时取消旧的请求
      controller: new AbortController()
    };
  },
  methods: {
    /**
     * 刷新文章评论列表
     */
    refreshCommentList(id) {
      this.pageNum = 1;
      this.loadText = "滑动加载",
      this.isDisabled = false,
      this.commentList.splice(0, this.commentList.length);
      this.getCommentList(id);
    },
    /**
     * 取消请求
     */
    cancelAjax() {
      //取消旧的请求
      this.controller.abort();
      this.isLoading = false;
      this.isScroll = false;
      this.controller = new AbortController();
    },
    /**
     * 获取文章评论列表
     */
    getCommentList(id) {
      //加锁，防止重复请求
      if(this.isLoading) {
        return;
      }
      this.isLoading = true;
      if(this.type == '0') {
        commentList(id, this.pageNum, this.pageSize, { signal: this.controller.signal }).then((response) => {
          if(response != null) {
            this.commentList = this.commentList.concat(response.data.rows);
            this.total = response.data.total;
            this.pageNum++;
            let maxPage = Math.ceil(this.total / this.pageSize);
            if(this.pageNum > maxPage) {
              this.loadText = "没有更多评论了(。・∀・)~~~"
              this.isDisabled = true;
            }
          }
        }).finally(() => {
          this.isLoading = false;
          this.isScroll = false;
        })
      } else {
        linkCommentList(this.pageNum, this.pageSize, { signal: this.controller.signal }).then((response) => {
          if(response != null) {
            this.commentList = this.commentList.concat(response.data.rows);
            this.total = response.data.total;
            this.pageNum++;
            let maxPage = Math.ceil(this.total / this.pageSize);
            if(this.pageNum > maxPage) {
              this.loadText = "没有更多评论了(。・∀・)~~~"
              this.isDisabled = true;
            }
          }
        }).finally(() => {
          this.isLoading = false;
          this.isScroll = false;
        })
      }
    },
    /**
     * 页面滚动时触发，为了滚动到底部加载评论
     */
    scrollHandler() {
      let windowHeight = document.documentElement.clientHeight;
      let loadTop = this.$refs.load.getBoundingClientRect().top;
      if(!this.isScroll && loadTop < windowHeight && !this.isDisabled) {
        //加载组件在窗口的下方，刚刚被用户看到时
        this.isScroll = true;
        this.getCommentList(this.id);
      }
    },
    /**
     * 获取一共几条评论
     */
    getTotal() {
      return this.total;
    }
  },
  mounted() {
    this.emojiMap = new Map();
    this.emojiNames.forEach(name => {
      this.emojiMap.set(name, `/emoji/${name}.png`);
    });
    this.getCommentList(this.id);
    //监听页面滚动事件
    addEventListener("scroll", this.scrollHandler);
  },
  unmounted() {
    //取消监听事件
    removeEventListener("scroll", this.scrollHandler);
  },
  watch: {
    total(val, oldVal) {
      this.$emit('updateTotal', val)
    }
  },
  components: { CommentItemComponent, SendCommentComponent, LoadingComponent }
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
.load {
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: gray;
  font-size: x-small;
}
</style>    