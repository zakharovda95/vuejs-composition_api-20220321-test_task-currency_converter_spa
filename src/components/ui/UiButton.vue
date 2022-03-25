<template>
  <component class="ui_button" :is="tag" :type="buttonType"
    ><slot></slot
  ></component>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiButton',
  props: {
    tag: {
      type: String,
      default: 'button',
    },
  },

  setup(props) {
    const buttonType = computed(() => {
      if (props.tag === 'button') {
        return 'button';
      }
      return false;
    });
    return {
      buttonType,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/components/ui/UiButton.scss';
</style>
