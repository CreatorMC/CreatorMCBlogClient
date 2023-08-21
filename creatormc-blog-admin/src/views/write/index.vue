<template>
  <div>
    <el-form size="large" label-width="100px">
      <el-form-item label="文章标题">
        <el-input placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要">
        <el-input type="textarea" placeholder="请输入文章摘要" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分类">
            <el-select class="select-style" placeholder="请选择">
              <el-option label="选项1" :value="1"></el-option>
              <el-option label="选项2" :value="2"></el-option>
              <el-option label="选项3" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签">
            <el-select class="select-style" placeholder="请选择">
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
          class="upload-style"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
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
      <mavon-editor v-model="form.content"/>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        isTop: "",
        //状态（0已发布，1草稿）
        status: "",
        //是否允许评论 1是，0否
        isComment: "",
        //标签id列表
        tags: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select-style {
  width: 100%;
}
.upload-style {
  width: 100%;
}
</style>