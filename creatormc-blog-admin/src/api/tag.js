import service from "../utils/request";

/**
 * 查询所有标签
 * @returns 
 */
export function getAllTag() {
  return service.get("/content/tag/listAllTag", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}