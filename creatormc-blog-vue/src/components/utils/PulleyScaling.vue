<template>
    <div id="productDrawing">
      <div class="alert">温馨提示：查看图纸时滚动鼠标可以放大缩小</div>
      <div class="productDrawing_Img" @mousewheel="handerPictu">
        <img
          id="oImg"
          src="/img/index.png"
          alt=""
          :style="{ width: imgWidth, height: imgHeight }"
        />
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        imgWidth: "auto",
        imgHeight: "auto",
      };
    },
    mounted() {},
    methods: {
      handerPictu(e) {
        const img = document.getElementById("oImg");
        console.log(img.offsetWidth, img.width, img.clientWidth);
        this.imgWidth = img.offsetWidth || img.width || img.clientWidth;
        this.imgHeight = img.offsetHeight || img.height || img.clientHeight;
        if (e.deltaY > 0) {
          console.log("鼠标向下滚动，图片缩小");
          this.imgWidth = `${this.imgWidth - 10}px`;
          this.imgHeight = `${this.imgHeight - 10}px`;
        } else {
          console.log("鼠标向上滚动，图片放大");
          this.imgWidth = `${this.imgWidth + 10}px`;
          this.imgHeight = `${this.imgHeight + 10}px`;
        }
        //   this.imgWidth = `${this.imgWidth}px`;
        console.log(this.imgWidth, this.imgHeight, "hou");
      },
    },
  };
  </script>
  <style scoped lang="scss">
  #productDrawing {
    width: 580px;
    height: 480px;
    border: 1px solid #edf1f5;
    overflow: hidden;
    .alert {
      height: 30px;
      font-size: 12px;
      line-height: 30px;
      border-radius: 2px;
      color: #9e7700;
      text-align: center;
      background: linear-gradient(90deg, #ffffff 0%, #fff7d3 50%, #fcfcfc 100%);
    }
    .productDrawing_Img {
      width: 580px;
      height: 450px;
      overflow: hidden;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  </style>