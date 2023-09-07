<template>
  <div id="container">
    <div>
      <el-image class="img-width" src="/img/404.png" fit="contain"></el-image>
      <span class="title">很抱歉！没有找到您要访问的页面！</span>
      <p style="font-size: 12px; width: 100%;">
        确保浏览器的地址栏中显示的网站地址的拼写和格式正确无误。<br>
        如果通过单击链接到达了该网页，请与我们联系，通知我们该链接的格式不正确。<br>
        单击后退按钮尝试另一个链接。<br>
        您可以尝试访问以下链接:
      </p>
      <div style="width: 100%;">
        <el-button type="primary" size="default">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  height: 100vh;
  background-color: #eafcfe;
  > div {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 100px;
    width: 480px;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.img-width {
  width: 400px;
}

.title {
  font-size: 30px;
  text-align: center;
  color: rgb(99, 99, 255)
}
</style>