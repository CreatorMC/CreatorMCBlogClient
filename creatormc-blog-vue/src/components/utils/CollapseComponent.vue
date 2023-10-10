<template>
  <div class="container" ref="dom">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CollapseComponent",
  props: {
    //是否展开
    modelValue: Boolean
  },
  emits: [
    'update:modelValue'
  ],
  expose: [
    'changeStatus'
  ],
  data() {
    return {
      //状态转换时的阻塞，为了防止用户切换过快导致bug
      block: false,
      maxHeight: 0
    }
  },
  methods: {
    /**
     * 展开
     */
    open() {
      this.$refs.dom.style.display = '';
      let h = this.$refs.dom.offsetHeight;
      this.maxHeight = h;
      this.$refs.dom.style.maxHeight = '0px';
      //为了避免在同一帧设置高度，导致过渡不生效
      setTimeout(() => {
        this.$refs.dom.style.maxHeight = `${h + 10}px`;
        setTimeout(() => {
          //过渡动画结束后，复原样式，因为内部可能会展开回复框，导致变高
          this.$refs.dom.style.maxHeight = '';
        }, 500);
      }, 1);
    },
    /**
     * 折叠
     */
    close() {
      this.$refs.dom.style.maxHeight = `${this.maxHeight}px`;
      setTimeout(() => {
        this.$refs.dom.style.maxHeight = '0px';
      }, 1);
      setTimeout(() => {
        this.$refs.dom.style.maxHeight = '';
        this.$refs.dom.style.display = 'none';
      }, 500);
    },
    changeStatus() {
      if(!this.block) {
        this.block = true;
        this.isExpand = !this.isExpand;
        setTimeout(() => {
          this.block = false;
        }, 500);
      }
    }
  },
  mounted() {
    if(this.isExpand) {
      this.open();
    } else {
      this.close();
    }
  },
  computed: {
    isExpand: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  watch: {
    isExpand(val, oldVal) {
      if(val) {
        this.open();
      } else {
        this.close();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  transition: all 0.5s;
}
</style>