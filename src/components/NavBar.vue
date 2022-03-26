<template>
  <div class="navbar">
    <div class="navbar_content">
      <div class="navbar_content__logo">
        <h4>Currency</h4>
        <h4>Converter</h4>
      </div>
      <div class="navbar_content__links_group">
        <router-link
          active-class="navbar_content__links_group___link_active"
          class="router_link"
          :to="{ name: 'main' }"
        >
          Лента
        </router-link>
        <router-link
          active-class="navbar_content__links_group___link_active"
          class="router_link"
          :to="{ name: 'converter' }"
        >
          Конвертер
        </router-link>
      </div>
      <div class="navbar_content__date">
        {{ dateNow }}
      </div>
    </div>
  </div>
</template>

<script>
import 'moment/locale/ru';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'NavBar',
  setup() {
    const store = useStore();
    const dateNow = computed(() => store.getters.DATE_NOW);
    return {
      dateNow,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/NavBar.scss';
</style>
