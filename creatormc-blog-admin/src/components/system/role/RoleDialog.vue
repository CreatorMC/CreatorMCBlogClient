<template>
  <BaseDialogComponent
    v-model="showDialog"
    :isAdd="isAddRole"
    addText="新增角色"
    editText="编辑角色"
    :confirm="yes"
    :disableConfirmButton="isLoading"
    @closed="beforeClose">
    <el-form v-loading="isLoading" :model="dialogData" ref="dialogData" :rules="rule" label-width="100px" size="large" :disabled="isDisableForm">
      <el-form-item prop="roleName" label="角色名称">
        <el-input v-model="dialogData.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item prop="roleKey">
        <template #label>
          <div>
            <el-tooltip placement="top">
              <template #content>
                <span>后端Controller中定义的权限字符<br>如：@PreAuthorize("@ps.hasPermission('admin')")</span>
              </template>
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
            <span>&nbsp;权限字符</span>
          </div>
        </template>
        <el-input v-model="dialogData.roleKey" placeholder="请输入权限字符"></el-input>
      </el-form-item>
      <el-form-item prop="roleSort" label="角色顺序">
        <el-input-number
          v-model="dialogData.roleSort"
          :min="1"
          controls-position="right"
        />
      </el-form-item>
    </el-form>
  </BaseDialogComponent>
</template>

<script>
import BaseDialogComponent from '@/components/utils/BaseDialogComponent.vue';

export default {
  name: "RoleDialog",
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
    isAddRole: false,                //是否是新增角色
  },
  emits: [
    'confirmRoleDialog',
    'update:isShow',
    'update:dialogDataProp'
  ],
  data() {
    return {
      rule: {
        roleName: [
          {
            required: true,
            message: '角色名称必须填写',
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
      this.$refs["dialogData"].validate((vali) => {
        if (vali) {
          this.$emit("confirmRoleDialog");
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