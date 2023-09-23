<template>
  <div class="container" @click="textCopy(code)">
    <el-tooltip
      effect="dark"
      content="复制代码"
      placement="top"
    >
      <el-icon class="icon"><IconSVGComponent :name="icon" /></el-icon>
    </el-tooltip>
  </div>
</template>

<script>
import IconSVGComponent from './IconSVGComponent.vue';
import { ElIcon, ElTooltip } from 'element-plus';

export default {
  name: "CopyButtonComponent",
  props: {
    //代码文本
    code: String
  },
  data() {
    return {
      icon: "icon-copy"
    }
  },
  methods: {
    /**
     * 复制文本
     */
    textCopy(t) {
      let that = this;
      // 如果当前浏览器版本不兼容navigator.clipboard
      if (!navigator.clipboard) {
        var ele = document.createElement("input");
        ele.value = t;
        document.body.appendChild(ele);
        ele.select();
        var isSuccess = document.execCommand("copy");
        document.body.removeChild(ele);
        if (isSuccess) {
          //复制成功
          that.copySuccess();
        } else {
          //复制失败
        }
      } else {
        navigator.clipboard.writeText(t).then(function () {
          //复制成功
          that.copySuccess();
        }).catch(function () {
          //复制失败
        })
      }
    },
    /**
     * 复制成功后调用
     */
    copySuccess() {
      this.icon = "icon-checked";
      setTimeout(() => {
        this.icon = "icon-copy"
      }, 3000)
    }
  },
  components: { IconSVGComponent, ElIcon, ElTooltip }
}
</script>

<style lang="scss" scoped>
.container {
  width: 13px;
  height: 13px;
  padding: 5px;
}
.icon {
  color: gray;
}
</style>