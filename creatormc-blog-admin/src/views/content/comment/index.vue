<template>
  <div>
    <el-form inline label-width="80px">
      <el-form-item label="评论内容">
        <el-input v-model="form.content" placeholder="请输入评论内容" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属文章">
        <el-input v-model="form.articleId" placeholder="请输入文章id" clearable></el-input>
      </el-form-item>
      <el-form-item label="发送者">
        <el-input v-model="form.createBy" placeholder="请输入用户id" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableData">
          <el-icon><Search /></el-icon>
          <span>搜索</span>
        </el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="danger" plain :disabled="isDisableDelete" @click="deleteSelectedComment">
        <el-icon><Delete /></el-icon>
        <span>删除</span>
      </el-button>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" @selection-change="selectChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="评论编号" />
      <el-table-column prop="content" label="评论内容" />
      <el-table-column prop="articleTitle" label="所属文章" />
      <el-table-column prop="createName" label="发送者" />
      <el-table-column prop="createTime" label="评论时间" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <div class="operation-cell">
            <el-button type="danger" link @click="deleteComment([scope.row.id])">
              <el-icon><Delete /></el-icon>
              <span>删除</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <PaginationComponent
      v-model:nowPage="nowPage"
      v-model:pageSize="pageSize"
      :total="total"
      @get-table-data="getTableData"
    />
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import PaginationComponent from '@/components/utils/PaginationComponent.vue';
import { getPageCommentList, deleteComment } from '@/api/comment';

export default {
  data() {
    return {
      //当前页数
      nowPage: 1,
      //一页显示多少条数据
      pageSize: 10,
      form: {
        //评论内容
        content: "",
        //文章id
        articleId: "",
        //评论用户的id
        createBy: ""
      },
      //表格是否加载中
      tableLoading: false,
      //一共几条数据
      total: 0,
      //表格数据
      tableData: [],
      //是否禁用最上方的删除按钮
      isDisableDelete: true
    };
  },
  methods: {
    /**
     * 获取表格数据
     */
    getTableData() {
      this.tableLoading = true;
      getPageCommentList(this.nowPage, this.pageSize, this.form).then((response)=> {
        if(response != null) {
          this.tableData = response.data.rows;
          this.total = parseInt(response.data.total);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 删除评论
     */
    deleteComment(ids) {
      ElMessageBox.confirm(
        `确定要删除选中的评论吗？`,
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        //确认
        deleteComment(ids).then((response) => {
          if (response != null) {
            ElMessage.success("删除成功");
            //刷新数据
            this.getTableData();
          }
        });
      }).catch(() => {
        //取消
      });
    },
    /**
     * 删除选中的评论
     */
    deleteSelectedComment() {
      let selectedList = this.$refs['table'].getSelectionRows();
      let ids = [];
      selectedList.forEach(comment => {
        ids.push(comment.id);
      });
      this.deleteComment(ids);
    },
    /**
     * 表格的选择项发生改变时触发
     */
    selectChange() {
      let selectedList = this.$refs['table'].getSelectionRows();
      if(selectedList.length > 0) {
        this.isDisableDelete = false;
      } else {
        this.isDisableDelete = true;
      }
    }
  },
  mounted() {
    this.getTableData();
  },
  components: { PaginationComponent }
}
</script>

<style lang="scss" scoped>
.operation-cell {
  display: flex;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  .el-button {
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>