<template>
  <div class="navbar">
    <div class="navbar_content">
      <div class="navbar_content__logo">
        <h4>Currency</h4>
        <h4>Converter</h4>
      </div>
      <div class="navbar_content__button_group">
        <ui-button class="ui_button">Список Валют</ui-button>
        <ui-button class="ui_button">Конвертер</ui-button>
      </div>
    </div>
  </div>
</template>

<script>
import UiButton from '@/components/ui/UiButton.vue';

export default {
  name: 'NavBar',
  components: {
    UiButton,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/components/NavBar.scss';
</style>
