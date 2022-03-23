import { createStore } from 'vuex';
import axios from 'axios';

export const store = createStore({
  strict: process.env.NODE_ENV !== 'production',

  state() {
    return {
      nominal: 1,
      baseCurrency: {
        charCode: 'RUB',
        name: 'Российский рубль',
      },
      previousDate: undefined,
      formattedValute: null,
    };
  },
  getters: {
    NOMINAL: state => state.nominal,
    CURRENCIES_PREVIOUS_DATE: state => state.previousDate,
    BASE_CURRENCY: state => state.baseCurrency,
    FORMATTED_CURRENCIES: state => state.formattedValute,
  },
  mutations: {
    SET_PREVIOUS_DATE: (state, payload) => {
      state.previousDate = payload;
    },

    FORMAT_CURRENCIES: (state, payload) => {
      state.formattedValute = payload;
    },
  },
  actions: {
    GET_CURRENCIES: async context => {
      const response = await axios.get(
        'https://www.cbr-xml-daily.ru/daily_json.js',
      );
      context.commit('SET_PREVIOUS_DATE', response.data.PreviousDate);

      //нужно попробовать разделить на 2 метода
      const valute = response.data.Valute;
      const formattedArray = Object.entries(valute);
      const valutesArray = formattedArray.map(item => {
        return {
          charCode: item[0],
          data: item[1],
        };
      });
      valutesArray.forEach(item => {
        if (item.data.Nominal === 1) {
          return;
        }
        if (item.data.Nominal > 1) {
          item.data.Value /= item.data.Nominal;
          item.data.Previous /= item.data.Nominal;
          item.data.Nominal = 1;
        }
        if (item.data.Nominal < 1) {
          item.data.Value *= item.data.Nominal;
          item.data.Previous *= item.data.Nominal;
          item.data.Nominal = 1;
        }
      });
      context.commit('FORMAT_CURRENCIES', valutesArray);
    },
  },
});
