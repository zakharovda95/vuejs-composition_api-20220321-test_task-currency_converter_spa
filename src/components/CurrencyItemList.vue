<template>
  <div class="currency_item__list">
    <ui-input
      placeholder="Поиск..."
      :model-value="value"
      @update:model-value="updateInput"
    ></ui-input>
    <div
      class="currency"
      v-for="currency in currenciesArray"
      :key="currency.id"
    >
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
    const value = computed(() => store.state.currencies.inputValue);
    ``;
    const updateInput = payload => {
      store.commit('UPDATE_VALUE', payload);
    };
    return {
      updateInput,
      //currenciesArray,
      value,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/CurrencyItemList.scss';
</style>
