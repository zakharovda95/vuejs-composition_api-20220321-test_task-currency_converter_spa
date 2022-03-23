<template>
  <div class="currency_list">
    <div class="previous_date">
      <p>Время последнего обновления: {{ previousDate }}</p>
    </div>
    <currency-item-list></currency-item-list>
  </div>
</template>

<script>
import CurrencyItemList from '@/components/CurrencyItemList.vue';
import moment from 'moment';
import 'moment/locale/ru';
import { useStore } from 'vuex';
import { computed } from 'vue';

moment.locale('ru');

export default {
  name: 'CurrencyList',
  components: {
    CurrencyItemList,
  },
  setup() {
    const store = useStore();
    const previousDate = computed(() =>
      moment(store.getters.CURRENCIES_PREVIOUS_DATE).format(
        'DD MMMM yy в H:mm.',
      ),
    );
    return {
      previousDate,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/pages/CurrencyList.scss';
</style>
