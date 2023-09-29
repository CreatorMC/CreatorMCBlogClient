<template>
  <div>
    <el-divider />
    <div class="container">
      <div class="text">如果觉得文章不错，请点个赞吧！(&gt;ω&lt;)</div>
      <div>
        <el-icon :class="isLiked ? 'icon-like' : ''" class="icon" @click="updateLikeCount"><icon-svg name="icon-like-fill" /></el-icon>
      </div>
      <div>
        {{ count }}
      </div>
    </div>
  </div>
</template>

<script>
import { getUserLike, getLikeCount, updateLikeCount } from '@/api/article';
import { ElMessage } from "element-plus";


export default {
  name: "LikeComponent",
  props: [
    'id'
  ],
  expose: [
    'updateLikeCount'
  ],
  emits: [
    'updateLikeCount',
    'updateIsLiked'
  ],
  data() {
    return {
      count: '0',
      //用户是否点赞了此文章
      isLiked: false
    };
  },
  methods: {
    /**
     * 查询对应文章是否被当前用户点赞过
     */
    getUserLike() {
      getUserLike(this.id).then((response) => {
        if(response != null) {
          this.isLiked = response.data;
        }
      });
    },
    /**
     * 查询对应文章的点赞量
     */
    getLikeCount() {
      getLikeCount(this.id).then((response) => {
        if(response != null) {
          this.count = response.data.likeCount;
        }
      });
    },
    /**
     * 更新对应文章的点赞量
     */
    updateLikeCount() {
      updateLikeCount(this.id).then((response) => {
        if(response != null) {
          ElMessage.success({
            message: this.isLiked ? '取消点赞成功' : '点赞成功',
            grouping: true
          });
          this.isLiked = !this.isLiked;
          this.getLikeCount();
        }
      });
    }
  },
  mounted() {
    this.getUserLike();
    this.getLikeCount();
  },
  watch: {
    id(val, oldVal) {
      this.$nextTick(() => {
        this.getUserLike();
        this.getLikeCount();
      })
    },
    count(val, oldVal) {
      this.$emit('updateLikeCount', val);
    },
    isLiked(val, oldVal) {
      this.$emit('updateIsLiked', val);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  .text {
    color: var(--el-color-info-dark-2);
  }
  .icon {
    font-size: x-large;
    color: var(--el-color-info-light-8);
    background-color: var(--el-color-info-dark-2);
    padding: 10px;
    border-radius: 50%;
    margin-top: 20px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .icon:hover {
    background-color: var(--el-color-info-light-3);
  }
  .icon:hover :deep(svg) {
    animation: shake 0.1s infinite;
  }
  .icon-like {
    color: var(--el-color-primary-light-3);
  }
  .icon-like:hover :deep(svg) {
    animation: none;
  }
}

@keyframes shake {
  0%,50%,100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}

</style>