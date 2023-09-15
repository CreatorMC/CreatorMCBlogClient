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
          <div>{{ item.content }}</div>
        </div>
      </div>
      <div class="children" v-if="item.children && item.children.length > 0">
        <CommentItemComponent :commentList="item.children" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "CommentItemComponent",
  props: {
    commentList: Array
  },
  data() {
    return {

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
}
.children{
  margin-left: 50px;
}
</style>