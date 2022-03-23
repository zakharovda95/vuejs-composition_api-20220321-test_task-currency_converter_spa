import { createStore } from 'vuex';
import { currenciesModule } from '@/store/modules/currenciesModule.js';

export const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    currencies: currenciesModule,
  },
});
