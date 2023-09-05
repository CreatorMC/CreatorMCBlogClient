<template>
  <LinkDialog 
    v-model:dialogDataProp="dialogData"
    v-model:isShow="showEditLinkDialog"
    :isLoading="dialogLoading"
    :isDisableForm="disableForm"
    @confirm-link-dialog="saveEditLinkDialog"
  />
</template>

<script>
import LinkDialog from "@/components/content/link/LinkDialog.vue"
import { getLink, updateLink } from "@/api/link"
import { ElMessage } from "element-plus";

export default {
  name: "EditLinkComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openEditLinkDialog'
  ],
  data() {
    return {
      dialogData: {},
      //是否显示编辑友链信息对话框
      showEditLinkDialog: false,
      //对话框数据是否正在加载
      dialogLoading: true,
      //是否禁用编辑友链表单
      disableForm: false,
    }
  },
  methods: {
    /**
     * 打开编辑友链对话框
     */
    openEditLinkDialog(data) {
      this.showEditLinkDialog = true;
      this.disableForm = false;
      //对话框显示加载动画
      this.dialogLoading = true;
      //获取数据
      getLink(data.id).then((response) => {
        if(response != null) {
          this.dialogData = response.data;
          //取消加载动画
          this.dialogLoading = false;
        }
      });
    },
    /**
     * 更新友链信息
     */
    saveEditLinkDialog() {
      this.disableForm = true;
      updateLink(this.dialogData).then((response) => {
        if(response != null) {
          //关闭对话框
          this.showEditLinkDialog = false;
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
    LinkDialog
  }
}
</script>

<style lang="scss" scoped>
</style>