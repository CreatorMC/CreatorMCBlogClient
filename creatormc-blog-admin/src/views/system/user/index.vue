<template>
  <div>
    <el-form inline label-width="80px">
      <el-form-item class="input-width" label="用户名称">
        <el-input v-model="form.userName" placeholder="请输入用户名称" clearable></el-input>
      </el-form-item>
      <el-form-item class="input-width" label="手机号码">
        <el-input v-model="form.phonenumber" placeholder="请输入手机号码" clearable></el-input>
      </el-form-item>
      <el-form-item class="input-width" label="状态">
        <el-select v-model="form.status" placeholder="用户状态">
          <el-option label="无" value="" />
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
      <el-button type="primary" plain>
        <el-icon><Plus /></el-icon>
        <span>新增</span>
      </el-button>
      <el-button type="danger" plain>
        <el-icon><Delete /></el-icon>
        <span>删除</span>
      </el-button>
    </div>
    <el-table :data="tableData">
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
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-switch v-model="scope.row.status" active-value="0" inactive-value="1">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="200px">
        <template #default="scope">
          <div class="operation-cell">
            <el-button type="primary" text>
              <el-icon><Edit /></el-icon>
              <span>编辑</span>
            </el-button>
            <el-button type="danger" text>
              <el-icon><Delete /></el-icon>
              <span>删除</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="foot-container">
      <div>共&nbsp;{{ total }}&nbsp;条</div>
      <div>
        <el-select style="width: 100px;" v-model="pageSize">
          <el-option label="10条/页" :value="10"></el-option>
          <el-option label="20条/页" :value="20"></el-option>
          <el-option label="30条/页" :value="30"></el-option>
          <el-option label="40条/页" :value="40"></el-option>
        </el-select>
      </div>
      <div>
        <el-pagination
          v-model:current-page="nowPage"
          :page-size="pageSize"
          :pager-count="5"
          layout="prev, pager, next"
          :total="total"
        />
      </div>
      <div class="to-page-style">
        <span>前往&nbsp;</span>
        <el-input style="width: 60px;" v-model="toPage" type="number" @change="changeToPage"></el-input>
        <span>&nbsp;页</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageUserList } from "@/api/user"

export default {
  data() {
    return {
      //当前页数
      nowPage: 1,
      //一页显示多少条数据
      pageSize: 10,
      //跳转到某页
      toPage: 1,
      form: {
        userName: "",
        phonenumber: "",
        status: ""
      },
      tableData: [
        {
          //用户id
          id: "",
          //用户名
          userName: "",
          //昵称
          nickName: "",
          //用户性别（0男，1女，2未知）
          sex: "0",
          //邮箱
          email: "",
          //手机号
          phonenumber: "",
          //账号状态（0正常 1停用）
          status: "0",
          //创建时间
          createTime: ""
        }
      ],
      //一共几条数据
      total: 0
    }
  },
  methods: {
    /**
     * 改变前往第几页的输入框中的值时触发。
     * 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发。
     */
    changeToPage(value) {
      if(value >= 1 && value <= (Math.ceil(this.total / this.pageSize))) {
        //正常范围，跳转到指定页
      } else {
        this.toPage = 1;
      }
    },
    /**
     * 获取表格中的数据
     */
    getTableData() {
      getPageUserList(this.nowPage, this.pageSize, this.form).then((response) => {
        if(response != null) {
          this.tableData = response.data.rows;
          this.total = parseInt(response.data.total);
        }
      });
    }
  },
  mounted() {
    this.getTableData();
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
.foot-container {
  display: flex;
  align-items: center;
  padding: 10px;
}
.foot-container>div {
  margin-right: 10px;
}
.to-page-style {
  display: flex;
  align-items: center;
}
</style>