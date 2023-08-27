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
      }
    }
  },
  methods: {
    getTableData() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.input-width {
  width: 320px;
}
</style>