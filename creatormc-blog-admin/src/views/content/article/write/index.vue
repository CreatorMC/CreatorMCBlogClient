<template>
  <div>
    <el-form ref="form" :model="form" size="large" label-width="80px" :rules="rules">
      <el-form-item prop="title" label="文章标题">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item prop="summary" label="文章摘要">
        <el-input v-model="form.summary" type="textarea" placeholder="请输入文章摘要" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="categoryId" label="分类">
            <el-select v-model="form.categoryId" class="select-style" placeholder="请选择" :loading="isLoadingCategory">
              <el-option v-for="item in categoryList" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="tags" label="标签">
            <el-select v-model="form.tags" class="select-style" placeholder="请选择" multiple :loading="isLoadingTag">
              <el-option v-for="item in tagList" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="isComment" label="允许评论">
            <el-radio-group v-model="form.isComment">
              <el-radio label="1">正常</el-radio>
              <el-radio label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="isTop" label="是否置顶">
            <el-radio-group v-model="form.isTop">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="thumbnail" label="缩略图">
        <el-upload
          ref="upload"
          class="width-style"
          drag
          v-model:file-list="fileList"
          :limit="1"
          :before-remove="uploadRemove"
          :http-request="upload"
          list-type="picture"
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
      <el-form-item prop="content" label="文章内容" class="width-style">
        <mavon-editor class="width-style" ref="md" placeholder="请输入文章内容" v-model="form.content" @imgAdd="uploadArticleContentImg" @imgDel="deleteArticleContentImg" />
      </el-form-item>
      <el-form-item v-if="!isEdit">
        <el-button type="primary" @click="submitForm('0')">发布</el-button>
        <el-button type="info" @click="submitForm('1')">保存到草稿箱</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" @click="saveEdit('0')">更新并发布</el-button>
        <el-button type="info" @click="saveEdit('1')">更新并保存草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import { deleteArticleCover, uploadArticleCover } from "@/api/upload"
import { getAllCategory } from "@/api/category"
import { getAllTag } from "@/api/tag"
import { addArticle, getArticle, updateArticle } from "@/api/article"
import router from "../../../../router";

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
      },
      //分类对象列表
      categoryList: [
        {
          "description": "",
          "id": "",
          "name": ""
        }
      ],
      //标签对象列表
      tagList: [
        {
          "id": "",
          "name": ""
        }
      ],
      isLoadingCategory: true,
      isLoadingTag: true,
      //表单验证规则
      rules: {
        title: [
          {
            required: true,
            message: '请输入文章标题',
            trigger: 'blur'
          }
        ],
        categoryId: [
          {
            required: true,
            message: '请选择文章分类',
            trigger: 'blur'
          }
        ],
        tags: [
          {
            required: true,
            message: '请选择文章标签',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入文章内容',
            trigger: 'blur'
          }
        ]
      },
      //是否处于编辑模式
      isEdit: false
    }
  },
  methods: {
    /**
     * 提交表单
     */
    submitForm(status) {
      this.form.status = status;
      const that = this;
      //表单校验
      this.$refs['form'].validate((valid, fields) => {
        if(valid) {
          //校验成功
          addArticle(that.form).then((response) => {
            //添加文章成功
            ElMessage.success("添加成功");
            //重置表单
            that.$refs['form'].resetFields();
            // TODO 进行路由跳转
            router.push("/index/content/article");
          });
        }
      });
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
        if(that.isEdit) {
          //如果处于编辑模式，不真正删除，以防删除后没有提交表单导致文章缩略图在前台不显示
          ElMessage.success("删除成功");
          that.$refs['upload'].clearFiles();
        } else {
          deleteArticleCover(that.form.thumbnail).then((response) => {
            if(response != null) {
              ElMessage.success("删除成功");
              //删除请求成功后清空文件列表
              that.$refs['upload'].clearFiles();
            }
          });
        }
      }).catch(() => {
        //取消删除(外层的返回false本身就是取消删除，所以此处不用做任何事)
      });
      return false;
    },
    /**
     * 上传文章内容中的图片
     */
    uploadArticleContentImg(pos, imgfile) {
      const that = this;
      //构造请求所需的参数
      let data = new FormData()
      data.append("img", imgfile)
      //发送请求
      uploadArticleCover(data).then((response) => {
        if(response != null) {
          that.$refs['md'].$img2Url(pos, response.data);
          //自己添加的属性，为了实现删除图片
          imgfile.url = response.data;
          ElMessage.success("上传成功");
        }
      })
    },
    /**
     * 文章内容中删除图片
     */
    deleteArticleContentImg(args) {
      deleteArticleCover(args[1].url).then((response) => {
        if(response != null) {
          ElMessage.success("删除成功");
        }
      });
    },
    /**
     * 更新文章
     */
    saveEdit(status) {
      this.form.status = status;
      const that = this;
      //表单校验
      this.$refs['form'].validate((valid, fields) => {
        if(valid) {
          updateArticle(that.form).then((response) => {
            //添加文章成功
            ElMessage.success("更新成功");
            //重置表单
            that.$refs['form'].resetFields();
            // TODO 路由跳转
            router.push("/index/content/article");
          });
        }
      });
    }
  },
  mounted() {
    this.isEdit = false;
    //查询所有分类，显示到选择文章分类下拉框中
    getAllCategory().then((response) => {
      if(response != null) {
        this.categoryList = response.data;
        this.isLoadingCategory = false;
      }
    });
    //查询所有标签，显示到选择标签的下拉框中
    getAllTag().then((response) => {
      if(response != null) {
        this.tagList = response.data;
        this.isLoadingTag = false;
      }
    });
    //从文章管理界面点击编辑按钮后
    if(this.$route.params.id[0]) {
      this.isEdit = true;
      getArticle(this.$route.params.id[0]).then((response) => {
        if(response != null) {
          this.form = response.data;
          if(this.form.thumbnail != null && this.form.thumbnail != "") {
            //有缩略图，创建一个假的缩略图文件对象，以在界面上显示
            this.fileList.push(
              {
                name: "缩略图",
                percentage: 0,
                raw: new File([], "缩略图", null),
                url: this.form.thumbnail,
                status: "success"
              }
            );
          }
        }
      });
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