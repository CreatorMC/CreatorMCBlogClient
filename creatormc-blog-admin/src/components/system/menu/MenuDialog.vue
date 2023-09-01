<template>
  <BaseDialogComponent
    v-model="showDialog"
    :isAdd="isAddMenu"
    addText="新增菜单"
    editText="编辑菜单"
    :confirm="yes"
    :disableConfirmButton="isLoading"
    @closed="beforeClose">
    <el-form v-loading="isLoading" :model="dialogData" ref="dialogData" :rules="rule" label-width="100px" size="large" :disabled="isDisableForm">
      <el-form-item prop="parentId" label="上级菜单">
        <el-tree-select
          v-model="dialogData.parentId"
          :data="treeData"
          node-key="id"
          :props="{ label: 'menuName', children: 'children' }"
          check-strictly
          :render-after-expand="false"
          :default-expanded-keys="[dialogData.parentId]"
        >
          <template #default="{ data: { menuName, children } }">
            {{ menuName }}&nbsp;<span style="color: gray">{{ children ? (children.length > 0 ? `(${children.length})` : '') : '' }}</span>
          </template>
        </el-tree-select>
      </el-form-item>
      <el-form-item prop="menuType" label="菜单类型">
        <el-radio-group v-model="dialogData.menuType">
          <!-- 菜单类型（M目录 C菜单 F按钮） -->
          <el-radio label="M">目录</el-radio>
          <el-radio label="C">菜单</el-radio>
          <el-radio label="F">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="dialogData.menuType != 'F'" prop="icon" label="菜单图标">
        <el-select style="width: 100%;" v-model="dialogData.icon" placeholder="请选择菜单图标">
          <template #prefix>
            <!-- 可以发篇文章 -->
            <el-icon color="#606266"><icon-svg :name="dialogData.icon" /></el-icon>
          </template>
          <el-option v-for="item in iconNames" :label="item" :value="item">
            <div class="option-container">
              <el-icon><icon-svg :name="item" /></el-icon>
              <span>&nbsp;&nbsp;{{ item }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col class="inline-container" :span="24">
          <el-form-item class="auto-width" prop="menuName" label="菜单名称">
            <el-input v-model="dialogData.menuName" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
          <el-form-item class="auto-width" prop="orderNum" label="显示顺序">
            <el-input-number
              v-model="dialogData.orderNum"
              :min="0"
              :max="2147483647"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="dialogData.menuType != 'F'" prop="path">
        <template #label>
          <div>
            <el-tooltip placement="top">
              <template #content>
                <span>访问的路由地址，如："user"</span>
              </template>
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
            <span>&nbsp;路由地址</span>
          </div>
        </template>
        <el-input v-model="dialogData.path" placeholder="请输入路由地址"></el-input>
      </el-form-item>
      <el-row>
        <el-col class="inline-container" :span="24">
          <el-form-item v-if="dialogData.menuType == 'C'" class="auto-width" prop="component">
            <template #label>
              <div>
                <el-tooltip placement="top">
                  <template #content>
                    <span>访问的组件路径，如："system/user/index"，默认在"views"目录下</span>
                  </template>
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
                <span>&nbsp;组件路径</span>
              </div>
            </template>
            <el-input v-model="dialogData.component" placeholder="请输入组件路径"></el-input>
          </el-form-item>
          <el-form-item v-if="dialogData.menuType == 'C' || dialogData.menuType == 'F'" class="auto-width" prop="perms">
            <template #label>
              <div>
                <el-tooltip placement="top">
                  <template #content>
                    <span>控制器中定义的权限字符，如：@PreAuthorize("@ps.hasPermi('system:user:list')")</span>
                  </template>
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
                <span>&nbsp;权限字符</span>
              </div>
            </template>
            <el-input v-model="dialogData.perms" placeholder="请输入权限字符"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="dialogData.menuType != 'F'">
        <el-col class="inline-container" :span="24">
          <el-form-item class="auto-width" prop="visible">
            <template #label>
              <div>
                <el-tooltip placement="top">
                  <template #content>
                    <span>选择隐藏则路由将不会出现在侧边栏，但仍然可以访问</span>
                  </template>
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
                <span>&nbsp;显示状态</span>
              </div>
            </template>
            <el-radio-group v-model="dialogData.visible">
              <!-- 菜单状态（0显示 1隐藏） -->
              <el-radio label="0">显示</el-radio>
              <el-radio label="1">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="auto-width" prop="status">
            <template #label>
              <div>
                <el-tooltip placement="top">
                  <template #content>
                    <span>选择停用则路由将不会出现在侧边栏，也不能被访问</span>
                  </template>
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
                <span>&nbsp;菜单状态</span>
              </div>
            </template>
            <el-radio-group v-model="dialogData.status">
              <!-- 菜单状态（0正常 1停用） -->
              <el-radio label="0">正常</el-radio>
              <el-radio label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="remark" label="备注">
        <el-input v-model="dialogData.remark" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
  </BaseDialogComponent>
</template>

<script>
import BaseDialogComponent from '@/components/utils/BaseDialogComponent.vue';

export default {
  name: "MenuDialog",
  props: {
    /**
     * 对话框中的数据
     */
    dialogDataProp: {
      type: Object,
      required: true
    },
    /**
     * 树形菜单数据
     */
    treeDataProp: {
      type: Array,
      required: true
    },
    isLoading: Boolean,              //对话框是否在加载
    isShow: Boolean,                 //是否显示此对话框
    isDisableForm: Boolean,          //是否禁用表单
    isAddMenu: false,                //是否是新增菜单
  },
  emits: [
    'confirmMenuDialog',
    'update:isShow',
    'update:dialogDataProp'
  ],
  data() {
    return {
      rule: {
        menuName: [
          {
            required: true,
            message: '菜单名称不能为空',
            trigger: 'blur'
          }
        ],
        orderNum: [
          {
            required: true,
            message: '显示顺序不能为空',
            trigger: 'blur'
          }
        ],
        path: [
          {
            required: true,
            message: '路由地址不能为空',
            trigger: 'blur'
          }
        ]
      },
      iconNames: []
    }
  },
  mounted() {
    //从文件夹中获取所有的svg图标路径，形成文件名数组，供选择菜单图标时显示
    const files = import.meta.glob('@/assets/svg/menu/*.svg', { eager: true });
    for(const path in files) {
      this.iconNames.push(path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.')));
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.isShow;
      },
      set(value) {
        this.$emit('update:isShow', value);
      }
    },
    dialogData: {
      get() {
        return this.dialogDataProp;
      },
      set(value) {
        this.$emit('update:dialogDataProp', value);
      }
    },
    treeData: {
      get() {
        return this.treeDataProp;
      },
      set(value) {
        this.$emit('update:treeDataProp', value);
      }
    }
  },
  methods: {
    /**
     * 按下确认按钮后
     */
    yes() {
      let that = this;
      this.$refs["dialogData"].validate((vali) => {
        if (vali) {
          this.$emit("confirmMenuDialog");
        }
      });
    },
    /**
     * 对话框关闭前被调用
     */
    beforeClose() {
      this.$refs['dialogData'].resetFields();
    }
  },
  components: {
    BaseDialogComponent
  }
}
</script>

<style lang="scss" scoped>
.inline-container {
  display: flex;
  flex-wrap: wrap;
}

.auto-width {
  flex: 1 0 200px;
}

.option-container {
  display: flex;
  align-items: center;
}
</style>