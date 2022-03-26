<template>
  <select
    class="ui_dropdown"
    v-bind="$attrs"
    @change="proxyDropdown = $event.target.value"
  >
    <option v-for="option in options" :value="option.value" :key="option.name">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiDropdown',
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: {
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    modelValue: String,
  },
  setup(props, { emit }) {
    const proxyDropdown = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });
    return {
      proxyDropdown,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/components/ui/UiDropdown.scss';
</style>
