<template>
  <div class="currency_item__list">
    <div class="ui_input__group">
      <ui-input
        placeholder="Поиск по коду..."
        :model-value="valueCode"
        @update:model-value="updateInputCode"
      ></ui-input>
      <ui-input
        placeholder="Поиск по имени..."
        :model-value="valueName"
        @update:model-value="updateInputName"
      ></ui-input>
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
import { computed } from 'vue';

export default {
  name: 'CurrencyItemList',
  components: {
    UiInput,
    CurrencyItem,
  },
  setup() {
    const store = useStore();
    const currenciesList = computed(() => store.getters.SEARCH_ARR);
    const valueName = computed(() => store.state.currencies.inputValueName);
    const valueCode = computed(() => store.state.currencies.inputValueCode);
    const updateInputName = payload => {
      store.commit('UPDATE_VALUE_NAME', payload);
    };
    const updateInputCode = payload => {
      store.commit('UPDATE_VALUE_CODE', payload);
    };
    return {
      currenciesList,
      updateInputName,
      updateInputCode,
      valueName,
      valueCode,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/CurrencyItemList.scss';
</style>
