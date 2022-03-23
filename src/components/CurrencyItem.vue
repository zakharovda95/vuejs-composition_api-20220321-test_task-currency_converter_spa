<template>
  <div class="currency_item">
    <div class="convertible_currency">
      <div class="convertable_currency__value">{{ nominal.toFixed(2) }}</div>
      <div class="convertable_currency__char_code">
        {{ item.data.CharCode }}
      </div>
    </div>
    <div class="change_value">вжух</div>
    <div class="base_currency">
      <div class="base_currency__value">{{ item.data.Value.toFixed(2) }}</div>
      <div class="base_currency__char_code">{{ baseCurrency.charCode }}</div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
//import { computed } from 'vue';

export default {
  name: 'CurrencyItem',
  components: {},
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup() {
    const store = useStore();
    const baseCurrency = store.getters.BASE_CURRENCY;
    const nominal = store.getters.NOMINAL;
    return {
      baseCurrency,
      nominal,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/CurrencyItem.scss';
</style>
