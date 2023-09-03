<template>
  <div>
    <el-form inline label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" placeholder="请输入文章标题" clearable></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="form.summary" placeholder="请输入摘要" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableData">
          <el-icon><Search /></el-icon>
          <span>搜索</span>
        </el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" plain @click="openAddUserDialog">
        <el-icon><Plus /></el-icon>
        <span>新增</span>
      </el-button>
      <el-button type="danger" plain :disabled="isDisableDelete" @click="deleteSelectedUser">
        <el-icon><Delete /></el-icon>
        <span>删除</span>
      </el-button>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" @selection-change="selectChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="文章id" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="summary" label="摘要" />
      <el-table-column prop="categoryId" label="分类" />
      <el-table-column prop="isTop" label="是否置顶">
        <template #default="scope">
          {{scope.row.isTop == "0" ? "否" : "是"}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status == '0' ? 'success' : 'danger'" size="large">{{ scope.row.status == "0" ? "已发布" : "草稿" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="viewCount" label="访问量">
        <template #default="scope">
          {{ scope.row.viewCount }}次
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="200px">
        <template #default="scope">
          <div class="operation-cell">
            <el-button type="primary" link @click="openEditUserDialog(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button type="danger" link @click="deleteUser([scope.row.id])">
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
import { ElMessage, ElMessageBox } from "element-plus"
import PaginationComponent from "@/components/utils/PaginationComponent.vue"
import { getArticleList } from "@/api/article";

export default {
  data() {
    return {
      //当前页数
      nowPage: 1,
      //一页显示多少条数据
      pageSize: 10,
      form: {
        title: "",
        summary: ""
      },
      tableData: [
      ],
      //表格是否加载中
      tableLoading: true,
      //一共几条数据
      total: 0,
      //是否禁用最上方的删除按钮
      isDisableDelete: true
    }
  },
  components: {
    PaginationComponent
  },
  methods: {
    /**
     * 获取表格中的数据
     */
    getTableData() {
      this.tableLoading = true;
      getArticleList(this.nowPage, this.pageSize, this.form.title, this.form.summary).then((response) => {
        if(response != null) {
          this.tableData = response.data.rows;
          this.total = parseInt(response.data.total);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 打开编辑用户对话框
     */
    openEditUserDialog(data) {
      // this.$refs['editDialog'].openEditUserDialog(data);
    },
    /**
     * 打开新增用户对话框
     */
    openAddUserDialog() {
      // this.$refs['addDialog'].openAddUserDialog();
    },
    /**
     * 删除用户
     */
    deleteUser(ids) {
      // ElMessageBox.confirm(
      //   '确定要删除选中的用户吗？',
      //   '警告',
      //   {
      //     confirmButtonText: '确认',
      //     cancelButtonText: '取消',
      //     type: 'warning',
      //   }
      // ).then(() => {
      //   //确认
      //   deleteUser(ids).then((response) => {
      //     if(response != null) {
      //       ElMessage.success("删除成功");
      //       //刷新数据
      //       this.getTableData();
      //     }
      //   });
      // }).catch(() => {
      //   //取消
      // });
    },
    /**
     * 删除选中的用户
     */
    deleteSelectedUser() {
      // let selectedList = this.$refs['table'].getSelectionRows();
      // let ids = [];
      // selectedList.forEach(user => {
      //   ids.push(user.id);
      // });
      // this.deleteUser(ids);
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
  }
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