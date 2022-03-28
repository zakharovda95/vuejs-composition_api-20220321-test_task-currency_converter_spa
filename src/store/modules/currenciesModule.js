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
    dropdownOptions: [
      {
        value: 'charCode',
        name: 'По названию',
      },
      {
        value: 'numCode',
        name: 'По коду',
      },
    ],
    selectedValue: undefined,
  }),
  getters: {
    //отформатированные даты
    DATE_NOW: state => {
      return moment(state.dateNow).format('Дата:  DD MMMM yy г. Время:  H:mm');
    },
    PREVIOUS_DATE: state => {
      return moment(state.unformattedCurrency.PreviousDate).format(
        'DD MMMM yy в H:mm.',
      );
    },
    //отфильтрованный массив валют
    SEARCH_ARR: state => {
      return state.viewArray.filter(item => {
        if (state.selectedValue === 'charCode') {
          return item.leftCharCode
            .toLowerCase()
            .includes(state.inputValueName.toLowerCase());
        }
        if (state.selectedValue === 'numCode') {
          return item.code.includes(state.inputValueCode);
        }
      });
    },
  },
  mutations: {
    //неотформатированный массив валют
    SET_UNFORMATTED_CURRENCY: (state, payload) => {
      state.unformattedCurrency = payload;
    },
    //массив в едином формате, с разным номиналом
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
    //отформатированный массив с одинаковым номиналом
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
    //рассчет разницы курса
    CALCULATE_DIFFERENCE: state => {
      return state.formattedCurrency.forEach(item => {
        item.data.difference = item.data.Value - item.data.Previous;
      });
    },
    //конечный универсальный вид массива валют
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
    //пересчет значений валют и чаркодов при смене реверса
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
    //модель значения инпута (по названию)
    UPDATE_VALUE_NAME: (state, payload) => {
      state.inputValueName = payload;
    },
    //модель значения инпута (по коду)
    UPDATE_VALUE_CODE: (state, payload) => {
      state.inputValueCode = payload;
    },
    //значение по умолчанию
    INIT_SELECT_VALUE_CURRENCIES: state => {
      state.selectedValue = state.dropdownOptions[0].value;
    },
    //значение дропдауна
    SELECT_VALUE: (state, payload) => {
      state.inputValueCode = '';
      state.inputValueName = '';
      state.selectedValue = payload;
    },
  },
  actions: {
    //запрос на сервер и вся инициация
    INIT_CURRENCIES: async ({ commit }) => {
      try {
        const response = await axios.get(
          'https://www.cbr-xml-daily.ru/daily_json.js',
        );
        await commit('SET_UNFORMATTED_CURRENCY', response.data);
        await commit('CONVERT_CURRENCY_OBJECT');
        await commit('FORMAT_CURRENCIES');
        await commit('CALCULATE_DIFFERENCE');
        await commit('INIT_OBJECT');
        await commit('INIT_SELECT_VALUE_CURRENCIES');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
