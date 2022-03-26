import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export const currenciesModule = {
  state: () => ({
    dateNow: Date.now(),
    unformattedCurrency: null,
    formattedCurrency: null,
    viewArray: null,
    baseCurrency: 'RUB',
    nominal: 1,
    inputValueName: '',
    inputValueCode: '',
    arr: null,
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
    SEARCH_ARR: state => {
      return state.viewArray.filter(item => {
        if (state.inputValueName) {
          return item.leftCharCode
            .toLowerCase()
            .includes(state.inputValueName.toLowerCase());
        }
        if (state.inputValueCode) {
          return item.code.includes(state.inputValueCode);
        }
      });
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
        item.data.difference = item.data.Value - item.data.Previous;
      });
    },

    INIT_OBJECT: state => {
      state.viewArray = state.formattedCurrency.map(item => {
        return {
          id: item.data.ID,
          code: item.data.NumCode,
          leftNominal: state.nominal,
          leftCharCode: item.charCode,
          rightNominal: item.data.Value,
          rightCharCode: state.baseCurrency,
          difference: item.data.difference,
        };
      });
    },
    EXCHANGE: (state, id) => {
      state.viewArray.forEach(elem => {
        if (elem.id === id) {
          if (elem.rightCharCode === state.baseCurrency) {
            elem.rightCharCode = elem.leftCharCode;
            elem.leftCharCode = state.baseCurrency;
          } else {
            elem.leftCharCode = elem.rightCharCode;
            elem.rightCharCode = state.baseCurrency;
          }
          elem.difference /= elem.rightNominal;
          elem.leftNominal = state.nominal;
          elem.rightNominal = state.nominal / elem.rightNominal;
        }
      });
    },
    UPDATE_VALUE_NAME: (state, payload) => {
      state.inputValueName = payload;
    },
    UPDATE_VALUE_CODE: (state, payload) => {
      state.inputValueCode = payload;
    },
  },
  actions: {
    INIT_CURRENCIES: async context => {
      try {
        const response = await axios.get(
          'https://www.cbr-xml-daily.ru/daily_json.js',
        );
        await context.commit('SET_UNFORMATTED_CURRENCY', response.data);
        await context.commit('CONVERT_CURRENCY_OBJECT');
        await context.commit('FORMAT_CURRENCIES');
        await context.commit('CALCULATE_DIFFERENCE');
        await context.commit('INIT_OBJECT');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
