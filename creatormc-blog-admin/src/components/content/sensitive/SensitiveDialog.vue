<template>
  <BaseDialogComponent
    v-model="showDialog"
    :isAdd="isAddSensitive"
    addText="新增敏感词"
    editText="编辑敏感词"
    :confirm="yes"
    :disableConfirmButton="isLoading"
    @closed="beforeClose">
    <el-form v-loading="isLoading" :model="dialogData" ref="dialogData" :rules="rule" label-width="100px" size="large" :disabled="isDisableForm">
      <el-form-item prop="content" label="敏感词">
        <el-input v-model="dialogData.content" placeholder="请输入敏感词"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="类型">
        <el-radio-group v-model="dialogData.type">
          <!-- 敏感词类型（1：白名单，0：黑名单） -->
          <el-radio label="0">黑名单</el-radio>
          <el-radio label="1">白名单</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </BaseDialogComponent>
</template>

<script>
import BaseDialogComponent from '@/components/utils/BaseDialogComponent.vue';

export default {
  name: "SensitiveDialog",
  props: {
    /**
     * 对话框中的数据
     */
    dialogDataProp: {
      type: Object,
      required: true
    },
    isLoading: Boolean,              //对话框是否在加载
    isShow: Boolean,                 //是否显示此对话框
    isDisableForm: Boolean,          //是否禁用表单
    isAddSensitive: false,            //是否是新增敏感词
  },
  emits: [
    'confirmSensitiveDialog',
    'update:isShow',
    'update:dialogDataProp'
  ],
  data() {
    return {
      rule: {
        content: [
          {
            required: true,
            message: '敏感词不能为空',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '类型不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.isShow;
      },
      set(value) {
        this.$emit('update:isShow', value);
      }
    },
    dialogData: {
      get() {
        return this.dialogDataProp;
      },
      set(value) {
        this.$emit('update:dialogDataProp', value);
      }
    }
  },
  methods: {
    /**
     * 按下确认按钮后
     */
    yes() {
      let that = this;
      this.$refs["dialogData"].validate((vali) => {
        if (vali) {
          this.$emit("confirmSensitiveDialog");
        }
      });
    },
    /**
     * 对话框关闭前被调用
     */
    beforeClose() {
      this.$refs['dialogData'].resetFields();
    }
  },
  components: {
    BaseDialogComponent
  }
}
</script>

<style lang="scss" scoped>
</style>