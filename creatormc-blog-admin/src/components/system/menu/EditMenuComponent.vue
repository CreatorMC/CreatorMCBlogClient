<template>
  <MenuDialog
    ref="menuDialog"
    v-model:dialogDataProp="dialogData"
    v-model:isShow="isShowDialog"
    v-model:treeDataProp="treeData"
    :isLoading="isLoading"
    :isDisableForm="isDisableForm"
    @confirm-menu-dialog="saveEditMenuDialog"
  />
</template>

<script>
import MenuDialog from "@/components/system/menu/MenuDialog.vue"
import { ElMessage } from "element-plus";
import { getMenu, getMenuList, disposeMenuList, updateMenu, MCFFilter } from "@/api/menu";

export default {
  name: "EditMenuComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openEditMenuDialog'
  ],
  data() {
    return {
      dialogData: {
        parentId: "0",
        icon: ""
      },
      treeData: [
        {
          id: "0",
          menuName: "主类目",
          children: []
        }
      ],
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
     * 打开编辑菜单对话框
     */
    openEditMenuDialog(data) {
      this.isShowDialog = true;
      this.isDisableForm = false;
      //对话框显示加载动画
      this.isLoading = true;

      let loadMenu = false;
      let loadTree = false;

      function cancelLoading(that) {
        if(loadMenu && loadTree) {
          //取消加载动画
          that.isLoading = false;
        }
      }

      //获取数据
      getMenu(data.id).then((response) => {
        if(response != null) {
          this.dialogData = response.data;
          loadMenu = true;
          cancelLoading(this);
        }
      });
      getMenuList(this.form).then((response) => {
        if (response != null) {
          //处理数据
          this.treeData[0].children = disposeMenuList(response.data);
          loadTree = true;
          cancelLoading(this);
        }
      });
    },
    /**
     * 更新菜单信息
     */
    saveEditMenuDialog() {
      this.isDisableForm = true;
      updateMenu(MCFFilter(this.dialogData)).then((response) => {
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
    MenuDialog
  }
}
</script>

<style lang="scss" scoped>
</style>