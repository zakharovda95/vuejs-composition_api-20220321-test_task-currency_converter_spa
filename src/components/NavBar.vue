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
          Список валют
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
        {{ formatDate }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment/moment';
import 'moment/locale/ru';
moment.locale('ru');
import { computed } from 'vue';

export default {
  name: 'NavBar',

  setup() {
    const formatDate = computed(() => {
      return moment(Date.now()).format('Дата:  DD MMMM yy г. Время:  H:mm');
    });

    return {
      formatDate,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/NavBar.scss';
</style>
