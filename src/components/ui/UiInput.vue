<template>
  <input
    class="ui_input"
    type="text"
    v-bind="$attrs"
    @input="proxyValue = $event.target.value"
  />
</template>

<script>
import { computed } from 'vue';

import { useStore } from 'vuex';

export default {
  name: 'UiInput',
  props: {
    tag: {
      type: String,
      default: 'input',
    },
  },
  inheritAttrs: false,

  setup() {
    const store = useStore();
    const proxyValue = computed({
      get() {
        return store.state.currencies.inputValue;
      },
      set(value) {
        store.commit('UPDATE_VALUE', value);
        store.commit('SEARCH_ARRAY');
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
