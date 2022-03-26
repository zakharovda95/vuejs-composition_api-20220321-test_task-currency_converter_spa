<template>
  <div class="currency_item__list">
    <div class="ui_input__group">
      <ui-input
        v-if="selectedValue === 'numCode'"
        placeholder="Поиск по коду..."
        :model-value="valueCode"
        type="number"
        @update:model-value="updateInputCode"
      ></ui-input>
      <ui-input
        v-if="selectedValue === 'charCode'"
        placeholder="Поиск по названию..."
        :model-value="valueName"
        @update:model-value="updateInputName"
      ></ui-input>
      <ui-dropdown
        :options="options"
        :model-value="selectedValue"
        type="text"
        @update:model-value="selectValue"
      ></ui-dropdown>
    </div>
    <div class="currency" v-for="currency in currenciesList" :key="currency.id">
      <currency-item :item="currency"></currency-item>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import CurrencyItem from '@/components/CurrencyItem.vue';
import UiInput from '@/components/ui/UiInput.vue';
import UiDropdown from '@/components/ui/UiDropdown.vue';
import { computed } from 'vue';

export default {
  name: 'CurrencyItemList',
  components: {
    UiInput,
    UiDropdown,
    CurrencyItem,
  },
  setup() {
    const store = useStore();
    const currenciesList = computed(() => store.getters.SEARCH_ARR);
    const valueName = computed(() => store.state.currencies.inputValueName);
    const valueCode = computed(() => store.state.currencies.inputValueCode);
    const options = computed(() => store.state.currencies.dropdownOptions);
    const selectedValue = computed(() => store.state.currencies.selectedValue);
    const updateInputName = payload => {
      store.commit('UPDATE_VALUE_NAME', payload);
    };
    const updateInputCode = payload => {
      store.commit('UPDATE_VALUE_CODE', payload);
    };
    const selectValue = payload => {
      store.commit('SELECT_VALUE', payload);
    };
    return {
      currenciesList,
      updateInputName,
      updateInputCode,
      selectValue,
      valueName,
      valueCode,
      options,
      selectedValue,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/CurrencyItemList.scss';
</style>
