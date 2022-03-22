<template>
  <div class="currency_list">
    <h1>Это главная страница</h1>
    <currency-item-list></currency-item-list>
  </div>
</template>

<script>
import CurrencyItemList from '@/components/CurrencyItemList.vue';
export default {
  name: 'CurrencyList',
  components: {
    CurrencyItemList,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped lang=""></style>
