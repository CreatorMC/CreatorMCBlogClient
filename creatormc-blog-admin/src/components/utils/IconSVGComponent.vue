<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="'#' + name" />
  </svg>
</template>

<script>

export default {
  name: 'IconSvg',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      symbols: {},
      ComponentName: 'map'
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>