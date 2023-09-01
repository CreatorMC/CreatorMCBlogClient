<template>
  <div>
    <el-form inline label-width="80px">
      <el-form-item class="input-width" label="菜单名称">
        <el-input v-model="form.menuName" placeholder="请输入菜单名称" clearable></el-input>
      </el-form-item>
      <el-form-item class="input-width" label="状态">
        <el-select v-model="form.status" placeholder="菜单状态" clearable>
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
      <el-button type="primary" plain @click="openAddMenuDialog(null)">
        <el-icon><Plus /></el-icon>
        <span>新增</span>
      </el-button>
    </div>
    <el-table ref="table" v-loading="tableLoading" :data="tableData" row-key="id" table-layout="auto">
      <el-table-column prop="menuName" label="菜单名称" />
      <el-table-column prop="icon" label="图标">
        <template #default="scope">
          <el-icon>
            <icon-svg :name="scope.row.icon" />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" label="排序" />
      <el-table-column prop="perms" label="权限标识" />
      <el-table-column prop="component" label="组件路径" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status == '0' ? 'success' : 'danger'" size="large">{{ scope.row.status == "0" ? "正常" : "停用" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <div class="operation-cell">
            <el-button type="primary" link @click="openEditMenuDialog(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button type="primary" link @click="openAddMenuDialog(scope.row)">
              <el-icon><Plus /></el-icon>
              <span>新增</span>
            </el-button>
            <el-button type="danger" link @click="deleteMenu([scope.row.id])">
              <el-icon><Delete /></el-icon>
              <span>删除</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <EditMenuComponent ref="editDialog" @get-table-data="getTableData" />
    <AddMenuComponent ref="addDialog" @get-table-data="getTableData" />
  </div>
</template>

<script>
import EditMenuComponent from '@/components/system/menu/EditMenuComponent.vue';
import { getMenuList, disposeMenuList } from '@/api/menu';
import AddMenuComponent from '@/components/system/menu/AddMenuComponent.vue';

export default {
  data() {
    return {
      form: {
        //菜单名称
        menuName: "",
        //菜单状态（0正常 1停用）
        status: ""
      },
      tableLoading: false,
      //表格数据
      tableData: []
    };
  },
  methods: {
    /**
     * 获取表格数据
     */
    getTableData() {
      this.tableLoading = true;
      getMenuList(this.form).then((response) => {
        if (response != null) {
          //处理数据
          this.tableData = disposeMenuList(response.data);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 打开新增菜单对话框
     */
    openAddMenuDialog(data) {
      this.$refs['addDialog'].openAddMenuDialog(data);
    },
    /**
     * 打开编辑菜单对话框
     */
    openEditMenuDialog(data) {
      this.$refs['editDialog'].openEditMenuDialog(data);
    },
    deleteMenu() {
    }
  },
  mounted() {
    this.getTableData();
  },
  components: { EditMenuComponent, AddMenuComponent }
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