<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    this.$store.dispatch('getAllDatas', 'banners')
    this.$store.dispatch('getAllDatas', 'products')
  }
}
</script>

<style lang="scss">

$primary-color: #ffffff;
$secondary-color: #5bc0de;
$third-color: #146e8a;
$fourth-color: #f5deb3;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-x: hidden;
}
body::-webkit-scrollbar {
  width: 0.5rem;
}
body::-webkit-scrollbar-track {
  background-color: $fourth-color;
}
body::-webkit-scrollbar-thumb {
  background-color: $secondary-color;
}
</style>
