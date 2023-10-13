<template>
  <div>
    <div class="main-container">
      <div class="seat"></div>
      <el-card shadow="never">
        <div class="search-container">
          <el-input class="input"
            v-model="searchText"
            size="large"
            :maxlength="32"
            @keydown.enter.native="refresh">
          </el-input>
          <el-button class="button" type="success" @click="refresh">搜索</el-button>
        </div>
        <div v-for="item in rows" class="card">
          <router-link :to="`/index/article/${item.id}`">
            <el-card shadow="hover">
              <template #header>
                <div class="title">
                  <span v-html="item.highlightFields.title ? item.highlightFields.title[0] : item.title"></span>
                </div>
              </template>
              <div>
                <div v-if="item.highlightFields.summary" class="summary" v-html="item.highlightFields.summary ? item.highlightFields.summary[0] : ''"></div>
                <div class="text" v-html="item.highlightFields.content ? item.highlightFields.content[0] : ''"></div>
              </div>
            </el-card>
          </router-link>
        </div>
        <div class="footer">
          <el-pagination
            background
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :pager-count="7"
            layout="prev, pager, next"
            :total="total"
            @current-change="changeToPage"
          />
        </div>
      </el-card>
    </div>
    <ToTopComponent />
  </div>
</template>

<script>
import ToTopComponent from '@/components/utils/ToTopComponent.vue';
import { getSearchArticle } from '@/api/article';
import router from '@/router';
import { ElMessage } from 'element-plus';

export default {
  props: {
    text: String
  },
  data() {
    return {
      //搜索文本
      searchText: "",
      //搜索数据列表
      rows: [],
      pageNum: 0,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    /**
     * 搜索文章
     */
    getSearchArticle() {
      //如果文本为空，不进行搜索
      if(this.searchText == "") {
        ElMessage.warning("搜索框不能为空");
        return;
      }
      this.rows = [];
      getSearchArticle(this.pageNum, this.pageSize, this.searchText).then((response) => {
        if(response != null) {
          this.rows = response.data.rows;
          this.total = parseInt(response.data.total);
        }
      });
    },
    /**
     * 跳转到自己
     */
    refresh() {
      if(this.searchText == "") {
        return;
      }
      router.push(`/index/search/${this.searchText}`);
    },
    /**
     * 当前页改变时
     */
    changeToPage(value) {
      this.pageNum = value - 1;
      this.getSearchArticle();
    }
  },
  mounted() {
    this.searchText = this.text;
    this.getSearchArticle();
  },
  computed: {
    currentPage: {
      get() {
        return this.pageNum + 1;
      },
      set(v) {
        this.pageNum = v - 1
      }
    }
  },
  watch: {
    //防止不切换页面时跳转不刷新
    text(val, oldVal) {
      this.searchText = val;
      this.$nextTick(() => {
        this.getSearchArticle();
      })
    }
  },
  components: { ToTopComponent }
}
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
}
.input {
  height: 50px;
  :deep(.el-input__wrapper) {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
}
.button {
  width: 100px;
  height: 50px;
  border-radius: 0px var(--el-input-border-radius,var(--el-border-radius-base)) var(--el-input-border-radius,var(--el-border-radius-base)) 0px;
}
.card {
  margin-block-start: var(--el-card-padding);
  .title {
    font-size: 1.5em;
    font-weight: bold;
  }
  .summary {
    color: var(--el-color-info-light-3);
    margin-block-end: 1em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; // 显示两行
    overflow: hidden;
  }
  :deep(em) {
    font-style: normal;
    font-weight: bold;
    color: red;
  }
  :deep(a) {
    text-decoration: none;
  }
}
.footer {
  display: flex;
  justify-content: center;
  margin-block-start: var(--el-card-padding);
}
</style>