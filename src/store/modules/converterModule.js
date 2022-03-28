export const converterModule = {
  state: () => ({
    reverse: false,
    selectedValue: undefined,
    baseCurrency: 'RUB',
    inputValue: 1,
    selectedCurrency: null,
  }),
  //опции дропдауна
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
    //реверс преобразования валюты
    REVERSE: (state, payload) => {
      state.reverse = payload;
    },
    //текущая опция дропдауна
    SELECT_VALUE_CONVERTER: (state, payload) => {
      state.selectedValue = payload;
    },
    //объект данных выбранной валюты
    SET_SELECTED_CURRENCY_DATA_BASE: (state, payload) => {
      state.selectedCurrency = {
        baseCoast: payload.data.Value,
        charCode: payload.charCode,
        leftNominal: state.inputValue,
        leftCharCode: payload.charCode,
        rightNominal: payload.data.Value,
        rightCharCode: state.baseCurrency,
      };
    },
    //модель значения инпута
    UPDATE_INPUT_VALUE: (state, payload) => {
      state.inputValue = payload;
    },
    //вычисления в зависимости от реверса
    CALCULATE_VALUE: state => {
      if (!state.reverse) {
        if (state.inputValue === 1) {
          state.selectedCurrency.rightNominal =
            state.selectedCurrency.baseCoast;
        }
        if (state.inputValue <= 0) {
          state.selectedCurrency.rightNominal = 0;
        } else {
          state.selectedCurrency.rightNominal =
            state.inputValue * state.selectedCurrency.baseCoast;
        }
      }
      if (state.reverse) {
        if (state.inputValue === 1) {
          state.selectedCurrency.rightNominal =
            state.inputValue / state.selectedCurrency.baseCoast;
        }
        if (state.inputValue <= 0) {
          state.selectedCurrency.rightNominal = 0;
        } else {
          state.selectedCurrency.rightNominal =
            (1 / state.selectedCurrency.baseCoast) * state.inputValue;
        }
      }
    },
    //меняем местами чаркод
    EXCHANGE_VALUE_CHAR_CODE: state => {
      if (!state.reverse) {
        state.selectedCurrency.leftCharCode = state.selectedCurrency.charCode;
        state.selectedCurrency.rightCharCode = state.baseCurrency;
      } else {
        state.selectedCurrency.leftCharCode = state.baseCurrency;
        state.selectedCurrency.rightCharCode = state.selectedCurrency.charCode;
      }
    },
  },
  actions: {
    //отправляем данные выбранной валюты
    SET_SELECTED_CURRENCY: ({ state, rootState, commit }) => {
      rootState.currencies.formattedCurrency.forEach(item => {
        if (item.charCode === state.selectedValue) {
          commit('SET_SELECTED_CURRENCY_DATA_BASE', item);
        }
      });
    },
  },
};
