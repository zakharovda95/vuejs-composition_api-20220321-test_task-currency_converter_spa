<template>
  <div class="currency_item">
    <div class="convertible_currency">
      <div class="convertable_currency__value">
        {{ $store.state.currencies.nominal.toFixed(2) }}
      </div>
      <div class="convertable_currency__char_code">
        {{ item.charCode }}
      </div>
    </div>
    <div class="change_value">&hArr;</div>
    <div class="base_currency">
      <div class="base_currency__value">{{ item.data.Value.toFixed(2) }}</div>
      <div class="base_currency__char_code">
        {{ $store.state.currencies.baseCurrency }}
      </div>
    </div>
    <div class="currency_difference">
      <div
        class="currency_difference__value"
        :class="{
          high: +item.data.difference > 0,
          low: +item.data.difference < 0,
        }"
      >
        {{ item.data.difference }}
      </div>
      <div class="currency_difference__icon">
        <slot v-if="+item.data.difference > 0"> &uarr;</slot>
        <slot v-if="+item.data.difference < 0"> &darr; </slot>
      </div>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/CurrencyItem.scss';
</style>
