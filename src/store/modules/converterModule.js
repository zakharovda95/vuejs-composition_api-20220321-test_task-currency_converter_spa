export const converterModule = {
  state: () => ({
    selectedValue: undefined,
    baseCurrency: 'RUB',
    inputValue: 1,
    selectedCurrency: null,
  }),
  getters: {
    CONVERTER_OPTIONS: (state, getters, rootState) => {
      return rootState.currencies.formattedCurrency.map(item => {
        return {
          value: item.charCode,
          name: item.charCode,
        };
      });
    },
  },
  mutations: {
    SELECT_VALUE_CONVERTER: (state, payload) => {
      state.selectedValue = payload;
    },
    SET_SELECTED_CURRENCY_DATA: (state, payload) => {
      state.selectedCurrency = {
        baseCoast: payload.data.Value,
        leftNominal: state.inputValue,
        leftCharCode: payload.charCode,
        rightNominal: payload.data.Value,
        rightCharCode: state.baseCurrency,
      };
    },
    UPDATE_INPUT_VALUE: (state, payload) => {
      state.inputValue = payload;
    },
    CALCULATE_VALUE: state => {
      if (state.inputValue === 1) {
        state.selectedCurrency.rightNominal = state.selectedCurrency.baseCoast;
      }
      if (state.inputValue <= 0) {
        state.selectedCurrency.rightNominal = 0;
      }
      if (state.inputValue !== 0) {
        state.selectedCurrency.rightNominal *= state.inputValue;
      }
    },
    EXCHANGE_VALUE: state => {
      if (state.selectedCurrency.rightCharCode === state.baseCurrency) {
        state.selectedCurrency.rightCharCode =
          state.selectedCurrency.leftCharCode;
        state.selectedCurrency.leftCharCode = state.baseCurrency;
      } else {
        state.selectedCurrency.leftCharCode =
          state.selectedCurrency.rightCharCode;
        state.selectedCurrency.rightCharCode = state.baseCurrency;
      }
      state.selectedCurrency.rightNominal =
        (state.inputValue * state.inputValue) /
        state.selectedCurrency.rightNominal;
    },
  },
  actions: {
    SET_SELECTED_CURRENCY: context => {
      context.rootState.currencies.formattedCurrency.forEach(item => {
        if (item.charCode === context.state.selectedValue) {
          context.commit('SET_SELECTED_CURRENCY_DATA', item);
        }
      });
    },
  },
};
