import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

export const currenciesModule = {
  state: () => ({
    dateNow: Date.now(),
    nominal: 1,
    baseCurrency: 'RUB',
    unformattedCurrency: null,
    formattedCurrency: null,
  }),
  getters: {
    DATE_NOW: state => {
      return moment(state.dateNow).format('Дата:  DD MMMM yy г. Время:  H:mm');
    },
    PREVIOUS_DATE: state => {
      return moment(state.unformattedCurrency.PreviousDate).format(
        'DD MMMM yy в H:mm.',
      );
    },
  },
  mutations: {
    SET_UNFORMATTED_CURRENCY: (state, payload) => {
      state.unformattedCurrency = payload;
    },
    CONVERT_CURRENCY_OBJECT: state => {
      const valute = state.unformattedCurrency.Valute;
      const formattedArray = Object.entries(valute);
      state.formattedCurrency = formattedArray.map(item => {
        return {
          charCode: item[0],
          data: item[1],
        };
      });
    },

    FORMAT_CURRENCIES: state => {
      state.formattedCurrency.forEach(item => {
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
    },
    CALCULATE_DIFFERENCE: state => {
      return state.formattedCurrency.forEach(item => {
        const difference = (item.data.Value - item.data.Previous).toFixed(2);
        if (difference >= 0) {
          item.data.difference = `+${difference}`;
        }
        if (difference <= 0 || difference == 0) {
          item.data.difference = difference;
        }
      });
    },
  },
  actions: {
    GET_CURRENCIES: async context => {
      const response = await axios.get(
        'https://www.cbr-xml-daily.ru/daily_json.js',
      );
      context.commit('SET_UNFORMATTED_CURRENCY', response.data);
      context.commit('CONVERT_CURRENCY_OBJECT');
      context.commit('FORMAT_CURRENCIES');
      context.commit('CALCULATE_DIFFERENCE');
    },
  },
};
``;
