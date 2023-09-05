<template>
  <TagDialog
    v-model:dialogDataProp="addTagData"
    v-model:isShow="showAddTagDialog"
    :isLoading="dialogLoading"
    :isDisableForm="isDisableAddTagForm"
    :isAddTag="true"
    @confirm-tag-dialog="saveAddTagDialog"
  />
</template>

<script>
import TagDialog from '@/components/content/tag/TagDialog.vue';
import { addTag } from "@/api/tag";
import { ElMessage } from 'element-plus';

export default {
  name: "AddTagComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openAddTagDialog'
  ],
  data() {
    return {
      //用于新增标签的对象
      addTagData: {
        //标签名称
        name: "",
        //标签备注
        remark: ""
      },
      //对话框是否在加载
      dialogLoading: false,
      //是否显示新增标签对话框
      showAddTagDialog: false,
      //是否禁用新增标签表单
      isDisableAddTagForm: false
    }
  },
  methods: {
    /**
     * 打开新增标签对话框
     */
    openAddTagDialog() {
      this.showAddTagDialog = true;
      this.isDisableForm = false;
    },
    /**
     * 添加标签
     */
    saveAddTagDialog() {
      this.isDisableAddTagForm = true;
      addTag(this.addTagData).then((response) => {
        if (response != null) {
          //关闭对话框
          this.showAddTagDialog = false;
          ElMessage.success("新增成功");
          //刷新数据
          this.$emit("getTableData");
        }
      }).finally((error) => {
        this.isDisableAddTagForm = false;
      });
    }
  },
  components: { TagDialog }
}
</script>

<style lang="scss" scoped></style>