<template>
  <el-dialog :title="isAdd ? addText : editText" v-model="showDialog" :before-close="beforeClose" @close="close">
    <slot></slot>
    <template #footer>
      <span>
        <el-button type="primary" @click="confirm" :disabled="disableConfirmButton">
          确认
        </el-button>
        <el-button @click="beforeClose(null)">
          取消
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessageBox } from 'element-plus';

export default {
  name: "BaseDialogComponent",
  props: {
    isAdd: Boolean,                   //是否为增加对话框
    addText: String,                  //增加对话框的标题
    editText: String,                 //编辑对话框的标题
    modelValue: Boolean,              //是否显示对话框
    confirm: Function,                //点击确认按钮的回调函数
    disableConfirmButton: false       //是否禁用确认按钮
  },
  emits: [
    'closed',                         //对话框确认关闭时触发的事件
    'update:modelValue'
  ],
  data() {
    return {

    }
  },
  methods: {
    /**
     * 对话框关闭前被调用
     */
    beforeClose(done) {
      ElMessageBox.confirm(
      "确定要关闭对话框吗？系统不会保存您的更改。",
      "警告",
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //确定关闭
        this.$emit("closed");
        if(done) {
          done();
        } else {
          this.showDialog = false;
        }
      }).catch(() => {
        //取消关闭
      });
    },
    /**
     * 关闭的回调
     */
    close() {
      this.$emit('closed');
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
</style>