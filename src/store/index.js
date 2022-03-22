import { createStore } from 'vuex';
import axios from 'axios';

export const store = createStore({
  strict: process.env.NODE_ENV !== 'production',

  state() {
    return {
      latestRates: {},
      currencies: {},
    };
  },
  getters: {},
  mutations: {
    SET_CURRENCIES: (state, payload) => {
      state.currencies = payload;
    },
    SET_LATEST_RATES: (state, payload) => {
      state.latestRates = payload;
    },
  },
  actions: {
    GET_LATEST_RATES: async context => {
      const response = await axios.get(
        'https://www.cbr-xml-daily.ru/latest.js',
      );
      context.commit('SET_LATEST_RATES', response.data);
    },
    GET_CURRENCIES: async context => {
      const response = await axios.get(
        'https://www.cbr-xml-daily.ru/daily_json.js',
      );
      context.commit('SET_CURRENCIES', response.data);
    },
  },
});
