import { createStore } from 'vuex';
import axios from 'axios';

export const store = createStore({
  strict: process.env.NODE_ENV !== 'production',

  state() {
    return {
      baseCurrency: {
        charCode: 'RUB',
        nominal: 1,
        name: 'Российский рубль',
      },
      currencies: null,
    };
  },
  getters: {
    CURRENCIES_DATA: state => state.currencies,
    CURRENCIES_VALUTE: state => state.currencies.Valute,
    CURRENCIES_DATE: state => state.currencies.PreviousDate,
    BASE_CURRENCY: state => state.baseCurrency,
  },
  mutations: {
    SET_CURRENCIES: (state, payload) => {
      state.currencies = payload;
    },
  },
  actions: {
    GET_CURRENCIES: async context => {
      const response = await axios.get(
        'https://www.cbr-xml-daily.ru/daily_json.js',
      );
      context.commit('SET_CURRENCIES', response.data);
    },
  },
});
