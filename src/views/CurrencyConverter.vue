<template>
  <div class="currency_list">
    <div class="label"><p>КОНВЕРТЕР</p></div>
    <converter-wrapper></converter-wrapper>
  </div>
</template>

<script>
import ConverterWrapper from '@/components/ConverterWrapper.vue';
export default {
  name: 'CurrencyConverter',
  components: {
    ConverterWrapper,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/pages/CurrencyConverter.scss';
</style>
