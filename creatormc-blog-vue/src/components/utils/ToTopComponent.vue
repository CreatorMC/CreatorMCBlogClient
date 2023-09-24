<template>
  <div ref="top" class="top" @click="toTop">
    <div class="light"></div>
  </div>
</template>

<script>
export default {
  name: "ToTopComponent",
  data() {
    return {

    }
  },
  methods: {
    scrollHandle() {
      let half = window.innerHeight / 2.0;
      if(document.documentElement.scrollTop > half) {
        this.$refs.top.style.top = '-200px';
      } else {
        this.$refs.top.style.top = '-900px';
      }
    },
    toTop() {
      scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },
  mounted() {
    addEventListener("scroll", this.scrollHandle);
  },
  unmounted() {
    removeEventListener("scroll", this.scrollHandle);
  }
}
</script>

<style lang="scss" scoped>
.top {
  position: fixed;
  top: -900px;
  right: 80px;
  width: 64px;
  height: 900px;
  z-index: 400;
  background: url("/img/to_top.png") no-repeat 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: all 0.5s ease-in-out;
  .light {
    position: absolute;
    width: 24px;
    height: 24px;
    bottom: 14px;
    border-radius: 50%;
  }
}
.top:hover {
  .light {
    background-color: #fdfd8b55;
    box-shadow: 0 0 20px #fdfd8b;
  }
}

@media screen and (max-width: 800px) {
  .top {
    display: none;
  }
}
</style>