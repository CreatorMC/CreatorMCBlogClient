<template>
  <RoleDialog
    ref="roleDialog"
    v-model:dialogDataProp="dialogData"
    v-model:isShow="isShowDialog"
    :isLoading="isLoading"
    :isDisableForm="isDisableForm"
    @confirm-role-dialog="saveEditRoleDialog"
  />
</template>

<script>
import RoleDialog from "@/components/system/role/RoleDialog.vue"
import { getRole, updateRole } from "@/api/role";
import { getRoleMenuTree } from "@/api/menu";
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
      //对话框显示加载动画
      this.isLoading = true;
      let loadRole = false;
      let loadTree = false;

      function cancelLoading(that) {
        if(loadRole && loadTree) {
          //取消加载动画
          that.isLoading = false;
          //初始化选中的菜单
          that.$refs['roleDialog'].setSelectedTree();
        }
      }

      //获取数据
      getRole(data.id).then((response) => {
        if(response != null) {
          //防止数据被覆盖，使用ES6的新语法 展开运算符"..." 合并对象
          this.dialogData = {
            ...this.dialogData,
            ...response.data
          };
          //角色数据已获取
          loadRole = true;
          cancelLoading(this);
        }
      });
      getRoleMenuTree(data.id).then((response) => {
        if(response != null) {
          this.dialogData.checkedKeys = response.data.checkedKeys;
          this.dialogData.menus = response.data.menus;
          //菜单树已获取
          loadTree = true;
          cancelLoading(this);
        }
      });
    },
    /**
     * 更新角色信息
     */
    saveEditRoleDialog() {
      this.isDisableForm = true;
      updateRole({
        id: this.dialogData.id,
        roleName: this.dialogData.roleName,
        roleKey: this.dialogData.roleKey,
        roleSort: this.dialogData.roleSort,
        status: this.dialogData.status,
        remark: this.dialogData.remark,
        menuIds: this.dialogData.menuIds
      }).then((response) => {
        if(response != null) {
          //关闭对话框
          this.isShowDialog = false;
          ElMessage.success("更新成功");
          //刷新数据
          this.$emit("getTableData");
        }
      }).finally(() => {
        this.isDisableForm = false;
      });
    }
  },
  components: {
    RoleDialog
  }
}
</script>

<style lang="scss" scoped>
</style>