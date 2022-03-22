<template>
  <component v-bind="$attrs" :is="tag">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    tag: {
      type: String,
      default: () => 'button',
    },
  },
  inheritAttrs: false,
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/components/ui/UiButton.scss';
</style>
