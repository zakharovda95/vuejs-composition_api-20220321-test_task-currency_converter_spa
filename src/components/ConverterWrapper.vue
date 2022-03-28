<template>
  <div class="converter_wrapper">
    <div class="converter_dropdown">
      <ui-dropdown
        class="converter__select"
        :options="options"
        :model-value="selectedValue"
        @update:model-value="selectValue"
      ></ui-dropdown>
    </div>
    <converter-item></converter-item>
  </div>
</template>

<script>
import ConverterItem from '@/components/ConverterItem';
import UiDropdown from '@/components/ui/UiDropdown';
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'ConverterWrapper',
  components: { ConverterItem, UiDropdown },
  setup() {
    const store = useStore();
    //инициализация опций дропдауна
    const options = computed(() => store.getters.CONVERTER_OPTIONS);
    store.commit('SELECT_VALUE_CONVERTER', options.value[0].value);
    //инициализация объекта выбранной валюты
    const selectedValue = computed(() => store.state.converter.selectedValue);
    store.dispatch('SET_SELECTED_CURRENCY');
    //отправка нового объекта валют, пересчет значений и чаркода при выборе новой опции дропдауна
    const selectValue = payload => {
      store.commit('SELECT_VALUE_CONVERTER', payload);
      store.dispatch('SET_SELECTED_CURRENCY');
      store.commit('EXCHANGE_VALUE_CHAR_CODE');
      store.commit('CALCULATE_VALUE');
    };

    return {
      options,
      selectedValue,
      selectValue,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/ConverterWrapper.scss';
</style>
