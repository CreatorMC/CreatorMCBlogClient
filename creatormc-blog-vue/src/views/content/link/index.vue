<template>
  <div>
    <div class="main-container">
      <div class="seat"></div>
      <el-row :gutter="gutter">
        <el-col :sm="24" :md="16">
          <el-card class="body" shadow="never">
            <template #header>
              <h1>友情链接</h1>
            </template>
            <div>
              <p>
                如果您是网站站长，欢迎您联系我添加您的网站链接！<br>
                申请方式：邮箱、社交平台私信均可。<br>
                申请格式：<br>
                网站名称: 您的网站名称<br>
                网站地址: 您的网站链接<br>
                网站描述: 您的网站描述<br>
              </p>
              <el-row>
                <el-col class="link" v-for="item in linkList" :sm="24" :md="12">
                  <a :href="item.address" target="_blank">
                    <div class="container">
                      <el-image class="icon" :src="item.logo" fit="contain"></el-image>
                      <div class="content">
                        <div><h4>{{ item.name }}</h4></div>
                        <div class="description"><span>{{ item.description }}</span></div>
                      </div>
                    </div>
                  </a>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <CommentComponent id="1" type="1" :enable="true" />
        </el-col>
        <RightSideComponent />
      </el-row>
    </div>
    <ToTopComponent />
  </div>
</template>

<script>
import RightSideComponent from '@/components/content/index/RightSideComponent.vue';
import CommentComponent from '@/components/main/comment/CommentComponent.vue';
import { getAllLink } from '@/api/link';
import ToTopComponent from '@/components/utils/ToTopComponent.vue';
export default {
  data() {
    return {
      linkList: []
    };
  },
  methods: {
    /**
     * 获取审核通过的友链
     */
    getAllLink() {
      getAllLink().then((response) => {
        if(response != null) {
          this.linkList = response.data;
        }
      });
    }
  },
  mounted() {
    this.getAllLink();
  },
  computed: {
    gutter() {
      return window.innerWidth <= 800 ? 5 : 30;
    }
  },
  components: { RightSideComponent, CommentComponent, ToTopComponent }
}
</script>

<style lang="scss" scoped>
.body {
  position: relative;
  margin-bottom: 30px;
  h1 {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
}

.link {
  margin-bottom: 5px;
  a {
    color: black;
    text-decoration-line: none;
  }
  .container {
    display: flex;
    padding: 5px;
    background-color: var(--el-color-primary-light-9);
    transition: all 0.5s;
    h4 {
      margin-top: 0px;
      margin-bottom: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      color: gray;
      font-size: small;
    }
  }
  .content {
    width: calc(100% - 100px);
    padding-left: 10px;
    .description {
      height: 75px;
      overflow: hidden;
    }
  }
  .icon {
    width: 100px;
    height: 100px;
    min-width: 100px;
    min-height: 100px;
    background-color: white;
  }
}
.link:hover .container {
  background-color: var(--el-color-primary-light-7);
}

.link:nth-child(2n+1) {
  .container {
    margin-right: 5px;
  }
}

@media screen and (max-width: 991px) {
  .link:nth-child(2n+1) {
    .container {
      margin-right: 0px;
    }
  }
}
</style>