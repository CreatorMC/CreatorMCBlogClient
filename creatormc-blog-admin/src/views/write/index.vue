<template>
  <div>
    <el-form size="large" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要">
        <el-input v-model="form.summary" type="textarea" placeholder="请输入文章摘要" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分类">
            <el-select v-model="form.categoryId" class="select-style" placeholder="请选择">
              <el-option label="选项1" :value="1"></el-option>
              <el-option label="选项2" :value="2"></el-option>
              <el-option label="选项3" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签">
            <el-select v-model="form.tags" class="select-style" placeholder="请选择" multiple>
              <el-option label="选项1" :value="1"></el-option>
              <el-option label="选项2" :value="2"></el-option>
              <el-option label="选项3" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="允许评论">
            <el-radio-group v-model="form.isComment">
              <el-radio label="1">正常</el-radio>
              <el-radio label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否置顶">
            <el-radio-group v-model="form.isTop">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="缩略图">
        <el-upload
          ref="upload"
          class="width-style"
          drag
          v-model:file-list="fileList"
          :limit="1"
          :before-remove="uploadRemove"
          :http-request="upload"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件拖拽到此处，或<em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" class="width-style">
        <mavon-editor class="width-style" v-model="form.content"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('0')">发布</el-button>
        <el-button type="info" @click="submitForm('1')">保存到草稿箱</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import { uploadArticleCover } from "../../api/upload"

export default {
  data() {
    return {
      //上传的文件列表
      fileList: [],
      form: {
        //标题
        title: "",
        //文章内容
        content: "",
        //文章摘要
        summary: "",
        //所属分类id
        categoryId: "",
        //缩略图
        thumbnail: "",
        //是否置顶（0否，1是）
        isTop: "0",
        //状态（0已发布，1草稿）
        status: "",
        //是否允许评论 1是，0否
        isComment: "1",
        //标签id列表
        tags: []
      }
    }
  },
  methods: {
    /**
     * 提交表单
     */
    submitForm(status) {
      this.form.status = status;
      console.log(this.form);
    },
    /**
     * 上传文章封面图
     */
    upload(options) {
      // console.log(this.fileList);
      //得到上传文件列表中的文件
      const file = this.fileList[0];
      //设置文件的状态为正在上传
      file.status = "uploading";
      //构造请求所需的参数
      let data = new FormData()
      data.append("img", options.file)
      //发送请求
      uploadArticleCover(data).then((response) => {
        if(response != null) {
          //将返回的文件地址赋值到表单
          this.form.thumbnail = response.data;
          //设置文件上传的状态为成功，并添加回文件列表中（设置为success后自动保留在列表中）
          file.status = "success";
          ElMessage.success("上传成功");
        } else {
          //有错误
          uploadError();
        }
      }).catch((error) => {
        this.uploadError();
      });
    },
    /**
     * 上传缩略图出错
     */
    uploadError() {
      this.$refs['upload'].clearFiles();
    },
    /**
     * 文件列表移除前触发
     */
    uploadRemove(uploadFile, uploadFiles) {
      const that = this;
      ElMessageBox.confirm(
        '确定要删除已上传的文件吗？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        //确认删除
        //发送删除请求
        console.log("删除");
        //删除请求成功后清空文件列表
        that.$refs['upload'].clearFiles();
      }).catch(() => {
        //取消删除(外层的返回false本身就是取消删除，所以此处不用做任何事)
      });
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
.select-style {
  width: 100%;
}
.width-style {
  width: 100%;
}
</style>