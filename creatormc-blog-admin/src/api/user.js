import service from "../utils/request";

/**
 * 获取当前用户信息
 * @returns 
 */
export function getAdminUserInfo() {
  return service.get("/getInfo", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 分页查询用户列表
 * @param {*} pageNum 第几页
 * @param {*} pageSize 每页几条记录
 * @param {*} dto 表单对象
 * @returns 
 */
export function getPageUserList(pageNum, pageSize, dto) {
  return service.get("/system/user/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      userName: dto.userName,
      phonenumber: dto.phonenumber,
      status: dto.status
    }
  });
}

/**
 * 查询单个用户
 * @param {*} id 用户id
 * @returns 
 */
export function getUser(id) {
  return service.get("/system/user/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新用户
 * @param {*} data 
 * @returns 
 */
export function updateUser(data) {
  return service.put("/system/user", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新用户状态
 * @param {*} data 
 * @returns 
 */
export function changeUserStatus(data) {
  return service.put("/system/user/changeStatus", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 添加用户
 * @param {*} data 
 * @returns 
 */
export function addUser(data) {
  return service.post("/system/user", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 删除用户
 * @param {*} ids 用户id列表
 * @returns 
 */
export function deleteUser(ids) {
  return service.delete("/system/user/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 获取用户所能访问的菜单数据
 * @returns 
 */
export function getRouters() {
  return service.get("/getRouters", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 处理菜单路由
 * @param {*} data 
 * @returns 
 */
export async function disposeRouters(data) {
  //获取需要引入路由的vue组件
  // vite 会把 import.meta.glob 编译为如下的样子
  // const modules = {
  //   './dir/foo.js': () => import('./dir/foo.js'),
  //   './dir/bar.js': () => import('./dir/bar.js'),
  // }
  const modules = import.meta.glob('@/views/**/*.vue');

  /**
   * 递归处理
   * @param {*} data 
   */
  async function dispose(data) {
    let list = [];
    for (const item of data) {
      list.push(
        // 三目运算 判断菜单的类型，不同类型的路由对象是不一样的
        item.menuType == "C" ? {
          path: item.path,
          // 从 path 中截取字符串当作 name，因为有 'write/:id*' 这样的 path 存在
          name: item.path.indexOf(':') != -1 ? item.path.substring(0, item.path.lastIndexOf('/')) : item.path,
          // 将获取 vue 组件的异步调用函数赋值给 component
          // 这样，当路由加载时，会自动执行此函数，获取到对应的 vue 组件
          // 这还正好实现了懒加载！用户未点击的菜单没有被加载，直到用户点击菜单时才会加载相应组件
          component: modules[`/src/views/${item.component}.vue`],
          meta: {
            menuName: item.menuName,
            menuType: item.menuType,
            icon: item.icon
          },
          // 递归孩子，没什么好说的，别忘了加 await
          children: await dispose(item.children)
        } : {
          path: item.path,
          name: item.path.indexOf(':') != -1 ? item.path.substring(0, item.path.lastIndexOf('/')) : item.path,
          redirect: item.children.length > 0 ? item.children[0].path : null,
          meta: {
            menuName: item.menuName,
            menuType: item.menuType,
            icon: item.icon
          },
          children: await dispose(item.children)
        }
      );
    }
    return list;
  }

  return dispose(data);
}