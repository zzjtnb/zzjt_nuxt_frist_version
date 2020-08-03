<!--  -->
<template>
  <div>
    <div v-html></div>
    <ul v-for="item in test">
      <li>{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    // const data = await app.$axios.get('/api/test');
    const data = await app.$axios.get('/api/v1/data');
    console.log(data.data);
    let test = data.data.data;
    return {
      test,
    };
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {},
};
</script>

<style scoped lang='scss'>
</style>