<template>
  <div id="app">
    <div id="nav"></div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {},
  created() {
    const width = window.screen.width / 1920;
    document.getElementsByTagName("html")[0].style.fontSize =
      100 * width + "px";
    document.getElementsByTagName("html")[0].style.width = 1920 * width + "px";
  },
  mounted() {
    //创建全局cookie
    // this.$cookies.set('coo', '','5d')   //return this
  },
};
</script>
<style lang="less">
</style>
