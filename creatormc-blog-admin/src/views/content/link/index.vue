<template>
  <div>
    <el-form inline label-width="80px">
      <el-form-item label="友链名称">
        <el-input v-model="form.name" placeholder="请输入友链名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="form.status" placeholder="审核状态" clearable>
          <!-- 审核状态 (0代表审核通过，1代表审核未通过，2代表未审核) -->
          <el-option label="通过" value="0" />
          <el-option label="未通过" value="1" />
          <el-option label="未审核" value="2" />
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
      <el-button type="primary" plain @click="openAddLinkDialog">
        <el-icon><Plus /></el-icon>
        <span>新增</span>
      </el-button>
      <el-button type="danger" plain :disabled="isDisableDelete" @click="deleteSelectedLink">
        <el-icon><Delete /></el-icon>
        <span>删除</span>
      </el-button>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" @selection-change="selectChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="友链编号" />
      <el-table-column prop="name" label="友链名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="logo" label="logo">
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.logo" fit="fill" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status == '0' ? 'success' : (scope.row.status == '1' ? 'danger' : 'info')" size="large">
            {{ scope.row.status == "0" ? "通过" : (scope.row.status == '1' ? "未通过" : "未审核") }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <div class="operation-cell">
            <el-button type="primary" link @click="openEditLinkDialog(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button type="danger" link @click="deleteLink([scope.row.id])">
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
import { getPageLinkList } from '@/api/link';
// import AddLinkComponent from '@/components/content/link/AddLinkComponent.vue';
// import EditLinkComponent from '@/components/content/link/EditLinkComponent.vue';

export default {
  data() {
    return {
      //当前页数
      nowPage: 1,
      //一页显示多少条数据
      pageSize: 10,
      form: {
        //友链名称
        name: "",
        //友链状态（0正常 1停用）
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
      getPageLinkList(this.nowPage, this.pageSize, this.form).then((response) => {
        if (response != null) {
          this.tableData = response.data.rows;
          this.total = parseInt(response.data.total);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 打开新增友链对话框
     */
    openAddLinkDialog() {
      // this.$refs['addDialog'].openAddLinkDialog();
    },
    /**
     * 打开编辑友链对话框
     */
    openEditLinkDialog(data) {
      // this.$refs['editDialog'].openEditLinkDialog(data);
    },
    /**
     * 删除友链
     */
    deleteLink(ids) {
      // ElMessageBox.confirm(
      //   `确定要删除选中的友链吗？`,
      //   '警告',
      //   {
      //     confirmButtonText: '确认',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }
      // ).then(() => {
      //   //确认
      //   deleteLink(ids).then((response) => {
      //     if (response != null) {
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
     * 删除选中的友链
     */
    deleteSelectedLink() {
      // let selectedList = this.$refs['table'].getSelectionRows();
      // let ids = [];
      // selectedList.forEach(article => {
      //   ids.push(article.id);
      // });
      // this.deleteLink(ids);
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