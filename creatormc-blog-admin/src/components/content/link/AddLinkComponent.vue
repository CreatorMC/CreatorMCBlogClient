<template>
  <LinkDialog
    v-model:dialogDataProp="addLinkData"
    v-model:isShow="showAddLinkDialog"
    :isLoading="dialogLoading"
    :isDisableForm="isDisableAddLinkForm"
    :isAddLink="true"
    @confirm-link-dialog="saveAddLinkDialog"
  />
</template>

<script>
import LinkDialog from '@/components/content/link/LinkDialog.vue';
import { addLink } from "@/api/link";
import { ElMessage } from 'element-plus';

export default {
  name: "AddLinkComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openAddLinkDialog'
  ],
  data() {
    return {
      //用于新增友链的对象
      addLinkData: {
        //友链名称
        name: "",
        //友链图片链接
        logo: "",
        //友链描述
        description: "",
        //网站地址
        address: "",
        //审核状态 (0代表审核通过，1代表审核未通过，2代表未审核)
        status: "2"
      },
      //对话框是否在加载
      dialogLoading: false,
      //是否显示新增友链对话框
      showAddLinkDialog: false,
      //是否禁用新增友链表单
      isDisableAddLinkForm: false
    }
  },
  methods: {
    /**
     * 打开新增友链对话框
     */
    openAddLinkDialog() {
      this.showAddLinkDialog = true;
      this.isDisableForm = false;
    },
    /**
     * 添加友链
     */
    saveAddLinkDialog() {
      this.isDisableAddLinkForm = true;
      addLink(this.addLinkData).then((response) => {
        if (response != null) {
          //关闭对话框
          this.showAddLinkDialog = false;
          ElMessage.success("新增成功");
          //刷新数据
          this.$emit("getTableData");
        }
      }).finally((error) => {
        this.isDisableAddLinkForm = false;
      });
    }
  },
  components: { LinkDialog }
}
</script>

<style lang="scss" scoped></style>