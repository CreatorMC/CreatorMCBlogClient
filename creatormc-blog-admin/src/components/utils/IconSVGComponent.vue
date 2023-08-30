<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
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
  computed: {
    iconName() {
      return `/spritemap.svg#${this.name}`
    }
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