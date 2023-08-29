<template>
  <RoleDialog
    v-model:dialogDataProp="addRoleData"
    v-model:isShow="showAddRoleDialog"
    :isLoading="dialogLoading"
    :isDisableForm="isDisableAddRoleForm"
    :isAddRole="true"
    @confirm-role-dialog="saveAddRoleDialog"
  />
</template>

<script>
import RoleDialog from '@/components/system/role/RoleDialog.vue';
import { addRole } from "@/api/role";
import { getMenuTree } from '@/api/menu';
import { ElMessage } from 'element-plus';

export default {
  name: "AddRoleComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openAddRoleDialog'
  ],
  data() {
    return {
      //用于新增角色的对象
      addRoleData: {
        //角色名称
        roleName: "",
        //角色权限字符串
        roleKey: "",
        //显示顺序
        roleSort: 1,
        //角色状态（0正常 1停用）
        status: "0",
        //备注
        remark: "",
        //菜单对象列表，用于显示出来进行选择
        menus: [],
        //菜单id列表
        menuIds: []
      },
      //对话框是否在加载
      dialogLoading: false,
      //是否显示新增角色对话框
      showAddRoleDialog: false,
      //是否禁用新增角色表单
      isDisableAddRoleForm: false
    }
  },
  methods: {
    /**
     * 打开新增角色对话框
     */
    openAddRoleDialog() {
      this.showAddRoleDialog = true;
      this.isDisableForm = false;
      //对话框显示加载动画
      this.dialogLoading = true;
      getMenuTree().then((response) => {
        if (response != null) {
          this.addRoleData.menus = response.data;
          //取消加载动画
          this.dialogLoading = false;
        }
      });
    },
    /**
     * 添加角色
     */
    saveAddRoleDialog() {
      this.isDisableAddRoleForm = true;
      addRole({
        roleName: this.addRoleData.roleName,
        roleKey: this.addRoleData.roleKey,
        roleSort: this.addRoleData.roleSort,
        status: this.addRoleData.status,
        remark: this.addRoleData.remark,
        menuIds: this.addRoleData.menuIds
      }).then((response) => {
        if (response != null) {
          //关闭对话框
          this.showAddRoleDialog = false;
          ElMessage.success("新增成功");
          //刷新数据
          this.$emit("getTableData");
        }
      }).finally((error) => {
        this.isDisableAddRoleForm = false;
      });
    }
  },
  components: { RoleDialog }
}
</script>

<style lang="scss" scoped></style>