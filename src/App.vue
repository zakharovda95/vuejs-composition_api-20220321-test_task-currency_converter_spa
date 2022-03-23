<template>
  <div class="application">
    <header>
      <div class="header">
        <nav-bar></nav-bar>
      </div>
    </header>
    <main>
      <div class="main">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'App',
  components: {
    NavBar,
  },

  setup() {
    const store = useStore();
    const getCurrencies = () => {
      store.dispatch('INIT_CURRENCIES');
    };
    onMounted(() => {
      getCurrencies();
    });
  },
};
</script>

<style lang="scss">
@import './assets/styles/App.scss';
</style>
