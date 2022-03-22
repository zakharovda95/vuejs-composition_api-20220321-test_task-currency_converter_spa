<template>
  <div class="currency_item">
    <div class="convertible_currency">
      <div class="convertable_currency__value">{{ item.Nominal }}</div>
      <div class="convertable_currency__char_code">{{ item.CharCode }}</div>
    </div>
    <div class="change_value">вжух</div>
    <div class="base_currency">
      <div class="base_currency__nominal">{{ item.Value }}</div>
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
    // const correctNominal = computed(() => {
    //   const item = props.item;
    //   if (item.Nominal === 1) {
    //     return 1;
    //   }
    //   if (item.Nominal > 1) {
    //     return item.Value / item.Nominal;
    //   }
    //   if (item.nominal < 1) {
    //     return item.Value * item.Nominal;
    //   }
    //   return;
    // });
    return {
      baseCurrency,
      //correctNominal,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/CurrencyItem.scss';
</style>
