<template>
  <CategoryDialog 
    v-model:dialogDataProp="dialogData"
    v-model:isShow="showEditCategoryDialog"
    :isLoading="dialogLoading"
    :isDisableForm="disableForm"
    @confirm-category-dialog="saveEditCategoryDialog"
  />
</template>

<script>
import CategoryDialog from "@/components/content/category/CategoryDialog.vue"
import { getCategory, updateCategory } from "@/api/category"
import { ElMessage } from "element-plus";

export default {
  name: "EditCategoryComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openEditCategoryDialog'
  ],
  data() {
    return {
      dialogData: {},
      //是否显示编辑分类信息对话框
      showEditCategoryDialog: false,
      //对话框数据是否正在加载
      dialogLoading: true,
      //是否禁用编辑分类表单
      disableForm: false,
    }
  },
  methods: {
    /**
     * 打开编辑分类对话框
     */
    openEditCategoryDialog(data) {
      this.showEditCategoryDialog = true;
      this.disableForm = false;
      //对话框显示加载动画
      this.dialogLoading = true;
      //获取数据
      getCategory(data.id).then((response) => {
        if(response != null) {
          this.dialogData = response.data;
          //取消加载动画
          this.dialogLoading = false;
        }
      });
    },
    /**
     * 更新分类信息
     */
    saveEditCategoryDialog() {
      this.disableForm = true;
      updateCategory(this.dialogData).then((response) => {
        if(response != null) {
          //关闭对话框
          this.showEditCategoryDialog = false;
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
    CategoryDialog
  }
}
</script>

<style lang="scss" scoped>
</style>