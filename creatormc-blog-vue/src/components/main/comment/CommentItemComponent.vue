<template>
  <div>
    <template v-for="item, index in commentList">
      <div class="comment-container">
        <div>
          <router-link :to="`/index/user/${item.createBy}`">
            <el-avatar shape="circle" :src="item.avatar ? item.avatar : '/img/default_avatar.png'" fit="cover"></el-avatar>
          </router-link>
        </div>
        <div style="width: 100%;">
          <div class="header">
            <div v-if="item.rootId == '-1'" class="nick">
              {{ item.username }}
            </div>
            <div v-else class="nick">
              {{ item.username }}&nbsp;回复&nbsp;{{ item.toCommentUserName }}
            </div>
            <div class="time">
              {{ item.createTime }}
            </div>
          </div>
          <div v-html="parseEmoji(item.content)" class="comment"></div>
          <div>
            <el-button v-if="user && user.id && enable" type="primary" link @click="isShowSendComments[index] = !isShowSendComments[index]">{{ isShowSendComments[index] ? "取消回复" : "回复" }}</el-button>
            <el-button v-if="item.children && item.children.length > 0" type="primary" link @click="expand(index)">
              <template v-if="!isExpands[index]">
                {{ `${item.children.length}条评论` }}
                <el-icon><CaretRight /></el-icon>
              </template>
              <template v-else>
                {{ `收起(${item.children.length})` }}
                <el-icon><CaretBottom /></el-icon>
              </template>
            </el-button>
          </div>
          <SendCommentComponent style="margin-top: 10px;" v-show="isShowSendComments[index] && enable"
            :emojiNames="emojiNames"
            :emojiMap="emojiMap"
            :type="type"
            :articleId="articleId"
            :rootId="(item.rootId == '-1') ? item.id : item.rootId"
            :toCommentUserId="item.createBy"
            :toCommentId="item.id"
            @sendComment="$emit('sendComment')"
          />
        </div>
      </div>
      <CollapseComponent class="children" v-if="item.children && item.children.length > 0" :ref="`collapse${index}`" v-model="isExpands[index]" >
        <CommentItemComponent
          :commentList="item.children"
          :emojiMap="emojiMap"
          :emojiNames="emojiNames"
          :type="type"
          :articleId="articleId"
          :enable="enable"
          @sendComment="$emit('sendComment')" 
        />
      </CollapseComponent>
    </template>
  </div>
</template>

<script>
import { userStore } from '@/store/user';
import SendCommentComponent from './SendCommentComponent.vue';
import CollapseComponent from '@/components/utils/CollapseComponent.vue';

export default {
  name: "CommentItemComponent",
  props: {
    commentList: Array,
    emojiMap: Map,
    emojiNames: Array,
    type: String,
    articleId: String,
    enable: true
  },
  emits: [
    'sendComment'
  ],
  data() {
    return {
      user: userStore().user,
      //是否显示发送评论组件
      isShowSendComments: [],
      //评论是否展开
      isExpands: []
    };
  },
  methods: {
    /**
     * 转换评论里的表情
     */
    parseEmoji(text) {
      let startIndex = -1;
      let stringBuilder = "";
      let tempString = "";
      for (let index = 0; index < text.length; index++) {
        let c = text.charAt(index);
        if (startIndex == -1 && c == "[") {
          startIndex = index;
        }
        else if (startIndex != -1 && c == "]") {
          stringBuilder += this.emojiMap.has(tempString) ? `<img src="${this.emojiMap.get(tempString)}" alt="[${tempString}]">` : `[${tempString}]`;
          startIndex = -1;
          tempString = "";
        }
        else if (startIndex != -1) {
          tempString += c;
        }
        else {
          stringBuilder += c;
        }
        //把未闭合的方括号里的内容加上
        if (index == text.length - 1 && tempString != "") {
          stringBuilder += `[${tempString}`;
        }
      }
      return stringBuilder;
    },
    expand(index) {
      this.$refs[`collapse${index}`][0].changeStatus();
    }
  },
  mounted() {
    //初始化数组
    this.isShowSendComments = new Array(this.commentList.length).fill(false);
    this.isExpands = new Array(this.commentList.length).fill(false);
  },
  components: { SendCommentComponent, CollapseComponent }
}
</script>

<style lang="scss" scoped>
.comment-container {
  display: flex;
  padding: 20px 0px;
  border-top: 1px var(--el-border-color) var(--el-border-style);
  :deep(.el-avatar) {
    width: 65px;
    height: 65px;
    margin-right: 10px;
  }
  .header {
    height: 37px;
    margin-bottom: 10px;
    .nick {
      font-weight: bold;
      padding-bottom: 5px;
    }
    .time {
      font-size: x-small;
      color: gray;
    }
  }
  .comment :deep(img) {
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
    -webkit-user-drag: none;
  }
  :deep(.el-button.is-link) {
    padding: 0px;
    margin-top: 10px;
    font-size: x-small;
  }
}
.children{
  margin-left: 50px;
}
</style>