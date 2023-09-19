import service from "../utils/request";

/**
 * 获取审核通过的友链
 * @returns 
 */
export function getAllLink() {
  return service.get("/link/getAllLink");
}