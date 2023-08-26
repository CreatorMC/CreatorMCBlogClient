<template>
  <el-dialog class="dialog-width" :title="isAddUser ? '新增用户' : '编辑用户'" v-model="showDialog" :before-close="beforeClose">
    <el-form v-loading="isLoading" :model="dialogData.user" ref="dialogData" :rules="rule" label-width="80px" size="large" :disabled="isDisableForm">
      <el-form-item prop="nickName" label="用户昵称">
        <el-input v-model="dialogData.user.nickName" placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-row v-if="isAddUser">
        <el-col class="inline-container" :span="24">
          <el-form-item class="auto-width" prop="userName" label="用户名称">
            <el-input v-model="dialogData.user.userName" placeholder="请输入用户名称"></el-input>
          </el-form-item>
          <el-form-item class="auto-width" prop="password" label="用户密码">
            <el-input v-model="dialogData.user.password" placeholder="请输入用户密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="inline-container" :span="24">
          <el-form-item class="auto-width" prop="phonenumber" label="手机号码">
            <el-input v-model="dialogData.user.phonenumber" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item class="auto-width" prop="email" label="邮箱">
            <el-input v-model="dialogData.user.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="inline-container" :span="24">
          <el-form-item class="auto-width" prop="sex" label="用户性别">
            <el-select style="width: 100%;" v-model="dialogData.user.sex">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
              <el-option label="未知" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="auto-width" prop="status" label="状态">
            <el-radio-group v-model="dialogData.user.status">
              <el-radio label="0">正常</el-radio>
              <el-radio label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="角色">
        <el-select class="auto-width" v-model="dialogData.roleIds" multiple>
          <el-option v-for="item in dialogData.roles" :label="item.roleName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="type" label="用户类型">
        <el-radio-group v-model="dialogData.user.type">
          <el-radio label="0">普通用户</el-radio>
          <el-radio label="1">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="yes" :disabled="isLoading">
          确认
        </el-button>
        <el-button @click="closeDialog">
          取消
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessageBox } from 'element-plus';

export default {
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
    isAddUser: false                 //是否是新增用户对话框
  },
  emits:[
    'confirmUserDialog',
    'cancelUserDialog',
    'update:isShow',
    'update:dialogDataProp'
  ],
  data() {
    return {
      rule: {
        nickName: [
          {
            required: true,
            message: '用户昵称必须填写',
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: '用户名称必须填写',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '用户密码必须填写',
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
      this.$refs['dialogData'].validate((vali) => {
        if(vali) {
          this.$emit('confirmUserDialog');
        }
      });
    },
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
        this.$refs['dialogData'].resetFields();
        done();
      }).catch(() => {
        //取消关闭
      });
    },
    /**
     * 点击取消按钮后触发
     */
    closeDialog() {
      ElMessageBox.confirm(
      "确定要关闭对话框吗？系统不会保存您的更改。",
      "警告",
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(() => {
        //确定关闭
        this.$refs['dialogData'].resetFields();
        this.$emit('cancelUserDialog');
        done();
      }).catch(() => {
        //取消关闭
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.inline-container {
  display: flex;
  flex-wrap: wrap;
}
.auto-width {
  flex: 1 0 250px;
}
</style>