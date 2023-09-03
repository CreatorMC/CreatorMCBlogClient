<template>
  <div>
    <el-form inline label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="form.userName" placeholder="请输入用户名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.phonenumber" placeholder="请输入手机号码" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="用户状态" clearable>
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
      <el-table-column prop="id" label="用户编号" />
      <el-table-column prop="userName" label="用户名称" />
      <el-table-column prop="nickName" label="用户昵称" />
      <el-table-column prop="sex" label="性别">
        <template #default="scope">
          {{ scope.row.sex == "0" ? "男" : (scope.row.sex == "1" ? "女" : "未知") }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phonenumber" label="手机号码" />
      <el-table-column prop="type" label="用户类型">
        <template #default="scope">
          {{ scope.row.type == "0" ? "普通用户" : "管理员" }}
        </template>
      </el-table-column>
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
            <el-button type="primary" text @click="openEditUserDialog(scope.row)">
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button type="danger" text @click="deleteUser([scope.row.id])">
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
    <!-- 编辑用户组件 -->
    <EditUserComponent ref="editDialog" @get-table-data="getTableData" />
    <!-- 新增用户组件 -->
    <AddUserComponent ref="addDialog" @get-table-data="getTableData" />
  </div>
</template>

<script>
import { getPageUserList, changeUserStatus, deleteUser } from "@/api/user"
import { ElMessage, ElMessageBox } from "element-plus"
import EditUserComponent from "@/components/system/user/EditUserComponent.vue"
import AddUserComponent from "@/components/system/user/AddUserComponent.vue"
import PaginationComponent from "@/components/utils/PaginationComponent.vue"

export default {
  data() {
    return {
      //当前页数
      nowPage: 1,
      //一页显示多少条数据
      pageSize: 10,
      form: {
        userName: "",
        phonenumber: "",
        status: ""
      },
      tableData: [
        // {
        //   //用户id
        //   id: "",
        //   //用户名
        //   userName: "",
        //   //昵称
        //   nickName: "",
        //   //用户性别（0男，1女，2未知）
        //   sex: "0",
        //   //邮箱
        //   email: "",
        //   //手机号
        //   phonenumber: "",
        //   //账号状态（0正常 1停用）
        //   status: "0",
        //   //创建时间
        //   createTime: ""
        // }
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
    EditUserComponent,
    AddUserComponent,
    PaginationComponent
  },
  methods: {
    /**
     * 获取表格中的数据
     */
    getTableData() {
      this.tableLoading = true;
      getPageUserList(this.nowPage, this.pageSize, this.form).then((response) => {
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
      this.$refs['editDialog'].openEditUserDialog(data);
    },
    /**
     * 更新用户状态
     */
    changeStatus(val, data) {
      ElMessageBox.confirm(
        '确认要&nbsp;<strong>' + (val == "0" ? "启用" : "停用") +'</strong>&nbsp;<strong>' + data.userName + "</strong>&nbsp;用户吗？",
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }
      ).then(() => {
        //确认
        changeUserStatus({
          id: data.id,
          status: val
        }).then((response) => {
          if(response != null) {
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
     * 打开新增用户对话框
     */
    openAddUserDialog() {
      this.$refs['addDialog'].openAddUserDialog();
    },
    /**
     * 删除用户
     */
    deleteUser(ids) {
      ElMessageBox.confirm(
        '确定要删除选中的用户吗？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        //确认
        deleteUser(ids).then((response) => {
          if(response != null) {
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
     * 删除选中的用户
     */
    deleteSelectedUser() {
      let selectedList = this.$refs['table'].getSelectionRows();
      let ids = [];
      selectedList.forEach(user => {
        ids.push(user.id);
      });
      this.deleteUser(ids);
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