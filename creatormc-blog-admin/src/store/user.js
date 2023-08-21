import { defineStore } from 'pinia';

export const userStore = defineStore("user",{
  state: () => {
    return {
      //用户权限字段数组
      permissions: [],
      //用户角色数组
      roles: [],
      //用户信息对象
      // {
      //   //头像链接
      //   avatar: "",
      //   //邮箱
      //   email: "",
      //   //用户id
      //   id: "",
      //   //昵称
      //   nickName: "",
      //   //性别
      //   sex: ""
      // }
      user: null
    }
  }
});