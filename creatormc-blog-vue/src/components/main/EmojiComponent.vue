<template>
  <div>
    <el-tabs id="emoji" v-if="isShowEmoji" type="border-card" tab-position="top" tabindex="0" :onblur="hideEmoji">
      <el-tab-pane>
        <template #label>
          <img style="width: 2em; height: 2em;" src="/emoji/羞涩微笑.png">
        </template>
        <div class="emoji-container">
          <div v-for="item in emojiNames" @click="$emit('addEmoji', item)">
            <el-tooltip
              effect="dark"
              :content="item"
              placement="top"
            >
              <div>
                <img :src="emojiMap.get(item)" :alt="item">
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-button v-else style="max-width: fit-content;" plain @click="showEmoji">
      <img style="width: 2em; height: 2em;" src="/emoji/羞涩微笑.png">
    </el-button>
  </div>
</template>

<script>
export default {
  name: "EmojiComponent",
  emits: [
    'addEmoji'
  ],
  props: {
    emojiNames: Array,
    emojiMap: Map
  },
  data() {
    return {
      isShowEmoji: false,
    }
  },
  methods: {
    /**
     * 显示表情框
     */
    showEmoji() {
      this.isShowEmoji = true;
      setTimeout(() => {
        document.getElementById("emoji").focus();
      }, 100);
    },
    /**
     * 隐藏表情框
     */
    hideEmoji() {
      this.isShowEmoji = false;
    },
  }
}
</script>

<style lang="scss" scoped>
.emoji-container {
  display: flex;
  flex-wrap: wrap;
  > div {
    cursor: pointer;
    background-color: #f7f7f7;
    border-radius: 5px;
    padding: 5px;
    margin: 0px 5px 5px 0px;
    width: 2em;
    height: 2em;
  }
  > div:hover {
    background-color: #eee;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  img {
    width: 2em;
    height: 2em;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
  }
}
</style>