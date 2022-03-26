import { createStore } from 'vuex';
import { currenciesModule } from '@/store/modules/currenciesModule.js';
import { converterModule } from '@/store/modules/converterModule.js';

export const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    currencies: currenciesModule,
    converter: converterModule,
  },
});
