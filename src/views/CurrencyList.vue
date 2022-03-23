<template>
  <div class="currency_list">
    <div class="previous_date">
      <p>Время последнего обновления: {{ prevDate }}</p>
    </div>
    <currency-item-list></currency-item-list>
  </div>
</template>

<script>
import CurrencyItemList from '@/components/CurrencyItemList.vue';

import { useStore } from 'vuex';

export default {
  name: 'CurrencyList',
  components: {
    CurrencyItemList,
  },
  setup() {
    const store = useStore();
    const prevDate = store.getters.PREVIOUS_DATE;
    return {
      prevDate,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/pages/CurrencyList.scss';
</style>
