<template>
  <div>
    <el-container>
      <el-header class="header"><TopBarComponent /></el-header>
      <div>
        <router-view></router-view>
      </div>
      <el-footer class="footer">
        <div>
          <p>
            <router-link to="/index/link">友情链接</router-link>
            <router-link to="/index/protocol">网站协议</router-link>
            <router-link to="/index/about">关于我</router-link>
          </p>
          <div>
            <a href="https://beian.miit.gov.cn/" target="_blank">ICP备</a>
          </div>
        </div>
      </el-footer>
    </el-container>
    <el-image class="bg-img" :src="backgroundImg" fit="cover" draggable="false" @contextmenu="rightClick"></el-image>
  </div>
</template>

<script>
import { getRandomImg } from '@/api/login';
import TopBarComponent from '@/components/main/TopBarComponent.vue';
export default {
  data() {
    return {
      backgroundImg: ""
    };
  },
  methods: {
    rightClick(e) {
      //禁止右键保存图片
      e.preventDefault();
    }
  },
  mounted() {
    getRandomImg().then((response) => {
      this.backgroundImg = response.data;
    });
  },
  components: { TopBarComponent }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 500;
  width: 100vw;
  height: $headHeight;
  left: 0;
  top: 0;
  background-color: $headSubMenuBgColor;
  backdrop-filter: blur(4px);
  padding: 0px;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}
.bg-img {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100%;
  z-index: -10;
  filter: brightness(80%);
  //禁止选中背景图片
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.footer {
  --el-footer-padding: 20px;
  text-align: center;
  color: #888a8f;
  height: 100px;
  background-color: #323335;
  font-size: 0.9em;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: inherit;
    text-decoration: none;
  }
  p {
    margin-block-start: 0em;
    >a+a:before {
      content: "";
      width: 4px;
      height: 4px;
      margin: 0 0.5em;
      border-radius: 50%;
      display: inline-block;
      vertical-align: 0.2em;
      background-color: #888a8f;
    }
  }
}
</style>