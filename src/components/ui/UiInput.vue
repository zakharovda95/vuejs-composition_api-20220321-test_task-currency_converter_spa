<template>
  <input
    class="ui_input"
    :type="type"
    v-bind="$attrs"
    :value="modelValue"
    @input="proxyValue = $event.target.value"
  />
</template>

<script>
import { computed } from 'vue';
export default {
  name: 'UiInput',
  props: {
    type: String,
    tag: {
      type: String,
      default: 'input',
    },
    modelValue: [String, Number],
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const proxyValue = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });
    return {
      proxyValue,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/components/ui/UiInput.scss';
</style>
