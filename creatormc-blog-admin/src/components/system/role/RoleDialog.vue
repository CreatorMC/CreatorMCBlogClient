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
                <span>后端Controller中定义的权限字符<br>如：@PreAuthorize("@ps.hasRole('admin')")</span>
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
      <el-row>
        <el-col class="inline-container" :span="24">
          <el-form-item class="auto-width" prop="status" label="状态">
            <el-radio-group v-model="dialogData.status">
              <el-radio label="0">正常</el-radio>
              <el-radio label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="菜单列表">
        <el-tree
          ref="tree"
          :data="dialogData.menus"
          node-key="id"
          :props="{
            label: 'label',
            children: 'children'
          }"
          empty-text="无"
          show-checkbox>
        </el-tree>
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <el-input
          v-model="dialogData.remark"
          :rows="2"
          type="textarea"
          placeholder="请输入备注"
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
  expose: [
    'setSelectedTree'
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
        ],
        roleKey: [
          {
            required: true,
            message: '权限字符必须填写',
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
          //获取选中的菜单
          that.dialogData.menuIds = that.$refs['tree'].getHalfCheckedKeys();
          that.dialogData.menuIds = that.dialogData.menuIds.concat(that.$refs['tree'].getCheckedKeys());
          this.$emit("confirmRoleDialog");
        }
      });
    },
    /**
     * 对话框关闭前被调用
     */
    beforeClose() {
      this.$refs['dialogData'].resetFields();
    },
    /**
     * 设置被选中的节点（应在打开编辑角色对话框时被调用）
     */
    setSelectedTree() {
      let that = this;
      //延时设置，解决刚显示时未渲染的问题
      this.$nextTick(() => {
        for (let item of that.dialogData.checkedKeys) {
          that.$refs['tree'].setChecked(item, true, false);
        }
      });
    }
  },
  components: {
    BaseDialogComponent
  }
}
</script>

<style lang="scss" scoped>
.inline-container {
  display: flex;
  flex-wrap: wrap;
}

.auto-width {
  flex: 1 0 200px;
}
</style>