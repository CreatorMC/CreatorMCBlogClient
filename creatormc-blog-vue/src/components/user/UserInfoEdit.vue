<template>
  <div>
    <el-form class="form" :model="form" ref="form" label-width="100px" label-position="left" size="large" :disabled="isDisabled">
      <el-form-item prop="avatar" label="头像">
        <el-upload
          ref="upload"
          class="avatar-uploader"
          :file-list="fileList"
          :auto-upload="false"
          :show-file-list="false"
          :limit="1"
          :on-exceed="handleExceed"
        >
          <el-avatar class="avatar head" v-if="fileList[0].url" :src="fileList[0].url" fit="cover" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          <template #tip>
            <div class="el-upload__tip">
              点击上传头像，只能上传jpg/png文件，且不超过1MB
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item prop="nickName" label="昵称">
        <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="电子邮件">
        <el-input v-model="form.email" placeholder="请输入电子邮件"></el-input>
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
          <el-radio label="2">未知</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button type="primary" @click="updateUserInfo" :loading="isDisabled">保存</el-button>
      <el-button type="info" @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { userStore } from '@/store/user';
import { updateUserInfo } from '@/api/user';
import { ElMessage, genFileId } from 'element-plus';
import { userInfo } from '../../api/user';

export default {
  name: "UserInfoEdit",
  props: [
    "form",
    "isEdit"
  ],
  emits: [
    'update:isEdit',
    'update:form'
  ],
  data() {
    return {
      fileList: [{
        url: ""
      }],
      //是否禁用表单
      isDisabled: false
    }
  },
  methods: {
    init() {
      //刚渲染此组件时，创建一个假的文件，添加到文件列表中，以回显头像
      const store = userStore();
      this.$emit('update:form', store.user);
      var file = {}
      file.uid = genFileId();
      file.url = store.user.avatar;
      this.fileList.splice(0, this.fileList.length);
      this.fileList.push(file);
    },
    /**
     * 返回展示信息页面
     */
    back() {
      this.$refs["form"].resetFields();
      this.$emit('update:isEdit', false);
    },
    /**
     * 达到上限时自动替换文件
     */
    handleExceed(files, uploadFiles) {
      this.fileList.splice(0, this.fileList.length);
      var file = {
        raw: files[0]
      };
      file.url = URL.createObjectURL(files[0]);
      this.fileList.push(file);
    },
    /**
     * 更新用户信息
     */
    updateUserInfo() {
      this.isDisabled = true;
      updateUserInfo(this.fileList[0].raw, this.form.email, this.form.nickName, this.form.sex).then(async (response) => {
        if (response != null) {
          const store = userStore();
          const res = await userInfo();
          if(res != null) {
            store.user = res.data;
          }
          ElMessage.success("保存成功");
          this.$emit('update:isEdit', false);
        }
      }).finally(() => {
        this.isDisabled = false;
      });
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
.form {
  :deep(.el-form-item__label) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.head {
  width: 120px;
  height: 120px;
}

.footer {
  display: flex;
  justify-content: center;
}
.avatar-uploader :deep(.el-upload) {
  width: 120px;
  height: 120px;
  border: 1px dashed var(--el-border-color);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader :deep(.el-upload):hover {
  border-color: var(--el-color-primary);
}

:deep(.el-icon).avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>