<template>
  <CategoryDialog
    v-model:dialogDataProp="addCategoryData"
    v-model:isShow="showAddCategoryDialog"
    :isLoading="dialogLoading"
    :isDisableForm="isDisableAddCategoryForm"
    :isAddCategory="true"
    @confirm-category-dialog="saveAddCategoryDialog"
  />
</template>

<script>
import CategoryDialog from '@/components/content/category/CategoryDialog.vue';
import { addCategory } from "@/api/category";
import { ElMessage } from 'element-plus';

export default {
  name: "AddCategoryComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openAddCategoryDialog'
  ],
  data() {
    return {
      //用于新增分类的对象
      addCategoryData: {
        //分类名称
        name: "",
        //分类描述
        description: "",
        //分类状态
        status: "0"
      },
      //对话框是否在加载
      dialogLoading: false,
      //是否显示新增分类对话框
      showAddCategoryDialog: false,
      //是否禁用新增分类表单
      isDisableAddCategoryForm: false
    }
  },
  methods: {
    /**
     * 打开新增分类对话框
     */
    openAddCategoryDialog() {
      this.showAddCategoryDialog = true;
      this.isDisableForm = false;
    },
    /**
     * 添加分类
     */
    saveAddCategoryDialog() {
      this.isDisableAddCategoryForm = true;
      addCategory(this.addCategoryData).then((response) => {
        if (response != null) {
          //关闭对话框
          this.showAddCategoryDialog = false;
          ElMessage.success("新增成功");
          //刷新数据
          this.$emit("getTableData");
        }
      }).finally((error) => {
        this.isDisableAddCategoryForm = false;
      });
    }
  },
  components: { CategoryDialog }
}
</script>

<style lang="scss" scoped></style>