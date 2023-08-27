<template>
  <div class="foot-container">
    <div>共&nbsp;{{ total }}&nbsp;条</div>
    <div>
      <el-select style="width: 100px;" v-model="size" @change="changeToPage(currentPage)">
        <el-option label="10条/页" :value="10"></el-option>
        <el-option label="20条/页" :value="20"></el-option>
        <el-option label="30条/页" :value="30"></el-option>
        <el-option label="40条/页" :value="40"></el-option>
      </el-select>
    </div>
    <div>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="size"
        :pager-count="5"
        layout="prev, pager, next"
        :total="total"
        @current-change="changeToPage"
      />
    </div>
    <div class="to-page-style">
      <span>前往&nbsp;</span>
      <el-input style="width: 60px;" v-model="toPage" type="number" @change="changeToPage"></el-input>
      <span>&nbsp;页</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "PaginationComponent",
  props: {
    nowPage: Number,
    pageSize: Number,
    total: Number
  },
  emits: [
    'getTableData',
    'update:nowPage',
    'update:pageSize'
  ],
  data() {
    return {
      //跳转到某页
      toPage: 1
    }
  },
  methods: {
    /**
     * 改变前往第几页的输入框中的值时触发。
     * 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发。
     */
     changeToPage(value) {
      if(value >= 1 && value <= (Math.ceil(this.total / this.size))) {
        //正常范围，跳转到指定页
        this.currentPage = parseInt(value);
        //获取数据
        this.$emit("getTableData");
      } else {
        this.toPage = this.currentPage;
      }
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.nowPage;
      },
      set(value) {
        this.$emit('update:nowPage', value);
      }
    },
    size: {
      get() {
        return this.pageSize;
      },
      set(value) {
        this.$emit('update:pageSize', value);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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