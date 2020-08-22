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
  background-color: gray;
}
body::-webkit-scrollbar-thumb {
  background-color: darkslategray;
}
</style>
