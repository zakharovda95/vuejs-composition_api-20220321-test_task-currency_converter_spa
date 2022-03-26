export const converterModule = {
  state: () => ({
    selectedValue: 'AUD',
    inputValue: '',
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
    // SET_SELECTED_CURRENCY: (state, payload) => {
    //   if ()
    // },
  },
  actions: {},
};
