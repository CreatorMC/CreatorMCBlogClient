<template>
  <TagDialog 
    v-model:dialogDataProp="dialogData"
    v-model:isShow="showEditTagDialog"
    :isLoading="dialogLoading"
    :isDisableForm="disableForm"
    @confirm-tag-dialog="saveEditTagDialog"
  />
</template>

<script>
import TagDialog from "@/components/content/tag/TagDialog.vue"
import { getTag, updateTag } from "@/api/tag"
import { ElMessage } from "element-plus";

export default {
  name: "EditTagComponent",
  emits: [
    'getTableData'
  ],
  expose: [
    'openEditTagDialog'
  ],
  data() {
    return {
      dialogData: {},
      //是否显示编辑标签信息对话框
      showEditTagDialog: false,
      //对话框数据是否正在加载
      dialogLoading: true,
      //是否禁用编辑标签表单
      disableForm: false,
    }
  },
  methods: {
    /**
     * 打开编辑标签对话框
     */
    openEditTagDialog(data) {
      this.showEditTagDialog = true;
      this.disableForm = false;
      //对话框显示加载动画
      this.dialogLoading = true;
      //获取数据
      getTag(data.id).then((response) => {
        if(response != null) {
          this.dialogData = response.data;
          //取消加载动画
          this.dialogLoading = false;
        }
      });
    },
    /**
     * 更新标签信息
     */
    saveEditTagDialog() {
      this.disableForm = true;
      updateTag(this.dialogData).then((response) => {
        if(response != null) {
          //关闭对话框
          this.showEditTagDialog = false;
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
    TagDialog
  }
}
</script>

<style lang="scss" scoped>
</style>