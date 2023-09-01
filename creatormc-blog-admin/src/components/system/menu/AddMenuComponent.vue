<template>
  <MenuDialog
    v-model:dialogDataProp="addMenuData"
    v-model:isShow="showAddMenuDialog"
    v-model:treeDataProp="treeData"
    :isLoading="dialogLoading"
    :isDisableForm="isDisableAddMenuForm"
    :isAddMenu="true"
    @confirm-menu-dialog="saveAddMenuDialog"
  />
</template>

<script>
import MenuDialog from "@/components/system/menu/MenuDialog.vue"
import { addMenu, getMenuList, disposeMenuList, MCFFilter } from "@/api/menu";
import { ElMessage } from "element-plus";

export default {
  name: "AddMenuComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openAddMenuDialog'
  ],
  data() {
    return {
      //用于新增菜单的对象
      addMenuData: {},
      treeData: [
        {
          id: "0",
          menuName: "主类目",
          children: []
        }
      ],
      //对话框是否在加载
      dialogLoading: false,
      //是否显示新增菜单对话框
      showAddMenuDialog: false,
      //是否禁用新增菜单表单
      isDisableAddMenuForm: false
    }
  },
  methods: {
    /**
     * 打开新增菜单对话框
     */
    openAddMenuDialog(data) {
      this.addMenuData = {
        //菜单名称
        menuName: "",
        //父菜单ID
        parentId: "0",
        //显示顺序
        orderNum: 0,
        //路由地址
        path: "",
        //组件路径
        component: "",
        //是否为外链（0是 1否）
        isFrame: "1",
        //菜单类型（M目录 C菜单 F按钮）
        menuType: "M",
        //显示状态（0显示 1隐藏）
        visible: "0",
        //菜单状态（0正常 1停用）
        status: "0",
        //权限标识
        perms: "",
        //菜单图标
        icon: "#",
        //备注
        remark: ""
      };
      this.showAddMenuDialog = true;
      this.isDisableForm = false;
      //对话框显示加载动画
      this.dialogLoading = true;
      if(data) {
        //当从某一行的表格项点击“新增”时，自动设置父级为当前菜单
        this.addMenuData.parentId = data.id;
      }
      getMenuList(this.form).then((response) => {
        if (response != null) {
          //处理数据
          this.treeData[0].children = disposeMenuList(response.data);
          //取消加载动画
          this.dialogLoading = false;
        }
      });
    },
    /**
     * 添加菜单
     */
    saveAddMenuDialog() {
      this.isDisableAddMenuForm = true;
      addMenu(MCFFilter(this.addMenuData)).then((response) => {
        if(response != null) {
          //关闭对话框
          this.showAddMenuDialog = false;
          ElMessage.success("新增成功");
          //刷新数据
          this.$emit("getTableData");
        }
      }).finally(() => {
        this.isDisableAddMenuForm = false;
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