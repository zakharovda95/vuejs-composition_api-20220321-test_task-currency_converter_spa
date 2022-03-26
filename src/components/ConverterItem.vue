<template>
  <div class="converter_item">
    <div class="converter_item__input">
      <ui-input class="converter_input" type="number"></ui-input>
    </div>
    <div class="converter_item__change">
      <ui-button class="converter_button__change" tag="button"
        >&hArr;</ui-button
      >
    </div>
    <div class="converter_item__display"></div>
    <div class="converter_item__char_code"></div>
  </div>
</template>

<script>
import UiInput from '@/components/ui/UiInput.vue';
import UiButton from '@/components/ui/UiButton.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  name: 'ConverterItem',
  components: {
    UiButton,
    UiInput,
  },
  setup() {
    const store = useStore();
    const selectedCurrency = computed(() => store.getters.SELECTED_CURRENCY);
    console.log(selectedCurrency);
    return {
      selectedCurrency,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/ConverterItem.scss';
</style>
