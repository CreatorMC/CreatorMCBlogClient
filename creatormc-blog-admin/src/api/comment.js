import service from "../utils/request";

/**
 * 分页查询评论列表
 * @param {*} pageNum 当前第几页
 * @param {*} pageSize 每页多少条
 * @param {*} dto 包含评论查询参数
 * @returns 
 */
export function getPageCommentList(pageNum, pageSize, dto) {
  return service.get("/content/comment/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: {
      pageNum,
      pageSize,
      content: dto.content,
      articleId: dto.articleId,
      createBy: dto.createBy
    }
  });
}

/**
 * 删除评论
 * @param {*} ids 评论id列表
 * @returns 
 */
export function deleteComment(ids) {
  return service.delete("/content/comment/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}