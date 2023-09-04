import service from "../utils/request";

/**
 * 分页查询友链列表
 * @param {*} pageNum 当前第几页
 * @param {*} pageSize 每页几条数据
 * @param {*} dto 包括友链名和审核状态
 * @returns 
 */
export function getPageLinkList(pageNum, pageSize, dto) {
  return service.get("/content/link/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: {
      pageNum,
      pageSize,
      name: dto.name,
      status: dto.status
    }
  });
}