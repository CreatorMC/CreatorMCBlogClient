<template>
  <div>
    <el-form inline label-width="80px">
      <el-form-item label="分类名称">
        <el-input v-model="form.name" placeholder="请输入分类名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="状态" clearable>
          <el-option label="正常" value="0" />
          <el-option label="停用" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableData">
          <el-icon><Search /></el-icon>
          <span>搜索</span>
        </el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" plain @click="openAddCategoryDialog">
        <el-icon><Plus /></el-icon>
        <span>新增</span>
      </el-button>
      <el-button type="danger" plain :disabled="isDisableDelete" @click="deleteSelectedCategory">
        <el-icon><Delete /></el-icon>
        <span>删除</span>
      </el-button>
      <el-button type="success" plain>
        <el-icon><Download /></el-icon>
        <span>导出</span>
      </el-button>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" @selection-change="selectChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="分类编号" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="changeStatus($event, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <div class="operation-cell">
            <el-button type="primary" link @click="openEditCategoryDialog(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button type="danger" link @click="deleteCategory([scope.row.id])">
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
    <!-- 编辑分类组件 -->
    <EditCategoryComponent ref="editDialog" @get-table-data="getTableData" />
    <!-- 新增分类组件 -->
    <AddCategoryComponent ref="addDialog" @get-table-data="getTableData" />
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import PaginationComponent from '@/components/utils/PaginationComponent.vue';
import { getPageCategoryList, deleteCategory } from '@/api/category';
import AddCategoryComponent from '@/components/content/category/AddCategoryComponent.vue';
import EditCategoryComponent from '@/components/content/category/EditCategoryComponent.vue';

export default {
  data() {
    return {
      //当前页数
      nowPage: 1,
      //一页显示多少条数据
      pageSize: 10,
      form: {
        //分类名称
        name: "",
        //分类状态（0正常 1停用）
        status: ""
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
      getPageCategoryList(this.nowPage, this.pageSize, this.form).then((response) => {
        if (response != null) {
          this.tableData = response.data.rows;
          this.total = parseInt(response.data.total);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 打开新增分类对话框
     */
    openAddCategoryDialog() {
      this.$refs['addDialog'].openAddCategoryDialog();
    },
    /**
     * 打开编辑分类对话框
     */
    openEditCategoryDialog(data) {
      this.$refs['editDialog'].openEditCategoryDialog(data);
    },
    /**
     * 删除分类
     */
    deleteCategory(ids) {
      ElMessageBox.confirm(
        `确定要删除选中的分类吗？`,
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        //确认
        deleteCategory(ids).then((response) => {
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
     * 删除选中的分类
     */
    deleteSelectedCategory() {
      let selectedList = this.$refs['table'].getSelectionRows();
      let ids = [];
      selectedList.forEach(article => {
        ids.push(article.id);
      });
      this.deleteCategory(ids);
    },
    /**
     * 更新分类状态
     */
    changeStatus(val, data) {
      // ElMessageBox.confirm(
      //   '确认要&nbsp;<strong>' + (val == "0" ? "启用" : "停用") +'</strong>&nbsp;<strong>' + data.userName + "</strong>&nbsp;用户吗？",
      //   '警告',
      //   {
      //     confirmButtonText: '确认',
      //     cancelButtonText: '取消',
      //     type: 'warning',
      //     dangerouslyUseHTMLString: true
      //   }
      // ).then(() => {
      //   //确认
      //   changeUserStatus({
      //     id: data.id,
      //     status: val
      //   }).then((response) => {
      //     if(response != null) {
      //       ElMessage.success("更新成功");
      //     } else {
      //       data.status = data.status == "0" ? "1" : "0";
      //     }
      //   });
      // }).catch(() => {
      //   //取消
      //   data.status = data.status == "0" ? "1" : "0";
      // });
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
  components: { PaginationComponent, AddCategoryComponent, EditCategoryComponent }
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