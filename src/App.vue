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

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
@import './assets/styles/App.scss';
</style>
