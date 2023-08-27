<template>
  <RoleDialog 
    v-model:dialogDataProp="dialogData"
    v-model:isShow="isShowDialog"
    :isLoading="isLoading"
    :isDisableForm="isDisableForm"
    @confirm-user-dialog="saveEditRoleDialog"
    @cancel-user-dialog="isShowDialog = false"
  />
</template>

<script>
import RoleDialog from "@/components/system/role/RoleDialog.vue"
import { ElMessage } from "element-plus";

export default {
  name: "EditRoleComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openEditRoleDialog'
  ],
  data() {
    return {
      dialogData: {
      },
      //是否显示对话框
      isShowDialog: false,
      //对话框数据是否正在加载
      isLoading: false,
      //是否禁用表单
      isDisableForm: false,
    }
  },
  methods: {
    /**
     * 打开编辑角色对话框
     */
    openEditRoleDialog(data) {
      this.isShowDialog = true;
      this.isDisableForm = false;
      // //对话框显示加载动画
      // this.isLoading = true;
      // //获取数据
      // getUser(data.id).then((response) => {
      //   if(response != null) {
      //     this.dialogData = response.data;
      //     //取消加载动画
      //     this.isLoading = false;
      //   }
      // });
    },
    /**
     * 更新角色信息
     */
    saveEditRoleDialog() {
      // this.isDisableForm = true;
      // this.dialogData.user.roleIds = this.dialogData.roleIds;
      // updateUser(this.dialogData.user).then((response) => {
      //   if(response != null) {
      //     //关闭对话框
      //     this.isShowDialog = false;
      //     ElMessage.success("更新成功");
      //     //刷新数据
      //     this.$emit("getTableData");
      //   }
      // }).finally(() => {
      //   this.isDisableForm = false;
      // });
    }
  },
  components: {
    RoleDialog
  }
}
</script>

<style lang="scss" scoped>
</style>