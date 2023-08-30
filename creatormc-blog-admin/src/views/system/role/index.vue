<template>
  <div>
    <el-form inline label-width="80px">
      <el-form-item class="input-width" label="角色名称">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" clearable></el-input>
      </el-form-item>
      <el-form-item class="input-width" label="状态">
        <el-select v-model="form.status" placeholder="角色状态" clearable>
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
      <el-button type="primary" plain @click="openAddRoleDialog">
        <el-icon><Plus /></el-icon>
        <span>新增</span>
      </el-button>
      <el-button type="danger" plain :disabled="isDisableDelete" @click="deleteSelectedRole">
        <el-icon><Delete /></el-icon>
        <span>删除</span>
      </el-button>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" @selection-change="selectChange">
      <el-table-column type="selection" />
      <el-table-column prop="id" label="角色编号" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleKey" label="权限字符" />
      <el-table-column prop="roleSort" label="显示顺序" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="changeStatus($event, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="200px">
        <template #default="scope">
          <div class="operation-cell">
            <el-button type="primary" text @click="openEditRoleDialog(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button type="danger" text @click="deleteRole([scope.row.id])">
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
    <EditRoleComponent ref="editDialog" @get-table-data="getTableData" />
    <AddRoleComponent ref="addDialog" @get-table-data="getTableData" />
  </div>
</template>

<script>
import { getPageRoleList, changeRoleStatus, deleteRole } from '@/api/role';
import PaginationComponent from '@/components/utils/PaginationComponent.vue';
import EditRoleComponent from '@/components/system/role/EditRoleComponent.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import AddRoleComponent from '@/components/system/role/AddRoleComponent.vue';

export default {
  data() {
    return {
      //当前页
      nowPage: 1,
      //一页几条数据
      pageSize: 10,
      //总共多少条数据
      total: 0,
      form: {
        //角色名称
        roleName: "",
        //角色状态（0正常 1停用）
        status: ""
      },
      //表格数据（角色的排序在后端做了，前端不需要排序）
      tableData: [],
      tableLoading: true,
      isDisableDelete: true,
    };
  },
  methods: {
    /**
     * 获取表格数据
     */
    getTableData() {
      this.tableLoading = true;
      getPageRoleList(this.nowPage, this.pageSize, this.form).then((response) => {
        if (response != null) {
          this.tableData = response.data.rows;
          this.total = parseInt(response.data.total);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 打开新增角色对话框
     */
    openAddRoleDialog() {
      this.$refs['addDialog'].openAddRoleDialog();
    },
    /**
     * 更新角色状态
     */
    changeStatus(val, data) {
      ElMessageBox.confirm(
        '确认要&nbsp;<strong>' + (val == "0" ? "启用" : "停用") + '</strong>&nbsp;<strong>' + data.roleName + "</strong>&nbsp;角色吗？",
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }
      ).then(() => {
        //确认
        changeRoleStatus({
          id: data.id,
          status: val
        }).then((response) => {
          if (response != null) {
            ElMessage.success("更新成功");
          } else {
            data.status = data.status == "0" ? "1" : "0";
          }
        });
      }).catch(() => {
        //取消
        data.status = data.status == "0" ? "1" : "0";
      });
    },
    /**
     * 打开编辑角色对话框
     */
    openEditRoleDialog(data) {
      this.$refs['editDialog'].openEditRoleDialog(data);
    },
    /**
     * 删除角色
     */
    deleteRole(ids) {
      ElMessageBox.confirm(
        '确定要删除选中的角色吗？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        //确认
        deleteRole(ids).then((response) => {
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
     * 删除选中的角色
     */
    deleteSelectedRole() {
      let selectedList = this.$refs['table'].getSelectionRows();
      let ids = [];
      selectedList.forEach(role => {
        ids.push(role.id);
      });
      this.deleteRole(ids);
    },
    /**
     * 表格的选择项发生改变时触发
     */
    selectChange() {
      let selectedList = this.$refs['table'].getSelectionRows();
      if (selectedList.length > 0) {
        this.isDisableDelete = false;
      } else {
        this.isDisableDelete = true;
      }
    }
  },
  mounted() {
    this.getTableData();
  },
  components: {
    PaginationComponent,
    EditRoleComponent,
    AddRoleComponent
  }
}
</script>

<style lang="scss" scoped>
.input-width {
  width: 320px;
}
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