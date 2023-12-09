<template>
  <SensitiveDialog 
    v-model:dialogDataProp="dialogData"
    v-model:isShow="showEditSensitiveDialog"
    :isLoading="dialogLoading"
    :isDisableForm="disableForm"
    @confirm-sensitive-dialog="saveEditSensitiveDialog"
  />
</template>

<script>
import SensitiveDialog from "@/components/content/sensitive/SensitiveDialog.vue"
import { getSensitive, updateSensitive } from "@/api/sensitive"
import { ElMessage } from "element-plus";

export default {
  name: "EditSensitiveComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openEditSensitiveDialog'
  ],
  data() {
    return {
      dialogData: {},
      //是否显示编辑敏感词信息对话框
      showEditSensitiveDialog: false,
      //对话框数据是否正在加载
      dialogLoading: true,
      //是否禁用编辑敏感词表单
      disableForm: false,
    }
  },
  methods: {
    /**
     * 打开编辑敏感词对话框
     */
    openEditSensitiveDialog(data) {
      this.showEditSensitiveDialog = true;
      this.disableForm = false;
      //对话框显示加载动画
      this.dialogLoading = true;
      //获取数据
      getSensitive(data.id).then((response) => {
        if(response != null) {
          this.dialogData = response.data;
          //取消加载动画
          this.dialogLoading = false;
        }
      });
    },
    /**
     * 更新敏感词信息
     */
    saveEditSensitiveDialog() {
      this.disableForm = true;
      updateSensitive(this.dialogData).then((response) => {
        if(response != null) {
          //关闭对话框
          this.showEditSensitiveDialog = false;
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
    SensitiveDialog
  }
}
</script>

<style lang="scss" scoped>
</style>