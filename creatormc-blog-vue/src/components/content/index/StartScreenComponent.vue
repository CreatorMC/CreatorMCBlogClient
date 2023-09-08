<template>
  <div class="top-container">
    <div class="tip">{{ showTip }}<span v-show="isShowCodeCursor" class="code-cursor">&ensp;</span></div>
    <div class="down" @click="intoHome">
      <div><span>点我进入主页</span></div>
      <el-icon class="anim">
        <icon-svg name="icon-double_arrow_down" />
      </el-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartScreenComponent",
  emits: [
    "close"
  ],
  data() {
    return {
      tips: [
        "永远保持对技术的好奇心",
        "技术学到最后一定都是简洁的"
      ],
      showTip: "",
      isShowCodeCursor: true
    };
  },
  methods: {
    /**
     * 主页开屏文字动画
     */
    tipShowAnimate() {
      let cursorTimer = setInterval(() => {
        this.isShowCodeCursor = !this.isShowCodeCursor;
      }, 500);
      // 3 秒后
      setTimeout(() => {
        let tip = this.tips[parseInt(Math.random() * this.tips.length)];
        let index = 0;
        let timer = setInterval(() => {
          if (index >= tip.length) {
            clearInterval(timer);
            clearInterval(cursorTimer);
            this.isShowCodeCursor = false;
            return;
          }
          this.showTip += tip.charAt(index);
          index++;
        }, 200);
      }, 3000);
    },
    /**
     * 鼠标滚动时触发
     */
    mouseRoll(e) {
      // 拦截事件，禁止滚动
      e.preventDefault();
      if(e.deltaY > 0) {
        this.intoHome();
      }
    },
    // 滚动到指定位置
    intoHome() {
      document.getElementById("main-container").scrollIntoView({
        behavior: "smooth"
      });
      setTimeout(() => {
        // 此组件要销毁了
        removeEventListener("wheel", this.mouseRoll, { passive: false });
        document.getElementsByTagName("body")[0].style.overflow = "";
        this.$emit("close");
      }, 1000)
    }
  },
  created() {
    // 确保用户在网页最上方
    window.onbeforeunload = ()=>{
      scrollTo(0,0);
    }
  },
  mounted() {
    // 给 body 添加样式，隐藏滚动条
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    // 展示开屏动画
    this.tipShowAnimate();
    // 监听鼠标滚轮滚动事件
    addEventListener("wheel", this.mouseRoll, { passive: false });
  }
}
</script>

<style lang="scss" scoped>
.top-container {
  width: 100%;
  height: 100vh;
  background: url("/img/index.png") no-repeat center;
  background-size: cover;
}
.bg {
  position: fixed;
  width: 100%;
  height: 100vh;
}
.tip {
  position: absolute;
  width: fit-content;
  height: fit-content;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  font-size: xx-large;
  font-weight: bold;
  color: white;
}
.code-cursor {
  display: inline-block;
  border-bottom: 5px solid #fff !important;
  height: 1em;
}
.down {
  position: absolute;
  bottom: 0px;
  font-size: 30px;
  color: #fff;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  width: fit-content;
  height: fit-content;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  span {
    font-size: 12px;
    animation: fade 3s linear infinite;
    -webkit-animation: fade 3s linear infinite;
  }
}

.anim {
  position: relative;
  opacity: 0.8;
  animation: moveDown 3s cubic-bezier(0.11, 0.69, 0.37, 0.97) infinite;
  -webkit-animation: moveDown 3s cubic-bezier(0.11, 0.69, 0.37, 0.97) infinite;
}

@keyframes moveDown {
  0%,17%,33% {
    top: 0px;
  }
  8%,25%{
    top: 10px;
  }
}

@-webkit-keyframes moveDown {
  0%,17%,33% {
    top: 0px;
  }
  8%,25%{
    top: 10px;
  }
}

@keyframes fade {
  0%,100% {
    opacity: 0;
  }
  50% {
    opacity: 100;
  }
}

@-webkit-keyframes fade {
  0%,100% {
    opacity: 0;
  }
  50% {
    opacity: 100;
  }
}
</style>