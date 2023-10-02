/**
 * 在 canvas 上画文字
 * @param {*} ctx 画笔
 * @param {*} text 要画的文字
 * @param {*} areaWidth 文字允许最大宽度
 * @param {*} areaHeight 文字允许最大高度
 * @param {*} startX 开始画文字的 x 坐标
 * @param {*} startY 开始画文字的 y 坐标
 * @param {*} topMargin 行距
 * @param {*} fontHeight 一个字的高度（行高）
 */
export function writeText(ctx, text, areaWidth, areaHeight, startX, startY, topMargin, fontHeight) {
  let rowWidth = 0;   //当前行宽度
  let rowHeight = 0;  //当前行高度
  for (let index = 0; index < text.length; index++) {
    let c = text[index];
    const t = ctx.measureText(c);
    //超前一个判断能不能容下，当不能容下时，当前画省略号
    if(rowHeight + fontHeight + topMargin + fontHeight > areaHeight && rowWidth + t.width + t.width > areaWidth) {
      c = '...';
    }
    //这一行可以容得下
    if(rowHeight + fontHeight <= areaHeight) {
      //当前行还没有满，可以继续画文字
      if(rowWidth + t.width <= areaWidth) {
        ctx.fillText(c, startX + rowWidth, startY + rowHeight);
        rowWidth += t.width;
      } else {
        //当前行满了，需要画到下一行去
        rowHeight += (fontHeight + topMargin);
        //重置当前行宽度，因为换到新的一行了
        rowWidth = 0;
        //让这个字画出来，别被跳过
        index--;
        continue;
      }
    } else {
      //容不下了
      break;
    }
  }
}

/**
 * 在 canvas 上按比例剪裁图片并绘制
 * @param {*} ctx 画笔
 * @param {*} imgObj 图片对象
 * @param {*} startX 开始画图片的 x 坐标
 * @param {*} startY 开始画图片的 y 坐标
 * @param {*} aimWidth 目标图片宽度
 * @param {*} aimHeight 目标图片高度
 */
export function writeImage(ctx, imgObj, startX, startY, aimWidth, aimHeight) {
  let sw = aimWidth;
  let sh = aimHeight;
  let sx = 0;
  let sy = 0;
  //目标宽高比
  let rate = aimWidth / aimHeight;
  if(imgObj.width != aimWidth || imgObj.height != aimHeight) {
    //先以宽计算
    sw = imgObj.width;
    sh = imgObj.width / rate;
    sy = imgObj.height / 2 - sh / 2;
    if(sh > imgObj.height) {
      //有空白，以高计算
      sy = 0;
      sw = imgObj.height * rate;
      sh = imgObj.height;
      sx = imgObj.width / 2 - sw / 2;
    }
  }
  ctx.drawImage(imgObj, sx, sy, sw, sh, startX, startY, aimWidth, aimHeight);
}