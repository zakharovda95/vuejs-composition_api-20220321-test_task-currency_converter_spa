import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

export const currenciesModule = {
  state: () => ({
    dateNow: Date.now(),
    unformattedCurrency: null,
    formattedCurrency: null,
    baseCurrency: 'RUB',
    nominal: 1,
    hash: '',
    viewArray: null,
    viewArrayRub: null,
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

        if (difference > 0) {
          item.data.difference = `+${difference}`;
        }
        if (difference < 0) {
          item.data.difference = difference;
        }
        if (difference == 0) {
          item.data.difference = difference.substring(1, difference.length);
        }
      });
    },

    INIT_OBJECT: state => {
      state.viewArray = state.formattedCurrency.map(item => {
        const obj = {
          id: item.data.ID,
          leftNominal: state.nominal.toFixed(2),
          leftCharCode: item.charCode,
          rightNominal: item.data.Value.toFixed(2),
          rightCharCode: state.baseCurrency,
          differenceRub: Number(item.data.difference).toFixed(2),
        };
        return obj;
      });
      state.viewArrayRub = state.formattedCurrency.map(item => {
        const obj = {
          id: item.data.ID,
          leftNominal: state.nominal.toFixed(2),
          leftCharCode: state.baseCurrency,
          rightNominal: (state.nominal / item.data.Value).toFixed(2),
          rightCharCode: item.charCode,
          differenceRub: (
            Number(item.data.difference) / item.data.Value
          ).toFixed(2),
        };
        return obj;
      });
    },
    EXCHANGE: (state, item) => {
      state.viewArrayRub.forEach((elem, index) => {
        if (elem.id === item.id) {
          state.hash = item;
          state.viewArray[index] = elem;
        }
      });
    },
  },
  actions: {
    INIT_CURRENCIES: async context => {
      const response = await axios.get(
        'https://www.cbr-xml-daily.ru/daily_json.js',
      );
      await context.commit('SET_UNFORMATTED_CURRENCY', response.data);
      await context.commit('CONVERT_CURRENCY_OBJECT');
      await context.commit('FORMAT_CURRENCIES');
      await context.commit('CALCULATE_DIFFERENCE');
      await context.commit('INIT_OBJECT');
    },
  },
};
