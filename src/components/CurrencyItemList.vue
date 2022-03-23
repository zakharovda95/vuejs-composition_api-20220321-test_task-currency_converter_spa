<template>
  <div class="currency_item__list">
    <div
      class="currency"
      v-for="currency in currenciesList"
      :key="currency.charCode"
    >
      <currency-item :item="currency"></currency-item>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import CurrencyItem from '@/components/CurrencyItem.vue';

export default {
  name: 'CurrencyItemList',
  components: {
    CurrencyItem,
  },
  setup() {
    const store = useStore();
    const currenciesList = store.getters.FORMATTED_CURRENCIES;
    console.log(currenciesList);
    return {
      currenciesList,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/CurrencyItemList.scss';
</style>
