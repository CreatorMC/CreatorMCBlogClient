import { defineStore } from 'pinia';

export const userStore = defineStore("user",{
  state: () => {
    return {
      user: {
        //头像链接
        avatar: "",
        //邮箱
        email: "",
        //用户id
        id: "",
        //昵称
        nickName: "",
        //性别
        sex: ""
      }
    }
  }
});