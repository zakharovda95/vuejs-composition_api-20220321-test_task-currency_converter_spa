<template>
  <div class="converter_item">
    <div class="converter_item__input_group">
      <div class="converter_item__input">
        <ui-input
          class="converter_input"
          type="number"
          :model-value="inputValue"
          @update:model-value="updateValue"
        ></ui-input>
      </div>
      <div class="converter_item__left_char_code">
        {{ selectedCurrency.leftCharCode }}
      </div>
    </div>
    <div class="converter_item__change">
      <ui-button class="converter_button__change" tag="button" @click="exchange"
        >&hArr;</ui-button
      >
    </div>
    <div class="converter_item__display">
      <div class="converter_item__right_numbers">
        {{ selectedCurrency.rightNominal.toFixed(2) }}
      </div>
      <div class="converter_item__right_char_code">
        {{ selectedCurrency.rightCharCode }}
      </div>
    </div>
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
    //универсальная форма объекта текущей валюты
    const selectedCurrency = computed(
      () => store.state.converter.selectedCurrency,
    );
    //апдейт модел валуе
    const inputValue = computed(() => store.state.converter.inputValue);
    const updateValue = payload => {
      store.commit('UPDATE_INPUT_VALUE', Number(payload));
      store.commit('CALCULATE_VALUE');
    };

    const reverse = computed(() => store.state.converter.reverse);
    const exchange = () => {
      //реверс преобразования
      if (!reverse.value) {
        store.commit('REVERSE', true);
      } else {
        store.commit('REVERSE', false);
      }
      //меняем местами чаркод
      store.commit('EXCHANGE_VALUE_CHAR_CODE');
      store.commit('CALCULATE_VALUE');
    };
    return {
      selectedCurrency,
      inputValue,
      updateValue,
      exchange,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/ConverterItem.scss';
</style>
