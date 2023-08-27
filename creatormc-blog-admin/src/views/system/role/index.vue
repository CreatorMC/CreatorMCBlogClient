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
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        //角色名称
        roleName: "",
        //角色状态（0正常 1停用）
        status: ""
      },
      tableData: [],
      tableLoading: true,
      isDisableDelete: true,
      
    }
  },
  methods: {
    getTableData() {

    },
    openAddRoleDialog() {

    },
    deleteSelectedRole() {

    },
    /**
     * 更新角色状态
     */
    changeStatus(val, data) {

    },
    /**
     * 打开编辑角色对话框
     */
    openEditRoleDialog() {

    },
    /**
     * 删除角色
     */
    deleteRole() {

    },
    /**
     * 表格的选择项发生改变时触发
     */
    selectChange() {

    }
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