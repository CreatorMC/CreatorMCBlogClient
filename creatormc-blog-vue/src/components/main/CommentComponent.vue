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
        <el-tabs id="emoji" v-if="isShowEmoji" type="border-card" tab-position="top" tabindex="0" :onblur="hideEmoji">
          <el-tab-pane>
            <template #label>
              <img style="width: 2em; height: 2em;" src="/emoji/羞涩微笑.png">
            </template>
            <div class="emoji-container">
              <div v-for="item in emojiNames" @click="addEmoji(item)">
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
        <el-button type="primary">发送</el-button>
      </el-space>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CommentComponent",
  data() {
    return {
      text: "",
      isShowEmoji: false,
      emojiMap: null,
      emojiNames: [
        '嘿嘿',
        '哈哈',
        '大笑',
        '嘻嘻',
        '斜眼笑',
        '苦笑',
        '笑得满地打滚',
        '笑哭了',
        '呵呵',
        '倒脸',
        '眨眼',
        '羞涩微笑',
        '微笑天使',
        '喜笑颜开',
        '花痴',
        '好崇拜哦',
        '飞吻',
        '微笑',
        '亲亲',
        '羞涩亲亲',
        '微笑亲亲',
        '含泪的笑脸',
        '好吃',
        '吐舌',
        '单眼吐舌',
        '滑稽',
        '眯眼吐舌',
        '挑眉',
        '得意',
        '流口水',
        '睡着了',
        '感冒',
        '脸发烧',
        '冷脸',
        '聚会笑脸',
        '墨镜笑脸',
        '不满',
        '吃惊',
        '脸红',
        '恳求的脸',
        '冷汗',
        '放声大哭',
        '吓死了',
        '困惑',
        '痛苦',
        '生气'
      ]
    }
  },
  methods: {
    /**
     * 显示表情框
     */
    showEmoji() {
      this.isShowEmoji = true;
       setTimeout(() => {
        document.getElementById('emoji').focus();
       }, 100);
    },
    /**
     * 隐藏表情框
     */
    hideEmoji() {
      this.isShowEmoji = false;
    },
    /**
     * 在输入框中添加表情
     */
    addEmoji(name) {
      console.log("执行");
      this.text += `[${name}]`;
    }
  },
  mounted() {
    this.emojiMap = new Map();
    this.emojiNames.forEach(name => {
      this.emojiMap.set(name, `/emoji/${name}.png`);
    });
  }
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