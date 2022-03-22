<template>
  <div></div>
</template>

<script>
import axios from 'axios';
import { onMounted } from 'vue';
export default {
  name: 'CurrencyItemList',
  components: {},
  setup() {
    const getCurrency = async () => {
      const response = await axios.get(
        'https://www.cbr-xml-daily.ru/daily_json.js',
      );
      return response;
    };

    onMounted(() => {
      getCurrency();
    });
    return {};
  },
};
</script>

<style scoped lang=""></style>
