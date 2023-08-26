<template>
  <UserDialog
    v-model:dialogDataProp="addUserData"
    v-model:isShow="showAddUserDialog"
    :isLoading="dialogLoading"
    :isDisableForm="isDisableAddUserForm"
    :isAddUser="true"
    @confirm-user-dialog="saveAddUserDialog"
    @cancel-user-dialog="showAddUserDialog = false"
  />
</template>

<script>
import UserDialog from "@/components/system/user/UserDialog.vue"
import { addUser } from "@/api/user";
import { ElMessage } from "element-plus";
import { getRoleList } from "../../../api/role";

export default {
  name: "AddUserComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openAddUserDialog'
  ],
  data() {
    return {
      //用于新增用户的对象
      addUserData: {
        //用户所关联的角色id列表（表单用）
        roleIds: [],
        //所有角色对象的列表
        roles: [],
        user: {
          //用户名
          userName: "",
          //密码
          password: "",
          //昵称
          nickName: "",
          //用户性别（0男，1女，2未知）
          sex: "2",
          //邮箱
          email: "",
          //手机号
          phonenumber: "",
          //用户类型：0代表普通用户，1代表管理员
          type: "1",
          //账号状态（0正常 1停用）
          status: "0",
          //用户所关联的角色id列表（请求用）
          roleIds: []
        }
      },
      //对话框是否在加载
      dialogLoading: false,
      //是否显示新增用户对话框
      showAddUserDialog: false,
      //是否禁用新增用户表单
      isDisableAddUserForm: false
    }
  },
  methods: {
    /**
     * 打开新增用户对话框
     */
    openAddUserDialog() {
      this.showAddUserDialog = true;
      this.isDisableForm = false;
      //对话框显示加载动画
      this.dialogLoading = true;
      getRoleList().then((response) => {
        if(response != null) {
          this.addUserData.roles = response.data;
          //取消加载动画
          this.dialogLoading = false;
        }
      });
    },
    /**
     * 添加用户
     */
    saveAddUserDialog() {
      this.isDisableAddUserForm = true;
      this.addUserData.user.roleIds = this.addUserData.roleIds;
      addUser(this.addUserData.user).then((response) => {
        if(response != null) {
          //关闭对话框
          this.showAddUserDialog = false;
          ElMessage.success("新增成功");
          //刷新数据
          this.$emit("getTableData");
        }
      }).finally((error) => {
        this.isDisableAddUserForm = false;
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