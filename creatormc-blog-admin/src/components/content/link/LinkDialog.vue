<template>
  <BaseDialogComponent
    v-model="showDialog"
    :isAdd="isAddLink"
    addText="新增友链"
    editText="编辑友链"
    :confirm="yes"
    :disableConfirmButton="isLoading"
    @closed="beforeClose">
    <el-form v-loading="isLoading" :model="dialogData" ref="dialogData" :rules="rule" label-width="100px" size="large" :disabled="isDisableForm">
      <el-form-item prop="name" label="友链名称">
        <el-input v-model="dialogData.name" placeholder="请输入友链名称"></el-input>
      </el-form-item>
      <el-form-item prop="logo" label="Logo链接">
        <el-input v-model="dialogData.logo" placeholder="请输入友链Logo链接"></el-input>
      </el-form-item>
      <el-form-item prop="address" label="网站地址">
        <el-input v-model="dialogData.address" placeholder="请输入网站地址"></el-input>
      </el-form-item>
      <el-form-item prop="description" label="描述">
        <el-input
          v-model="dialogData.description"
          :rows="4"
          type="textarea"
          placeholder="请输入描述"
        />
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-radio-group v-model="dialogData.status">
          <!-- 审核状态 (0代表审核通过，1代表审核未通过，2代表未审核) -->
          <el-radio label="0">通过</el-radio>
          <el-radio label="1">未通过</el-radio>
          <el-radio label="2">未审核</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </BaseDialogComponent>
</template>

<script>
import BaseDialogComponent from '@/components/utils/BaseDialogComponent.vue';

export default {
  name: "LinkDialog",
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
    isAddLink: false,                //是否是新增友链
  },
  emits: [
    'confirmLinkDialog',
    'update:isShow',
    'update:dialogDataProp'
  ],
  data() {
    return {
      rule: {
        name: [
          {
            required: true,
            message: '友链名称不能为空',
            trigger: 'blur'
          }
        ],
        logo: [
          {
            required: true,
            message: 'Logo链接不能为空',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '网站地址不能为空',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '状态不能为空',
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
          this.$emit("confirmLinkDialog");
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