<template>
  <el-dialog class="czzmc-img-container" v-model="showDialog" title="分享">
    <canvas id="shareCanvas" width="400" height="500"></canvas>
  </el-dialog>
</template>

<script>
import QRCode from 'qrcode';
import { writeText, writeImage } from '@/utils/canvas';

export default {
  name: "ShareImgComponent",
  props: {
    modelValue: false,
    article: Object
  },
  emits: [
    'update:modelValue'
  ],
  data() {
    return {

    }
  },
  methods: {
    drawImg() {
      let that = this;
      /**
       * 分享所需的图片全部加载完成后调用
       */
      function startDraw(imgObjs) {
        //获取 canvas
        let canvas = document.getElementById("shareCanvas");
        let ctx = canvas.getContext("2d");
        //按照自定义的类型字段排序
        imgObjs.sort((a, b) => {
          return a.srcType - b.srcType;
        })
        //画缩略图
        writeImage(ctx, imgObjs[0], 0, 0, 400, 224);
        //画背景图
        ctx.drawImage(imgObjs[1], 0, 0);
        //画标题
        ctx.font = "bold 18px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif";
        ctx.fillStyle = "#000000";
        writeText(ctx, that.article.title, 339, 42, 30, 249, 6, 18);
        //画分类
        ctx.font = "14px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif";
        ctx.fillStyle = "#ff0000";
        writeText(ctx, "分类：" + that.article.categoryName, 319, 18, 20, 297, 6, 18);
        //画摘要
        ctx.fillStyle = "#6a6a6a";
        writeText(ctx, that.article.summary, 359, 84, 20, 321, 6, 14);
        //画二维码
        ctx.drawImage(imgObjs[2], 305, 406);
      }

      QRCode.toDataURL(window.location.href, {
        margin: 0,
        width: 64
      }).then(url => {

        //存储需要加载的图片地址
        //srcType是为了标识这个图片是什么内容，也可以标识画图时的顺序
        let srcList = [
          {
            src: this.article.thumbnail,
            //缩略图
            srcType: 0
          },
          {
            src: '/img/share_bg.png',
            //背景图
            srcType: 1
          },
          {
            src: url,
            //二维码
            srcType: 2
          }
        ];
        //存储加载完成的图片对象
        let imgObjs = [];

        //预加载多张图片
        let count = 0;
        for(let i = 0; i < srcList.length; i++) {
          let img = new Image();
          //加载成功或失败都会触发
          img.onload = img.onerror = function () {
            count++;
            imgObjs.push(img);
            if(count >= srcList.length) {
              //图片全部加载完成
              startDraw(imgObjs);
            }
          }
          //增加的自定义字段
          img.srcType = srcList[i].srcType;
          //开始加载
          img.src = srcList[i].src;
        }

      }).catch(err => {
        console.error(err);
      })
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  watch: {
    showDialog(val, oldVal) {
      if(val) {
        this.$nextTick(() => {
          this.drawImg();
        })
      }
    }
  }
}
</script>

<style lang="scss">
.czzmc-img-container {
  width: fit-content;
  height: 500px;
}
.czzmc-img-container .el-dialog__header {
  display: none;
}
.czzmc-img-container .el-dialog__body {
  padding: 0px;
}
</style>