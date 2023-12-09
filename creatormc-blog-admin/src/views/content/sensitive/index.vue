<template>
  <div>
    <el-form inline label-width="80px">
      <el-form-item label="敏感词">
        <el-input v-model="form.content" placeholder="请输入敏感词" clearable></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="类型" clearable>
          <el-option label="黑名单" value="0" />
          <el-option label="白名单" value="1" />
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
      <el-button type="primary" plain @click="openAddSensitiveDialog">
        <el-icon><Plus /></el-icon>
        <span>新增</span>
      </el-button>
      <el-button type="danger" plain :disabled="isDisableDelete" @click="deleteSelectedSensitive">
        <el-icon><Delete /></el-icon>
        <span>删除</span>
      </el-button>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" @selection-change="selectChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="content" label="敏感词" />
      <el-table-column prop="type" label="类型">
        <template #default="scope">
          <el-tag type="info">
            {{ scope.row.type == "0" ? "黑名单" : "白名单" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <div class="operation-cell">
            <el-button type="primary" link @click="openEditSensitiveDialog(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button type="danger" link @click="deleteSensitive([scope.row.id])">
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
    <!-- 编辑敏感词组件 -->
    <EditSensitiveComponent ref="editDialog" @get-table-data="getTableData" />
    <!-- 新增敏感词组件 -->
    <AddSensitiveComponent ref="addDialog" @get-table-data="getTableData" />
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import PaginationComponent from '@/components/utils/PaginationComponent.vue';
import { getPageSensitiveList, deleteSensitive } from '@/api/sensitive';
import AddSensitiveComponent from '@/components/content/sensitive/AddSensitiveComponent.vue';
import EditSensitiveComponent from '@/components/content/sensitive/EditSensitiveComponent.vue';

export default {
  data() {
    return {
      //当前页数
      nowPage: 1,
      //一页显示多少条数据
      pageSize: 10,
      form: {
        //敏感词
        content: "",
        //敏感词类型（0正常 1停用）
        type: ""
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
      getPageSensitiveList(this.nowPage, this.pageSize, this.form).then((response) => {
        if (response != null) {
          this.tableData = response.data.rows;
          this.total = parseInt(response.data.total);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 打开新增敏感词对话框
     */
    openAddSensitiveDialog() {
      this.$refs['addDialog'].openAddSensitiveDialog();
    },
    /**
     * 打开编辑敏感词对话框
     */
    openEditSensitiveDialog(data) {
      this.$refs['editDialog'].openEditSensitiveDialog(data);
    },
    /**
     * 删除敏感词
     */
    deleteSensitive(ids) {
      ElMessageBox.confirm(
        `确定要删除选中的敏感词吗？`,
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        //确认
        deleteSensitive(ids).then((response) => {
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
     * 删除选中的敏感词
     */
    deleteSelectedSensitive() {
      let selectedList = this.$refs['table'].getSelectionRows();
      let ids = [];
      selectedList.forEach(item => {
        ids.push(item.id);
      });
      this.deleteSensitive(ids);
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
  components: { PaginationComponent, AddSensitiveComponent, EditSensitiveComponent }
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