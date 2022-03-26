<template>
  <div class="code">{{ item.code }}</div>
  <div class="currency_item">
    <div class="convertible_currency">
      <div class="convertable_currency__value">
        {{ item.leftNominal.toFixed(2) }}
      </div>
      <div class="convertable_currency__char_code">
        {{ item.leftCharCode }}
      </div>
    </div>
    <div class="change_value">
      <ui-button tag="button" @click="change(item.id)">&hArr;</ui-button>
    </div>
    <div class="base_currency">
      <div class="base_currency__value">
        {{ item.rightNominal.toFixed(2) }}
      </div>
      <div class="base_currency__char_code">
        {{ item.rightCharCode }}
      </div>
    </div>
    <div class="currency_difference">
      <div
        class="currency_difference__value"
        :class="{ high: item.difference > 0, low: item.difference < 0 }"
      >
        {{ item.difference.toFixed(2) }}
      </div>
      <div
        class="currency_difference__icon"
        :class="{ high: item.difference > 0, low: item.difference < 0 }"
      >
        <slot v-if="item.difference > 0"> &uarr;</slot>
        <slot v-else> &darr; </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import UiButton from '@/components/ui/UiButton';

export default {
  name: 'CurrencyItem',
  components: {
    UiButton,
  },
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
      store.commit('EXCHANGE', id);
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
