<template>
  <el-card class="container" shadow="hover">
    <template #header>
      <span class="hot-title">文章目录</span>
    </template>
    <div ref="directoryBody" class="body">
    </div>
  </el-card>
</template>

<script>
export default {
  name: "DirectoryComponent",
  expose: [
    'init'
  ],
  data() {
    return {
      titleNodes: []
    }
  },
  methods: {
    /**
     * 初始化组件，生成标题列表
     * 为了确保当此组件加载时，外层组件已经渲染了文章内容，此方法需要暴露给外部
     */
    init() {
      this.titleNodes = document.getElementsByClassName("creatormc-article-markdown-title");
      let rootNode = document.createElement("div");
      let that = this;
      /**
       * 递归拼装目录
       */
      function dfs(index, level) {
        if(level > 6) {
          //超过标题等级
          return [null, index - 1];
        }
        const node = document.createElement("ul");
        while(index < that.titleNodes.length) {
          const element = that.titleNodes[index];
          const subLevel = parseInt(element.nodeName.substring(element.nodeName.length - 1));
          if(subLevel == level) {
            //同级
            const temp = document.createElement("li");
            temp.innerHTML = `<span>${element.innerText}</span>`
            temp.addEventListener("click", that.toTitle(element));
            node.appendChild(temp);
          } else if(subLevel > level) {
            //下一级
            const results = dfs(index, level + 1);
            node.appendChild(results[0]);
            index = results[1];
          } else {
            //父级
            return [node, index - 1];
          }
          index++;
        }
        return [node, index - 1];
      }

      rootNode.appendChild(dfs(0, 1)[0]);
      this.$refs.directoryBody.appendChild(rootNode);
    },
    /**
     * 跳转到某一标题位置
     */
    toTitle(node) {
      return () => {
        node.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: sticky;
  top: $headHeight + 20;
}
.hot-title {
  font-size: large;
  font-weight: bold;
}
.body {
  margin: calc(-1 * var(--el-card-padding));
  :deep(ul),:deep(li) {
    list-style: disc;
  }
  > :deep(div) {
    margin-left: var(--el-card-padding);
  }
  :deep(ul) {
    padding-inline-start: 20px;
  }
  :deep(li) {
    margin: 10px 0px;
    cursor: pointer;
  }
  :deep(li):hover {
    color: var(--el-color-primary-dark-2);
  }
}
</style>