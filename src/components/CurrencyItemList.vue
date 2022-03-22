<template>
  <div class="currency_item__list">
    <div class="currency" v-for="currency in currencies" :key="currency.ID">
      {{ currency.Name }}
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted } from 'vue';

export default {
  name: 'CurrencyItemList',
  components: {},
  setup() {
    const store = useStore();
    const getCurrencies = () => {
      store.dispatch('GET_CURRENCIES');
    };
    const getLatest = () => {
      store.dispatch('GET_LATEST_RATES');
    };
    const currencies = store.state.currencies.Valute;
    const latestRates = store.state.latestRates;
    console.log(latestRates);

    onMounted(() => {
      getCurrencies();
      getLatest();
    });
    return {
      currencies,
    };
  },
};
</script>

<style scoped lang="scss"></style>
