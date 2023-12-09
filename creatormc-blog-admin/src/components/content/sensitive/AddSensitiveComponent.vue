<template>
  <SensitiveDialog
    v-model:dialogDataProp="addSensitiveData"
    v-model:isShow="showAddSensitiveDialog"
    :isLoading="dialogLoading"
    :isDisableForm="isDisableAddSensitiveForm"
    :isAddSensitive="true"
    @confirm-sensitive-dialog="saveAddSensitiveDialog"
  />
</template>

<script>
import SensitiveDialog from '@/components/content/sensitive/SensitiveDialog.vue';
import { addSensitive } from "@/api/sensitive";
import { ElMessage } from 'element-plus';

export default {
  name: "AddSensitiveComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openAddSensitiveDialog'
  ],
  data() {
    return {
      //用于新增敏感词的对象
      addSensitiveData: {
        //敏感词
        content: "",
        //敏感词类型
        type: "0"
      },
      //对话框是否在加载
      dialogLoading: false,
      //是否显示新增敏感词对话框
      showAddSensitiveDialog: false,
      //是否禁用新增敏感词表单
      isDisableAddSensitiveForm: false
    }
  },
  methods: {
    /**
     * 打开新增敏感词对话框
     */
    openAddSensitiveDialog() {
      this.showAddSensitiveDialog = true;
      this.isDisableForm = false;
    },
    /**
     * 添加敏感词
     */
    saveAddSensitiveDialog() {
      this.isDisableAddSensitiveForm = true;
      addSensitive(this.addSensitiveData).then((response) => {
        if (response != null) {
          //关闭对话框
          this.showAddSensitiveDialog = false;
          ElMessage.success("新增成功");
          //刷新数据
          this.$emit("getTableData");
        }
      }).finally((error) => {
        this.isDisableAddSensitiveForm = false;
      });
    }
  },
  components: { SensitiveDialog }
}
</script>

<style lang="scss" scoped></style>