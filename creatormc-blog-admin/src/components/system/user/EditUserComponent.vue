<template>
  <UserDialog 
    v-model:dialogDataProp="dialogData"
    v-model:isShow="showEditUserDialog"
    :isLoading="dialogLoading"
    :isDisableForm="disableForm"
    @confirm-user-dialog="saveEditUserDialog"
    @cancel-user-dialog="showEditUserDialog = false"
  />
</template>

<script>
import UserDialog from "@/components/system/user/UserDialog.vue"
import { getUser, updateUser } from "@/api/user"
import { ElMessage } from "element-plus";

export default {
  name: "EditUserComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openEditUserDialog'
  ],
  data() {
    return {
      dialogData: {
        //用户所关联的角色id列表
        roleIds: [],
        //所有角色对象的列表
        roles: [],
        user: {
          // //用户id
          // id: "",
          // //用户名
          // userName: "",
          // //昵称
          // nickName: "",
          // //用户性别（0男，1女，2未知）
          // sex: "0",
          // //邮箱
          // email: "",
          // //手机号
          // phonenumber: "",
          // //用户类型：0代表普通用户，1代表管理员
          // type;
          // //账号状态（0正常 1停用）
          // status: "0"
        }
      },
      //是否显示编辑用户信息对话框
      showEditUserDialog: false,
      //对话框数据是否正在加载
      dialogLoading: true,
      //是否禁用编辑用户表单
      disableForm: false,
    }
  },
  methods: {
    /**
     * 打开编辑用户对话框
     */
    openEditUserDialog(data) {
      this.showEditUserDialog = true;
      this.disableForm = false;
      //对话框显示加载动画
      this.dialogLoading = true;
      //获取数据
      getUser(data.id).then((response) => {
        if(response != null) {
          this.dialogData = response.data;
          //取消加载动画
          this.dialogLoading = false;
        }
      });
    },
    /**
     * 更新用户信息
     */
    saveEditUserDialog() {
      this.disableForm = true;
      this.dialogData.user.roleIds = this.dialogData.roleIds;
      updateUser(this.dialogData.user).then((response) => {
        if(response != null) {
          //关闭对话框
          this.showEditUserDialog = false;
          ElMessage.success("更新成功");
          //刷新数据
          this.$emit("getTableData");
        }
      }).finally(() => {
        this.disableForm = false;
      });
    }
  },
  components: {
    UserDialog
  }
}
</script>

<style lang="scss" scoped>
</style>