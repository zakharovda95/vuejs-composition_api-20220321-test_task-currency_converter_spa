<template>
  <div class="currency_item__list">
    <ui-input placeholder="Поиск..."></ui-input>
    <div class="currency" v-for="currency in currenciesList" :key="currency.id">
      <currency-item :item="currency"></currency-item>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import CurrencyItem from '@/components/CurrencyItem.vue';
import UiInput from '@/components/ui/UiInput.vue';

export default {
  name: 'CurrencyItemList',
  components: {
    UiInput,
    CurrencyItem,
  },
  setup() {
    const store = useStore();
    const currenciesList = store.state.currencies.viewArray;
    //const searchArray = store.state.currencies.searchArray;
    return {
      currenciesList,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/CurrencyItemList.scss';
</style>
