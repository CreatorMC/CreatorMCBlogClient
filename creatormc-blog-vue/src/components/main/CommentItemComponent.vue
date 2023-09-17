<template>
  <div>
    <template v-for="item in commentList">
      <div class="comment-container">
        <div>
          <el-avatar shape="circle" :src="item.avatar ? item.avatar : '/img/default_avatar.png'" fit="cover"></el-avatar>
        </div>
        <div>
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
        </div>
      </div>
      <div class="children" v-if="item.children && item.children.length > 0">
        <CommentItemComponent :commentList="item.children" :emojiMap="emojiMap" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "CommentItemComponent",
  props: {
    commentList: Array,
    emojiMap: Map
  },
  data() {
    return {

    }
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
        if(startIndex == -1 && c == '[') {
          startIndex = index;
        } else if(startIndex != -1 && c == ']') {
          stringBuilder += this.emojiMap.has(tempString) ? `<img src="${this.emojiMap.get(tempString)}">` : `[${tempString}]`;
          startIndex = -1;
          tempString = "";
        } else if(startIndex != -1) {
          tempString += c;
        } else {
          stringBuilder += c;
        }
        //把未闭合的方括号里的内容加上
        if(index == text.length - 1 && tempString != "") {
          stringBuilder += `[${tempString}`;
        }
      }
      return stringBuilder;
    }
  }
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
}
.children{
  margin-left: 50px;
}
</style>