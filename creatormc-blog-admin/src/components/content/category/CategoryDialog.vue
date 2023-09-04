<template>
  <BaseDialogComponent
    v-model="showDialog"
    :isAdd="isAddCategory"
    addText="新增分类"
    editText="编辑分类"
    :confirm="yes"
    :disableConfirmButton="isLoading"
    @closed="beforeClose">
    <el-form v-loading="isLoading" :model="dialogData" ref="dialogData" :rules="rule" label-width="100px" size="large" :disabled="isDisableForm">
      <el-form-item prop="name" label="分类名称">
        <el-input v-model="dialogData.name" placeholder="请输入分类名称"></el-input>
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
          <!-- 分类状态（0正常 1停用） -->
          <el-radio label="0">正常</el-radio>
          <el-radio label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </BaseDialogComponent>
</template>

<script>
import BaseDialogComponent from '@/components/utils/BaseDialogComponent.vue';

export default {
  name: "CategoryDialog",
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
    isAddCategory: false,            //是否是新增分类
  },
  emits: [
    'confirmCategoryDialog',
    'update:isShow',
    'update:dialogDataProp'
  ],
  data() {
    return {
      rule: {
        name: [
          {
            required: true,
            message: '分类名称不能为空',
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
          this.$emit("confirmCategoryDialog");
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