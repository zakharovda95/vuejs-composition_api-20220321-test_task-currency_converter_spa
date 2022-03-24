<template>
  <div class="currency_item">
    <div class="convertible_currency">
      <div class="convertable_currency__value">
        {{ item.leftNominal }}
      </div>
      <div class="convertable_currency__char_code">
        {{ item.leftCharCode }}
      </div>
    </div>
    <div class="change_value" @click="change(item.id)">&hArr;</div>
    <div class="base_currency">
      <div class="base_currency__value">{{ item.rightNominal }}</div>
      <div class="base_currency__char_code">
        {{ item.rightCharCode }}
      </div>
    </div>
    <div class="currency_difference">
      <div class="currency_difference__value">
        {{ item.differenceRub }}
      </div>
      <div class="currency_difference__icon">
        <slot> &uarr;</slot>
        <slot> &darr; </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

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
    const change = id => {
      store.commit('EXCHANGE', { id });
    };
    return {
      change,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/CurrencyItem.scss';
</style>
