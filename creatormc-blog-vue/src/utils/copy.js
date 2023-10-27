/**
 * 复制文本
 * @param {*} t 要复制的文本
 * @param {*} success 复制成功调用的函数
 * @param {*} fail 复制失败调用的函数
 */
export function copyText(t, success, fail) {
  // 如果当前浏览器版本不兼容navigator.clipboard
  if (!navigator.clipboard) {
    var ele = document.createElement("textarea");
    ele.value = t;
    document.body.appendChild(ele);
    ele.select();
    var isSuccess = document.execCommand("copy");
    document.body.removeChild(ele);
    if (isSuccess) {
      //复制成功
      if(success) {
        success();
      }
    } else {
      //复制失败
      if(fail) {
        fail();
      }
    }
  } else {
    navigator.clipboard.writeText(t).then(function () {
      //复制成功
      if(success) {
        success();
      }
    }).catch(function () {
      //复制失败
      if(fail) {
        fail();
      }
    })
  }
}